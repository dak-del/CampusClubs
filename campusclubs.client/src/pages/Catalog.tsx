import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users, Calendar } from 'lucide-react';
import { api } from '../api';

export default function Catalog() {
    const [clubs, setClubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [userStatuses, setUserStatuses] = useState<Record<number, string>>({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const clubsData = await api.getClubs();
                setClubs(clubsData);

                const statuses: Record<number, string> = {};
                for (const club of clubsData) {
                    const status = await api.getUserStatus(1, club.id);
                    statuses[club.id] = status;
                }
                setUserStatuses(statuses);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const directions = Array.from(new Set(clubs.map(c => c.direction)));

    const filteredClubs = clubs.filter(club => {
        const matchesDirection = filter === 'all' || club.direction === filter;
        const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            club.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDirection && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 text-lg">Загрузка каталога...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Каталог организаций</h1>
                    <p className="text-gray-600 text-lg">Найди клуб по интересам и присоединяйся к сообществу</p>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Поиск */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Поиск по названию или описанию..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        {/* Выпадающий список направлений */}
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white appearance-none cursor-pointer min-w-[220px]"
                            >
                                <option value="all">Все направления ({clubs.length})</option>
                                {directions.map(dir => (
                                    <option key={dir} value={dir}>
                                        {dir} ({clubs.filter(c => c.direction === dir).length})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clubs Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-12">
                {filteredClubs.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <p className="text-gray-500 text-xl">Организации не найдены</p>
                        <p className="text-gray-400 mt-2">Попробуйте изменить фильтры</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClubs.map((club: any) => {
                            const userStatus = userStatuses[club.id] || 'guest';

                            return (
                                <div
                                    key={club.id}
                                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 flex flex-col"
                                >
                                    {/* Градиентная шапка карточки */}
                                    <div className={`h-2 ${club.direction === 'Наука' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                                            club.direction === 'Спорт' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                                club.direction === 'Творчество' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                                    'bg-gradient-to-r from-orange-500 to-red-500'
                                        }`}></div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Бейдж направления */}
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-3 self-start border border-blue-100">
                                            {club.direction}
                                        </span>

                                        {/* Название */}
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {club.name}
                                        </h2>

                                        {/* Описание */}
                                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                                            {club.description}
                                        </p>

                                        {/* Статус пользователя */}
                                        {userStatus === 'member' && (
                                            <div className="mb-4 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                                                <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    Вы участник
                                                </p>
                                            </div>
                                        )}
                                        {userStatus === 'leader' && (
                                            <div className="mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                                                <p className="text-sm text-amber-800 font-medium">👑 Вы руководитель</p>
                                            </div>
                                        )}
                                        {userStatus === 'applicant' && (
                                            <div className="mb-4 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <p className="text-sm text-yellow-800 font-medium">⏳ Заявка на рассмотрении</p>
                                            </div>
                                        )}

                                        {/* Кнопка */}
                                        <Link
                                            to={`/org/${club.id}`}
                                            className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${userStatus === 'guest'
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {userStatus === 'guest' ? 'Подробнее и податься' : 'Перейти в организацию'}
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

           </div>
        </div>
    );
}