export async function isLoggedIn() {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const API_URL = import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}/api/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) console.log(res.error);

    return res.ok;
}

export async function getPratos() {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/pratos`);

    const data = await res.json();

    if (!res.ok) {
        return { ok: false, error: "Erro no servidor." };
    }

    return { ok: true, pratos: data };
}