import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../api/utils";
import Header from "../components/Header";

export default function Relatorio() {
    const navigate = useNavigate();

    useEffect(() => {
        async function navigateIfLogged() {
            const logged = await isLoggedIn();
            console.log(logged);
            if (!logged) {
                navigate("/", { replace: true });
            }
        }

        navigateIfLogged();
    }, []);

    return (
        <>
            <Header />
            <main className="h-screen">
                
            </main>
        </>
    );
}