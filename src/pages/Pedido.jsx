import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPratos, isLoggedIn } from "../api/utils";
import Header from "../components/Header";

export default function Pedido() {
    const navigate = useNavigate();
    const [pratos, setPratos] = useState([]);
    const [order, setOrder] = useState("");

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
        async function setPratosDB() {
            const data = await getPratos();

            if (!data.ok) {
                setError(data.error);
            } else {
                setPratos(data.pratos);
            }
        }

        setPratosDB();
    }, []);

    useEffect(() => {
        function updateQuantity() {
            const quantity = localStorage.getItem(order);

            localStorage.setItem(
                order, 
                quantity == null ? 1 : parseInt(quantity) + 1
            );
        }

        if (order) 
            updateQuantity();
        setOrder("");
    }, [order])

    const handleOrder = (e) => {
        setOrder(e.target.id);
    };

    const handleFinish = () => {
        // TODO
    }

    const handleCancel = () => {
        let to_remove = [];
        Object.keys(localStorage).forEach((key) => {
            if (key.includes('prato')) to_remove.push(key)
        })

        for (const key of to_remove) {
            localStorage.removeItem(key);
        }

        window.location.reload();
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="flex flex-col content-center items-center h-fit mt-25">
                    {pratos?.map((prato, idx) => (
                        <div key={idx} className="prato mb-4 bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5">
                            <div className="flex justify-between w-100">
                                <p className="text-left text-xl font-semibold">
                                    {prato.nome}
                                </p>
                                
                                <p className="fixed right-5 text-lg">
                                    R$ {prato.preco.toFixed(2).toString().replace('.', ',')}
                                </p>
                            </div>

                            <p>
                                {prato.categoria.at(0).toUpperCase() + prato.categoria.slice(1)}
                            </p>

                            <p className="mt-5 font-[600]">
                                Ingredientes
                            </p>
                            <div className="grid grid-cols-2">
                                {prato.ingredientes?.map((ingrediente, ingrediente_idx) => (
                                    <p key={ingrediente_idx}>
                                        {ingrediente.at(0).toUpperCase() + ingrediente.slice(1)}
                                    </p>
                                ))}
                            </div>

                            <div className="justify-right text-right content-right items-right mt-4">
                                <label htmlFor={`prato-${idx}`}>Adicionar ao pedido</label>
                                <button 
                                    className="btn ml-2 mb-2 rounded-xl h-7 w-7 align-middle bg-black text-white font-xl cursor-pointer"
                                    name={`prato-${idx}`} 
                                    id={`prato-${prato._id}`} 
                                    onClick={handleOrder} 
                                >
                                    +
                                </button>
                                {localStorage.getItem(`prato-${prato._id}`) && 
                                    <p className="fixed right-2 bottom-2">
                                        x{localStorage.getItem(`prato-${prato._id}`)}
                                    </p>
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div className="fixed top-0 right-0 h-screen flex flex-col gap-y-10 items-center justify-center">
                    <button 
                        className="bg-white/75 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5 text-blue-800 text-lg font-semibold cursor-pointer"
                        onClick={handleFinish}
                    >
                        Finalizar pedido
                    </button>

                    <button 
                        className="bg-white/75 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5 text-red-600 text-lg font-semibold cursor-pointer"
                        onClick={handleCancel}
                    >
                        Cancelar pedido
                    </button>
                </div>
            </main>
        </>
    );
}