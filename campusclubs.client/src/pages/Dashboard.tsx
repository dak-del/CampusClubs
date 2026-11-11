import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const statusLabels: Record<string, string> = {
    Submitted: "Подана",
    Reviewing: "На рассмотрении",
    Interview: "Собеседование",
    Approved: "Одобрено",
    Rejected: "Отклонено",
};

const statusColors: Record<string, string> = {
    Submitted: "bg-yellow-100 text-yellow-800",
    Reviewing: "bg-blue-100 text-blue-800",
    Interview: "bg-purple-100 text-purple-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
};

export default function Dashboard() {
    const [apps, setApps] = useState<any[]>([]);
    const [memberships, setMemberships] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'applications' | 'memberships'>('applications');

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const userID = 1;

                const [appsData, membershipsData] = await Promise.all([
                    api.getUserApplications(userID),
                    api.getUserMemberships(userID)
                ]);

                setApps(appsData);
                setMemberships(membershipsData);
            } catch (err) {
                setError('Не удалось загрузить данные. Попробуйте позже.');
                console.error('Ошибка загрузки:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);
    const handleCancelApplication = async (appID: number) => {
        if (!confirm('Вы уверены, что хотите отменить заявку?')) return;

        try {
            await api.cancelApplication(appID);
            setApps(apps.filter(a => a.ID !== appID));
        } catch (err) {
            alert('Ошибка отмены заявки');
        }
    };
    if (loading) {
        return (
            <div className="p-6 max-w-5xl mx-auto">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Загрузка личного кабинета...</p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="p-6 max-w-5xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-800 font-semibold">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Личный кабинет студента</h1>

            {/* Вкладки: Заявки / Членства */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`pb-3 font-semibold transition ${activeTab === 'applications'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Мои заявки ({apps.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('memberships')}
                        className={`pb-3 font-semibold transition ${activeTab === 'memberships'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Мои организации ({memberships.length})
                    </button>
                </nav>
            </div>

            {/* Вкладка: Заявки */}
            {activeTab === 'applications' && (
                <div className="bg-white rounded-xl shadow-md overflow-hIDden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-semibold text-gray-700">Организация</th>
                                <th className="p-4 font-semibold text-gray-700">Дата подачи</th>
                                <th className="p-4 font-semibold text-gray-700">Статус</th>
                                <th className="p-4 font-semibold text-gray-700">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divIDe-y divIDe-gray-100">
                            {apps.map((app: any) => (
                                <tr key={app.ID} className="hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        <Link to={`/org/${app.organizationID}`} className="font-medium text-blue-600 hover:underline">
                                            {app.organizationName}
                                        </Link>
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {new Date(app.createdAt).toLocaleDateString('ru-RU')}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[app.status] || "bg-gray-100"}`}>
                                                {statusLabels[app.status] || app.status}
                                            </span>
                                            {app.comment && (
                                                <span className="text-xs text-gray-500 italic">💬 {app.comment}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {(app.status === 'Submitted' || app.status === 'Reviewing') && (
                                            <button
                                                onClick={() => handleCancelApplication(app.ID)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Отменить
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {apps.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        У вас пока нет заявок. <Link to="/" className="text-blue-600 hover:underline">Перейти в каталог</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Вкладка: Членства */}
            {activeTab === 'memberships' && (
                <div className="grID grID-cols-1 md:grID-cols-2 gap-6">
                    {memberships.map((m: any) => (
                        <div key={m.ID} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900">{m.organizationName}</h3>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                    {m.roleName}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">{m.organizationDescription}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    В организации с {new Date(m.joinedAt).toLocaleDateString('ru-RU')}
                                </span>
                                <Link
                                    to={`/org/${m.organizationID}`}
                                    className="text-blue-600 hover:underline text-sm font-medium"
                                >
                                    Перейти →
                                </Link>
                            </div>
                        </div>
                    ))}
                    {memberships.length === 0 && (
                        <div className="md:col-span-2 text-center py-12 bg-white rounded-xl shadow">
                            <p className="text-gray-500 text-lg">Вы пока не состоите ни в одной организации</p>
                            <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                Найти организацию
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}