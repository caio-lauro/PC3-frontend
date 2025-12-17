import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { isLoggedIn } from "../api/utils";

export default function Login() {
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		email: "",
		password: ""
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

		if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			setError(`O ${name} deve ser válido.`);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (error) return;

		const API_URL = import.meta.env.VITE_API_URL;

		try {
			const response = await fetch(`${API_URL}/api/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error);
				return;
			}

			localStorage.setItem("token", data.token);

			navigate("/", { replace: true });
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
							Informe seus dados para fazer login.
						</p>

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
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:outline-none focus:shadow-outline"
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
		</>
	);
}
