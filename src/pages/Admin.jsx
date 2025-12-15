import { useState } from "react";

export default function Admin() {
    const [formData, setFormData] = useState({
        user: "",
        password: ""
    })
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = () => {
        if (formData.user !== "admin" || formData.password !== "admin") {
            setError("Credenciais incorretas.");
            return;
        }
        setLoggedIn(true);
    };

    if (!loggedIn) {
        return (
            <main className="h-screen">
                <div className="flex content-center items-center justify-center h-screen">
                    <form
                        className="bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded pt-4 px-8 pb-4 mb-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="user"
                            >
                                Usuário
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="user"
                                name="usuario"
                                type="text"
                                placeholder="Usuário"
                                value={formData.user}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Senha
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="senha"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
    
                        {error && 
                            <p className="mb-2 font-sm text-red-600">
                                {error}
                            </p>
                        }
    
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }

    // Se estiver logado
    console.log("logado");
    return (<></>);
}