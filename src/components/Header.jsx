import { useEffect, useState } from "react";

import isLoggedIn from "../api/utils";

export default function Header() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		async function getLoggedIn() {
			const logged = await isLoggedIn();
			setLoggedIn(logged);
		}

		getLoggedIn();
	}, []);

	return (
		<header className="bg-white">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
				<div className="flex flex-1 items-center justify-end md:justify-between">
					<nav className="hidden md:block">
						<ul className="flex items-center gap-6 text-sm">
							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75"
									href="/"
								>
									Página inicial
								</a>
							</li>
						</ul>
					</nav>

					{loggedIn ? (
						<div className="flex items-center gap-4">
							<div className="sm:flex sm:gap-4">
								<a
									className="block rounded-md bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
									href="/pedido"
								>
									Fazer Pedido
								</a>
								<a
									className="block rounded-md bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
									href="/lista"
								>
									Meus pedidos
								</a>
							</div>
						</div>
					) : (
						<div className="flex items-center gap-4">
							<div className="sm:flex sm:gap-4">
								<a
									className="block rounded-md bg-red-400 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
									href="/login"
								>
									Login
								</a>

								<a
									className="hidden rounded-md border border-red-600 bg-slate-100 px-5 py-2.5 text-sm font-medium text-red-500 transition hover:text-red-700 hover:bg-slate-300 sm:block"
									href="/cadastrar"
								>
									Cadastrar
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
