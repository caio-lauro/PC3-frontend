import { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import { getPratos } from "../api/utils";

export default function Admin() {
    const [loginData, setLoginData] = useState({
        user: "",
        password: ""
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [atualizado, setAtualizado] = useState(false);

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setLoginData({
            ...loginData,
            [id]: value
        });
    };

    useEffect(() => {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);

        if (params.get("usuario") === "admin" && params.get("senha") === "admin") {
            setLoggedIn(true);
        }
    }, [])

    const handleSubmit = () => {
        if (loginData.user !== "admin" || loginData.password !== "admin") {
            setError("Credenciais incorretas.");
            return;
        }
        setLoggedIn(true);
    };

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        ingredients: ""
    });
    
    const [pratos, setPratos] = useState([]);
    
    useEffect(() => {
        async function listarPratos() {
            const data = await getPratos();

            if (!data.ok) {
                setError(data.error);
            } else {
                setPratos(data.pratos);
            }
        }

        listarPratos();
    }, [atualizado]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setError("");

        if (!value.trim()) {
            setError("Todos os campos devem ser preenchidos!");
            return;
        }

        if (name === "name" && !/^[\p{L} ]+$/u.test(value)) {
            setError("O nome deve possuir apenas letras do alfabeto.");
            return;
        }

        else if (name === "price") {
            const filteredPrice = value.replace(/\D/g, '');
            setFormData({
                ...formData,
                [name]: filteredPrice
            })

            if (!filteredPrice) {
                setError("O preço deve ser numérico.");
                return;
            }

            const result = (parseInt(filteredPrice)/100).toFixed(2).replace('.', ',');

            setFormData({
                ...formData,
                [name]: result
            })
        }

        else if (name === "category" && (value !== "entrada" && value != "principal" && value != "sobremesa")) {
            setFormData({
                ...formData,
                [name]: ""
            })

            setError("Categoria inválida!");
            return;
        }

        else if (name === "ingredients") {
            const splittedIngredients = value.split(',');

            splittedIngredients.forEach(ingredient => {
                if (!/^[\p{L} ]+$/u.test(ingredient.trim())) {
                    setError("Ingredientes devem ter apenas letras, vírgulas e espaços");
                    return;
                }
            });
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (error) return;

        try {
			const response = await fetch('http://localhost:3000/api/adicionar', {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error);
				return ;
			} else {
                setFormData({
                    name: "",
                    price: "",
                    category: "",
                    ingredients: ""
                });
                setAtualizado(!atualizado);
            }
		} catch (err) {
			console.error(err);
		}
    }

    const handleRemove = async (e) => {
        const id = parseInt(e.target.id.slice(6));
        
        try {
            const res = await fetch("http://localhost:3000/api/remover", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id })
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                setError(data.error);
                return ;
            }

            setAtualizado(!atualizado);
        } catch (err) {
            console.error(err);
        }
    }

    if (!loggedIn) {
        return (
            <main className="h-screen">
                <div className="flex content-center items-center justify-center h-screen">
                    <form
                        className="bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded pt-4 px-8 pb-4 mb-4"
                        onSubmit={handleSubmit}
                        method="GET"
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
                                value={loginData.user}
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
                                value={loginData.password}
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

    return (
        <>
            <Header />
            <main className="min-h-screen flex justify-center items-center">
                <div className="grid grid-cols-2 gap-x-[10vw] place-items-start h-fit mt-25 mb-4">
                    <form 
                        className="prato sticky top-[33%] bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5"
                        onSubmit={handleFormSubmit}
                        method="POST"
                    >
                        <p className="text-2xl font-bold text-center mb-4">
                            Adicionar novo prato
                        </p>
                        <input 
                            type="text"
                            name="name"
                            required
                            placeholder="Nome do prato"
                            value={formData.name}
                            onChange={handleFormChange}
                            className="w-full px-1 py-2 border rounded-lg bg-slate-100/50 align-middle text-left text-xl font-semibold"
                        />

                        <div className="mt-2 flex justify-between w-100">
                            <div className="flex p-2 gap-x-1 border rounded-lg bg-slate-100/50 align-middle text-right">
                                <p className="text-lg">
                                    R$ 
                                </p>
                                <input 
                                    type="text"
                                    name="price"
                                    required
                                    placeholder="Preço"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    className="w-full px-1 rounded-lg text-left text-lg"
                                />
                                </div>

                                <select
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    required
                                    className="p-2 inline-flex justify-center gap-x-1.5 border rounded-lg bg-slate-100/50 inset-ring-1 inset-ring-white/5 hover:bg-slate-200/80"
                                >
                                    <option value="" disabled hidden>Categoria</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="principal">Principal</option>
                                    <option value="sobremesa">Sobremesa</option>
                                </select>
                            </div>

                        <div className="mt-3">
                            <label 
                                htmlFor="ingredients"
                                className="text-lg font-[600]"
                            >
                                Ingredientes
                            </label>
                            <input 
                                type="text"
                                name="ingredients"
                                required
                                placeholder="Ingrediente 1, Ingrediente 2, ..."
                                value={formData.ingredients}
                                onChange={handleFormChange}
                                className="w-full px-1 py-2 border rounded-lg bg-slate-100/50 align-middle text-left"
                            />
                        </div>

                        <div className="justify-right text-right content-right items-right mt-4">
                            <label htmlFor="prato">Adicionar prato</label>
                            <button 
                                className="btn ml-2 mb-2 rounded-xl h-7 w-7 align-middle bg-black text-white font-xl cursor-pointer"
                                name="prato"
                                id="prato"
                            >
                                +
                            </button>
                        </div>

                        {error && 
                            <p className="mb-2 font-sm text-red-600">
                                {error}
                            </p>
                        }
                    </form>
                    
                    <div className="-z-1 bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5">
                        <div className="sticky top-[6.3%] mx-auto z-1 px-4 py-2 bg-white/90 backdrop-blur-sm rounded mb-4">
                            <p className="text-2xl font-bold text-center mb-4">
                                Pratos no sistema
                            </p>
                        </div>
                        {pratos?.map((prato) => (
                            <div key={prato.id} className="prato mb-4 bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded px-8 py-5">
                                <div className="flex justify-between w-100">
                                    <p className="text-left text-xl font-semibold">
                                        {prato.nome}
                                    </p>
                                    
                                    <p className="text-right text-lg">
                                        R$ {prato.preco.toString().replace('.', ',')}
                                    </p>
                                </div>

                                <p>
                                    {prato.categoria.at(0).toUpperCase() + prato.categoria.slice(1)}
                                </p>

                                <p className="mt-5 font-[600]">
                                    Ingredientes
                                </p>
                                <div className="grid grid-cols-3">
                                    {prato.ingredientes?.split(',').map((ingrediente, idx) => (
                                        <p key={idx}>
                                            {ingrediente}
                                        </p>
                                    ))}
                                </div>

                                <div className="justify-right text-right content-right items-right mt-4">
                                    <label htmlFor={`prato-${prato.id}`}>Remover prato</label>
                                    <button 
                                        className="btn ml-2 mb-2 rounded-xl h-7 w-7 align-middle bg-black text-white font-xl cursor-pointer"
                                        name={`prato-${prato.id}`} 
                                        id={`prato-${prato.id}`} 
                                        onClick={handleRemove} 
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}