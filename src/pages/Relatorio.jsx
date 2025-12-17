import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPedidos, isLoggedIn } from "../api/utils";
import Header from "../components/Header";

export default function Relatorio() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState("");
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        async function navigateIfLogged() {
            const logged = await isLoggedIn();
            if (!logged) {
                navigate("/", { replace: true });
            }
        }

        navigateIfLogged();
    }, []);

    useEffect(() => {
        async function setPedidosDB() {
            const data = await getPedidos();

            if (!data) {
                setAlert("Não foi possível buscar os seus pedidos!");
                setTimeout(() => {
                    setAlert("");
                }, 5000);
            } else {
                setPedidos(data);
            }
        }

        setPedidosDB();
    }, []);

    return (
        <>
            {alert && 
                <p className="z-20 fixed top-5 left-1/2 -translate-x-1/2 bg-red-100 rounded-lg text-red-600 text-center text-lg px-20 py-10">
                    {alert}
                </p>
            }
            <Header />
            <main className="flex flex-col content-center items-center min-h-screen">
                <div className="h-fit w-fit mt-25">
                    {pedidos?.map((pedido, idx) => (
                        <div 
                            key={pedido._id} 
                            className="w-full bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5 mb-10"
                        >
                            <p className="w-full text-center text-2xl font-bold mb-3 pb-3 border-b-2 border-dashed">
                                Pedido {idx + 1}
                            </p>

                            {pedido.itens?.map((item) => (
                                <div key={item._id}>
                                    <div key={item.prato._id} className="">
                                        <div className="grid grid-cols-2 m-0">
                                            <p className="text-left text-xl font-semibold">
                                                {item.prato.nome}
                                            </p>
                                            
                                            <p className="text-right text-lg">
                                                R$ {item.prato.preco.toFixed(2).toString().replace('.', ',')}
                                            </p>
                                        </div>
                                        <p className="text-right text-md h-fit">
                                            x{item.quantidade}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="grid grid-cols-2 mb-3 mt-3 pt-1 border-t-2 border-dashed">
                                <p className="text-left text-2xl font-bold">
                                    Total: 
                                </p>
                                <p className="text-right text-2xl font-bold">
                                    R$ {pedido.valor_total.toFixed(2).toString().replace('.', ',')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}