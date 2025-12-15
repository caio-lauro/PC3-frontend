import Header from "../components/Header";
import { isLoggedIn } from "../api/utils";
import { useEffect, useState } from "react";

export default function Index() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		async function getLoggedIn() {
			const logged = await isLoggedIn();
			setLoggedIn(logged);
		}

		getLoggedIn();
	}, []);

	return (
		<>
			<Header />
			<main className="max-h-screen">
				<div className="flex content-center items-center justify-center h-screen">
					<div className="p-30 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg">
						{loggedIn ? (
							<>
								<h1 className="text-7xl text-orange-400 text-center font-semibold">
									É bom te ver de novo!
								</h1>

								<p className="mt-8 mb-6 text-5xl text-center text-orange-400">
									Vamos fazer um novo pedido?
								</p>

								<div className="mt-5 justify-center flex items-center gap-4">
									<a
										className="flex items-center gap-x-2 rounded-md bg-red-500 px-2.5 py-2.5 text-2xl text-white transition hover:bg-red-700"
										href="/pedido"
									>
										<svg
											width="36px"
											height="36px"
											viewBox="0 0 24 24"
											fill="white"
										>
											<circle
												cx="16.5"
												cy="18.5"
												r="1.5"
											/>
											<circle
												cx="9.5"
												cy="18.5"
												r="1.5"
											/>
											<path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
										</svg>
										<span>Fazer Pedido</span>
									</a>
								</div>
							</>
						) : (
							<>
								<h1 className="text-7xl text-orange-400 text-center font-semibold">
									Que bom que está aqui!
								</h1>

								<p className="mt-15 mb-8 text-6xl text-center text-orange-400">
									Vamos começar?
								</p>

								<div className="mt-5 justify-center flex items-center gap-4">
									<div className="sm:flex sm:gap-4">
										<a
											className="block rounded-md bg-red-400 px-8 py-4 text-lg font-medium text-white transition hover:bg-red-600"
											href="/login"
										>
											Login
										</a>

										<a
											className="hidden rounded-md border border-red-600 bg-slate-100 px-8 py-4 text-lg font-medium text-red-500 transition hover:text-red-700 hover:bg-slate-300 sm:block"
											href="/cadastrar"
										>
											Cadastrar
										</a>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
