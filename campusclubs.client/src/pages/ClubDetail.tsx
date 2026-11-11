import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function ClubDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [club, setClub] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [userStatus, setUserStatus] = useState<'guest' | 'applicant' | 'leader'>('guest')
    const [step, setStep] = useState<'info' | 'form'>('info');

    useEffect(() => {
        api.getClubs(id).then(data => {
            setClub(data);
            setQuestions(data.questions || [
                { id: 1, text: "Почему вы хотите вступить?" },
                { id: 2, text: "Ваш релевантный опыт?" }
            ]);
        });

        api.getUserStatus(1, id).then(status => setUserStatus(status));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            userID: 1,
            clubID: Number(id),
            answers: questions.map(q => ({ question: q.text, answer: answers[q.id] || "" }))
        };
        await api.submitApplication(payload);
        alert("Заявка успешно подана!");
        navigate("/dashboard");
    };

    if (!club) return <div className="p-6">Загрузка...</div>;

    if (userStatus === 'applicant') {
        return (
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold">{club.name}</h1>
                <p className="mt-4 text-green-700 font-semibold">✓ Вы уже подали заявку. Ожидайте рассмотрения.</p>
                <button onClick={() => navigate("/dashboard")} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">
                    Перейти в личный кабинет
                </button>
            </div>
        );
    }
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {step === 'info' ? (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                        {club.direction}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{club.name}</h1>
                    <p className="text-gray-700 mb-6 text-lg">{club.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold">Контакты:</h3>
                        <p className="text-gray-600">{club.contactInfo}</p>
                    </div>
                    <button onClick={() => setStep('form')} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                        Подать заявку
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Анкета в "{club.name}"</h2>
                    {questions.map((q) => (
                        <div key={q.id} className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">{q.text}</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={answers[q.id] || ""}
                                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                            />
                        </div>
                    ))}
                    <div className="flex gap-4">
                        <button type="button" onClick={() => setStep('info')} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Назад</button>
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                            Отправить заявку
                        </button>
                    </div>
                </form>
            )}
        </div>
    );

}
function InternalView({ org, isLeader }: { org: any; isLeader: boolean }) {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-6">
                <h1 className="text-3xl font-bold">{org.name}</h1>
                <p className="mt-2 opacity-90">Вы являетесь участником этой организации</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="font-bold text-lg mb-3">📢 Объявления</h3>
                    <p className="text-gray-600">Здесь будет лента внутренних объявлений организации...</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="font-bold text-lg mb-3">📅 Мероприятия</h3>
                    <p className="text-gray-600">Календарь событий организации...</p>
                </div>
                {isLeader && (
                    <div className="bg-white rounded-xl shadow p-6 md:col-span-2 border-l-4 border-amber-500">
                        <h3 className="font-bold text-lg mb-3">⚙️ Панель руководителя</h3>
                        <div className="flex gap-3">
                            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">Рассмотреть заявки</button>
                            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">Управление составом</button>
                            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">Создать отчёт</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}