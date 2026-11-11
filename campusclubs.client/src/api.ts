const API_URL = "http://localhost:5000/api";

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
    getUserStatus: async (userID: number, clubID: string | undefined) => {
        const res = await fetch(`${API_URL}/users/${userID}/clubs/${clubID}/status`);
        const data = await res.json();
        return data.status;
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