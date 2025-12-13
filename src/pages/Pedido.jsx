import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../api/utils";
import Header from "../components/Header";

export default function Pedido() {
    const navigate = useNavigate();

    useEffect(() => {
        async function navigateIfLogged() {
            const logged = await isLoggedIn();
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
                <div className="flex flex-col content-center items-center justify-center h-screen">
                    <div className="prato mb-4 bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5">
                        <div className="flex justify-between w-100">
                            <p className="text-left text-lg">
                                Prato 1
                            </p>
                            
                            <p className="text-right text-lg">
                                R$ 10,00
                            </p>
                        </div>

                        <p>
                            Entrada/Principal/Sobremesa
                        </p>

                        <p className="mt-5">
                            Ingredientes
                        </p>
                        <div className="grid grid-cols-3">
                            <p>Ingrediente 1</p>
                            <p>Ingrediente 2</p>
                            <p>Ingrediente 3</p>
                            <p>Ingrediente 4</p>
                            <p>Ingrediente 5</p>
                            <p>Ingrediente 6</p>
                        </div>
                    </div>

                    <div className="prato mb-4 bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5">
                        <div className="flex justify-between w-100">
                            <p className="text-left text-lg">
                                Prato 2
                            </p>
                            
                            <p className="text-right text-lg">
                                R$ 10,00
                            </p>
                        </div>

                        <p>
                            Entrada/Principal/Sobremesa
                        </p>

                        <p className="mt-5">
                            Ingredientes
                        </p>
                        <div className="grid grid-cols-3">
                            <p>Ingrediente 1</p>
                            <p>Ingrediente 2</p>
                            <p>Ingrediente 3</p>
                            <p>Ingrediente 4</p>
                            <p>Ingrediente 5</p>
                            <p>Ingrediente 6</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}