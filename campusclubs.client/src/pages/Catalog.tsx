import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Catalog() {
    const [clubs, setClubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [userMemberships, setUserMemberships] = useState<Record<number, string>>({});

    // 1. Загружаем организации и статусы пользователя
    useEffect(() => {
        const loadData = async () => {
            try {
                // Загружаем список организаций
                const clubsData = await api.getClubs();
                setClubs(clubsData);

                // Загружаем статусы пользователя для каждой организации (ID=1 для демо)
                const statuses: Record<number, string> = {};
                for (const org of clubsData) {
                    const status = await api.getUserStatus(1, org.id);
                    statuses[org.id] = status;
                }
                setUserMemberships(statuses);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // 2. Фильтрация по направлениям
    const filteredclubs = filter === 'all'
        ? clubs
        : clubs.filter(org => org.direction === filter);

    // 3. Получаем уникальные направления для фильтров
    const directions = Array.from(new Set(clubs.map(org => org.direction)));

    if (loading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Загрузка организаций...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Каталог студенческих организаций</h1>
                <p className="text-gray-600">Найдите объединение по интересам и подайте заявку на вступление</p>
            </div>

            {/* 4. Фильтры по направлениям */}
            <div className="mb-6 flex flex-wrap gap-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                >
                    Все ({clubs.length})
                </button>
                {directions.map(dir => (
                    <button
                        key={dir}
                        onClick={() => setFilter(dir)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${filter === dir
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                    >
                        {dir} ({clubs.filter(o => o.direction === dir).length})
                    </button>
                ))}
            </div>

            {/* 5. Сетка карточек организаций */}
            {filteredclubs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow">
                    <p className="text-gray-500 text-lg">Организации не найдены</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredclubs.map((org: any) => {
                        const userStatus = userMemberships[org.id] || 'guest';

                        return (
                            <div key={org.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100 flex flex-col">
                                {/* Бейдж направления */}
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3 self-start">
                                    {org.direction}
                                </span>

                                {/* Название и описание */}
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{org.name}</h2>
                                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{org.description}</p>

                                {/* Статус пользователя */}
                                {userStatus === 'member' && (
                                    <div className="mb-3 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-sm text-green-800 font-medium">✓ Вы участник</p>
                                    </div>
                                )}
                                {userStatus === 'leader' && (
                                    <div className="mb-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                                        <p className="text-sm text-amber-800 font-medium">👑 Вы руководитель</p>
                                    </div>
                                )}
                                {userStatus === 'applicant' && (
                                    <div className="mb-3 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800 font-medium">⏳ Заявка на рассмотрении</p>
                                    </div>
                                )}

                                {/* Кнопка перехода */}
                                <Link
                                    to={`/org/${org.id}`}
                                    className={`block w-full text-center py-2 rounded-lg font-medium transition ${userStatus === 'guest'
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {userStatus === 'guest' ? 'Подробнее и податься' : 'Перейти в организацию'}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}