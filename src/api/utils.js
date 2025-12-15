export async function isLoggedIn() {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const res = await fetch("http://localhost:3000/api/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) console.log(res.error);

    return res.ok;
}

export async function getPratos() {
    const res = await fetch("http://localhost:3000/api/pratos");

    const data = await res.json();

    if (!res.ok) {
        return { ok: false, error: "Erro no servidor." };
    }

    return { ok: true, pratos: data };
}