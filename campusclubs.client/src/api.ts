const API_URL = "http://localhost:5000/api";

export const api = {
    getClubs: async () => {
        const res = await fetch(`${API_URL}/organizations`);
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
    }
}