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

    const handleOrder = (e) => {
        const order = e.target.id;
        console.log(order);
    };

    const pratos = [
        {
            nome: "Prato 1",
            preco: 10.0,
            categoria: "Entrada",
            ingredientes: [
                "Ingrediente 1", "Ingrediente 2", "Ingrediente 3",
                "Ingrediente 4", "Ingrediente 5", "Ingrediente 6"
            ]
        },
        {
            nome: "Prato 2",
            preco: 20.0,
            categoria: "Principal",
            ingredientes: [
                "Ingrediente 1", "Ingrediente 2", "Ingrediente 3",
                "Ingrediente 4"
            ]
        },
        {
            nome: "Prato 3",
            preco: 5.99,
            categoria: "Sobremesa",
            ingredientes: [
                "Ingrediente 1", "Ingrediente 2"
            ]
        },
        {
            nome: "Prato 1",
            preco: 10.0,
            categoria: "Entrada",
            ingredientes: [
                "Ingrediente 1", "Ingrediente 2", "Ingrediente 3",
                "Ingrediente 4", "Ingrediente 5", "Ingrediente 6"
            ]
        },
        {
            nome: "Prato 2",
            preco: 20.0,
            categoria: "Principal",
            ingredientes: [
                "Ingrediente 1", "Ingrediente 2", "Ingrediente 3",
                "Ingrediente 4"
            ]
        },
        {
            nome: "Prato 3",
            preco: 5.99,
            categoria: "Sobremesa",
            ingredientes: [
                "Ingrediente 1", "Ingrediente 2"
            ]
        },
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="flex flex-col content-center items-center h-[calc(100vh-var(--spacing)*16)] mt-16">
                    {pratos?.map((prato, idx) => (
                        <div key={idx} className="prato mb-4 bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5">
                            <div className="flex justify-between w-100">
                                <p className="text-left text-xl font-semibold">
                                    {prato.nome}
                                </p>
                                
                                <p className="text-right text-lg">
                                    R$ {prato.preco.toString().replace('.', ',')}
                                </p>
                            </div>

                            <p>
                                {prato.categoria}
                            </p>

                            <p className="mt-5 font-[600]">
                                Ingredientes
                            </p>
                            <div className="grid grid-cols-3">
                                {prato.ingredientes?.map((ingrediente, idx) => (
                                    <p key={idx}>
                                        {ingrediente}
                                    </p>
                                ))}
                            </div>

                            <div className="justify-right text-right content-right items-right mt-4">
                                <label htmlFor={`prato-${idx}`}>Fazer pedido</label>
                                <button 
                                    className="btn ml-2 rounded text-center items-center bg-black text-white"
                                    name={`prato-${idx}`} 
                                    id={`prato-${idx}`} 
                                    onClick={handleOrder} 
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}