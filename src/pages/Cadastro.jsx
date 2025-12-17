import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { isLoggedIn } from "../api/utils";

export default function Cadastro() {
    const navigate = useNavigate();

	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		cep: "",
		email: "",
		password: "",
		confirm: ""
	});

	const handleChange = (e) => {
		const id = e.target.id;
		const { name, value } = e.target;

		setError("");

		setFormData({
			...formData,
			[id]: value
		});

		if (value.trim() === "") {
			setError(`O campo ${name} não pode ficar vazio!`);
		}

		if (id === "name") {
			if (value.length < 3) {
				setError(`O ${name} deve possuir pelo menos 3 letras.`);
			} else if (!/^[\p{L} ]+$/u.test(value)) {
				setError(`O ${name} deve possuir apenas letras do alfabeto.`);
			}
		} else if (id === "phone") {
			const phoneRegex = /^([1-9]{2})([9]?)([0-9]{4})([0-9]{4})$/;
			let str = value.replace(/[^0-9]/g, "").slice(0, 11);

			const result = str.replace(phoneRegex, (match, ddd, nine, part1, part2) => {
				const nineFormatted = nine ? " 9" : "";
				return (`(${ddd})${nineFormatted} ${part1}-${part2}`);
			});

			setFormData({
				...formData,
				[id]: result
			});
		} else if (id === "cep") {
			const cepRegex = /^([0-9]{5})([0-9]{3})$/;
			let str = value.replace(/[^0-9]/g, "").slice(0, 8);

			const result = str.replace(cepRegex, "$1-$2");

			setFormData({
				...formData,
				[id]: result
			});
		} else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			setError(`O ${name} deve ser válido.`);
		} else if (id === "confirm" && formData.password !== value) {
			setError("Senha e confirmação devem coincidir.");
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (error) return;

		const API_URL = import.meta.env.VITE_API_URL;

		try {
			const response = await fetch(`${API_URL}/api/cadastrar`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error);
				return ;
			}

			navigate("/login", { replace: true });
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		async function navigateIfLogged() {
			const logged = await isLoggedIn();
			if (logged) {
				navigate("/", { replace: true });
			}
		}

        navigateIfLogged();
	}, []);

	return (
		<>
			<Header />
			<main className="h-screen">
				<div className="flex content-center items-center justify-center h-screen">
					<form
						className="bg-white/80 border border-black/10 backdrop-blur-sm shadow-lg rounded pt-4 px-8 pb-4 mb-4"
						method="POST"
						onSubmit={handleSubmit}
					>
						<p className="text-xl text-gray-700 text-center mb-4">
							Informe seus dados para cadastrar-se.
						</p>

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="name"
							>
								Nome
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="name"
								name="nome"
								type="text"
								placeholder="Nome"
								value={formData.name}
								onChange={handleChange}
							/>
						</div>

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="phone"
							>
								Telefone
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="phone"
								name="telefone"
								type="text"
								placeholder="Telefone"
								value={formData.phone}
								onChange={handleChange}
							/>
						</div>

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="cep"
							>
								CEP
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="cep"
								name="CEP"
								type="text"
								placeholder="CEP"
								value={formData.cep}
								onChange={handleChange}
							/>
						</div>

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="email"
							>
								E-mail
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								name="e-mail"
								type="text"
								placeholder="E-mail"
								value={formData.email}
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
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								name="senha"
								type="password"
								placeholder="********"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>

						<div className="mb-0">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="confirmation"
							>
								Confirmação da senha
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="confirm"
								name="confirmação da senha"
								type="password"
								placeholder="********"
								value={formData.confirm}
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
								Registrar
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
}
