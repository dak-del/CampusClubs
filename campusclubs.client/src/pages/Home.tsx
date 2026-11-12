import { Link } from 'react-router-dom';
import { Users, Calendar, Award, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzR6TTIgMzR2MmgzMnYtMkgyem0wLTMwdjJoMzJWMkgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

                <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">Более 80 студенческих организаций</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-snug tracking-tight">
                            Найди своё место<br />
                            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                в университетской жизни
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Присоединяйся к студенческим организациям, развивай навыки, находи друзей и создавай незабываемые моменты
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/catalog"
                                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
                            >
                                Открыть каталог
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/dashboard"
                                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/30"
                            >
                                Личный кабинет
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Преимущества */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                        Почему стоит присоединиться?
                    </h2>
                    <p className="text-center text-gray-600 text-lg mb-12">
                        Студенческие организации — это не просто клубы, это возможности
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                                <Users className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Новые знакомства</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Находи единомышленников, расширяй круг общения и создавай связи на всю жизнь
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-5">
                                <Award className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Развитие навыков</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Получай практический опыт, развивай лидерские качества и профессиональные компетенции
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                                <Calendar className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Яркие события</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Участвуй в мероприятиях, конференциях, хакатонах и создавай незабываемые воспоминания
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Призыв к действию */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Готов начать?</h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Выбери организацию по интересам и подай заявку прямо сейчас
                    </p>
                    <Link
                        to="/catalog"
                        className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Перейти в каталог
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}