import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import { api } from '../api';

export default function ClubDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [club, setClub] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [userStatus, setUserStatus] = useState<string>('guest');
    const [step, setStep] = useState<'info' | 'form'>('info');

    useEffect(() => {
        api.getClub(id).then(data => {
            setClub(data);
            setQuestions(data.questions || [
                { id: 1, text: "Почему вы хотите вступить?" },
                { id: 2, text: "Ваш релевантный опыт?" }
            ]);
        });
        api.getUserStatus(1, id).then(setUserStatus);
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                userId: 1,
                clubId: Number(id),
                answers: questions.map(q => ({ question: q.text, answer: answers[q.id] || "" }))
            };
            await api.submitApplication(payload);
            alert("Заявка успешно подана!");
            navigate("/dashboard");
        } catch (error: any) {
            alert(error.message || "Ошибка при подаче заявки");
        }
    };

    if (!club) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (userStatus === 'applicant') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">⏳</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{club.name}</h1>
                    <p className="text-yellow-800 font-semibold text-lg mb-2">Вы уже подали заявку в этот клуб</p>
                    <p className="text-gray-600 mb-8">Дождитесь рассмотрения или отмените заявку в личном кабинете</p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                    >
                        Перейти в личный кабинет
                    </Link>
                </div>
            </div>
        );
    }

    if (userStatus === 'member' || userStatus === 'leader') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-10 shadow-2xl mb-8">
                        <h1 className="text-4xl font-bold mb-3">{club.name}</h1>
                        <p className="text-green-100 text-lg">Вы являетесь участником этой организации</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">📢 Объявления</h3>
                            <p className="text-gray-600">Здесь будет лента внутренних объявлений организации...</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">📅 Мероприятия</h3>
                            <p className="text-gray-600">Календарь событий организации...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Кнопка назад */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Назад к каталогу
                </button>

                {step === 'info' ? (
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        {/* Градиентная шапка */}
                        <div className={`h-32 ${club.direction === 'Наука' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' :
                                club.direction === 'Спорт' ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
                                    club.direction === 'Творчество' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                                        'bg-gradient-to-r from-orange-600 to-red-600'
                            }`}></div>

                        <div className="p-10">
                            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 border border-blue-100">
                                {club.direction}
                            </span>

                            <h1 className="text-4xl font-bold text-gray-900 mb-6">{club.name}</h1>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{club.description}</p>

                            {/* Контакты */}
                            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-gray-600" />
                                    Контакты
                                </h3>
                                <p className="text-gray-700">{club.contactInfo}</p>
                            </div>

                            <button
                                onClick={() => setStep('form')}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Подать заявку на вступление
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Анкета кандидата</h2>
                        <p className="text-gray-600 mb-8">Заполните форму, чтобы подать заявку в "{club.name}"</p>

                        {questions.map((q) => (
                            <div key={q.id} className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {q.text} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                                    value={answers[q.id] || ""}
                                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                                    placeholder="Расскажите подробнее..."
                                />
                            </div>
                        ))}

                        <div className="flex gap-4 mt-8">
                            <button
                                type="button"
                                onClick={() => setStep('info')}
                                className="px-8 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-all border-2 border-gray-200"
                            >
                                Назад
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                Отправить заявку
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}