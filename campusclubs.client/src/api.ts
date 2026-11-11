const API_URL = "http://localhost:5000/api";

export const api = {
    getClubs: async (id: string | undefined) => {
        const res = await fetch(`${API_URL}/organizations/${id}`);
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
        const res = await fetch(`${API_URL}/users/${userID}/organizations/${clubID}/status`);
        const data = await res.json();
        return data.status;
    }
}