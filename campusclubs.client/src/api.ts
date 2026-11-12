const API_URL = "/api";

export const api = {
    getClubs: async () => {
        const res = await fetch(`${API_URL}/clubs`);
        if (!res.ok) throw new Error('Ошибка загрузки организаций');
        return res.json();
    },
    getClub: async (id: string | undefined) => {
        const res = await fetch(`${API_URL}/clubs/${id}`);
        if (!res.ok) throw new Error('Ошибка загрузки организации');
        return res.json();
    },
    submitApplication: async (data: any) => {
        const res = await fetch(`${API_URL}/applications`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getUserApplications: async (userID: number) => {
        const res = await fetch(`${API_URL}/applications/user/${userID}`);
        return res.json();
    },
    getUserStatus: async (userId: number, clubId: number) => {
        try {
            const url = `${API_URL}/users/${userId}/clubs/${clubId}/status`;
            const res = await fetch(url);

            // 1. Если бэкенд вернул ошибку (404, 500 и т.д.), не пытаемся читать JSON
            if (!res.ok) {
                console.warn(`[getUserStatus] Бэкенд вернул статус ${res.status}. Считаем пользователя гостем.`);
                return 'guest';
            }

            // 2. Читаем ответ как текст, чтобы проверить, не пустой ли он
            const textResponse = await res.text();
            if (!textResponse || textResponse.trim() === '') {
                console.warn('[getUserStatus] Бэкенд вернул пустой ответ. Считаем пользователя гостем.');
                return 'guest';
            }

            // 3. Только если текст есть, пытаемся распарсить его как JSON
            const data = JSON.parse(textResponse);
            return data.status || 'guest';

        } catch (error) {
            // 4. Если произошла сетевая ошибка или ошибка парсинга, тихо возвращаем 'guest'
            console.error('[getUserStatus] Критическая ошибка:', error);
            return 'guest';
        }
    },
    getUserProfile: async (userId: number) => {
        const res = await fetch(`${API_URL}/users/${userId}`);
        if (!res.ok) throw new Error('Ошибка загрузки профиля');
        return res.json();
    },
    getUserMemberships: async (userID: number) => {
        const res = await fetch(`${API_URL}/users/${userID}/memberships`);
        if (!res.ok) throw new Error('Ошибка загрузки членств');
        return res.json();
    },
    cancelApplication: async (appID: number) => {
        const res = await fetch(`${API_URL}/applications/${appID}/cancel`, {
            method: 'POST',
        });
        if (!res.ok) throw new Error('Ошибка отмены заявки');
        return res.json();
    }
}