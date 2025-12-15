export default async function isLoggedIn() {
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