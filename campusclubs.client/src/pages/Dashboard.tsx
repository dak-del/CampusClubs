import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, Mail, Hash, Calendar, AlertCircle } from 'lucide-react';
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
    const [user, setUser] = useState<any>(null);
    const [apps, setApps] = useState<any[]>([]);
    const [memberships, setMemberships] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'applications' | 'memberships'>('applications');

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const userId = 1; // Для демо

                // Загружаем всё параллельно
                const [userData, appsData, membershipsData] = await Promise.all([
                    api.getUserProfile(userId),
                    api.getUserApplications(userId),
                    api.getUserMemberships(userId)
                ]);

                setUser(userData);
                setApps(appsData);
                setMemberships(membershipsData);
            } catch (err) {
                console.error('Ошибка загрузки:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleCancelApplication = async (appId: number) => {
        if (!window.confirm('Вы уверены, что хотите отменить эту заявку? Это действие нельзя отменить.')) {
            return;
        }

        try {
            await api.cancelApplication(appId);
            setApps(prevApps => prevApps.filter(app => app.id !== appId));
        } catch (error) {
            console.error('Ошибка при отмене заявки:', error);
            alert('Не удалось отменить заявку. Попробуйте позже.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Загрузка личного кабинета...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Личный кабинет</h1>

                {/* Карточка профиля пользователя */}
                {user && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0">
                            <UserIcon className="w-10 h-10" />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                            <p className="text-gray-500 mb-4">Студент</p>
                            <div className="flex flex-wrap gap-4">
                                
                                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                            <div className="text-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-2xl font-bold text-blue-600">{apps.length}</p>
                                <p className="text-xs text-blue-800 font-medium uppercase tracking-wide">Заявок</p>
                            </div>
                            <div className="text-center px-4 py-2 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-2xl font-bold text-green-600">{memberships.length}</p>
                                <p className="text-xs text-green-800 font-medium uppercase tracking-wide">Членств</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Вкладки */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('applications')}
                                className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative ${activeTab === 'applications'
                                        ? 'text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Мои заявки
                                {activeTab === 'applications' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('memberships')}
                                className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative ${activeTab === 'memberships'
                                        ? 'text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Мои организации
                                {activeTab === 'memberships' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>
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
                                    to={`/club/${m.organizationID}`}
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