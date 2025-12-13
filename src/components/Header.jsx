import { useEffect, useState } from "react";

import isLoggedIn from "../api/utils";

export default function Header() {
	const [loggedIn, setLoggedIn] = useState(false);

	const [isHovering, setIsHovering] = useState({
		pedido: false,
		lista: false
	});

	const handleHovering = (e) => {
		const field = e.target.id;
		const state = e._reactName === "onMouseEnter" ? true : false;

		setIsHovering({
			...isHovering,
			[field]: state
		});
	}

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
							<div className="sm:flex sm:gap-2">
								<a
									className="flex items-center gap-x-2 rounded-md bg-red-500 px-2.5 py-2.5 text-sm font-medium text-white 
										transition delay-50 duration-300 ease-in-out hover:scale-110 hover:bg-red-700"
									href="/pedido"
									id="pedido"
									onMouseEnter={handleHovering}
									onMouseLeave={handleHovering}
								>
									<svg
										width="24px"
										height="24px"
										viewBox="0 0 24 24"
										fill="white"
									>
										<circle cx="16.5" cy="18.5" r="1.5" />
										<circle cx="9.5" cy="18.5" r="1.5" />
										<path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
									</svg>
									
									<span 
										className={`
											${isHovering.pedido ? "opacity-100" : "opacity-0 -ml-2 max-w-0 max-h-0"}
											transition-all duration-500 ease-in-out overflow-hidden font-bold
										`}
									>
										Fazer Pedido
									</span>
								</a>

								<a
									className="flex items-center gap-x-2 rounded-md bg-red-500 px-2.5 py-2.5 text-sm font-medium text-white 
										transition delay-50 duration-300 ease-in-out hover:scale-110 hover:bg-red-700"
									href="/lista"
									id="lista"
									onMouseEnter={handleHovering}
									onMouseLeave={handleHovering}
								>
									<svg
										width="24px"
										height="24px"
										viewBox="0 0 24 12"
									>
										<rect
											x="5px"
											y="-4px"
											rx="2px"
											ry="2px"
											width="14px"
											height="20px"
											fill="none"
											stroke="white"
											strokeWidth="2px"
										/>

										<rect 
											width="8px"
											height="1px"
											x="8px"
											y="1px"
											fill="white"
										/>
										<rect 
											width="8px"
											height="1px"
											x="8px"
											y="4px"
											fill="white"
										/>
										<rect 
											width="8px"
											height="1px"
											x="8px"
											y="7px"
											fill="white"
										/>
										<rect 
											width="8px"
											height="1px"
											x="8px"
											y="10px"
											fill="white"
										/>
									</svg>

									<span 
										className={`
											${isHovering.lista ? "opacity-100" : "opacity-0 -ml-2 max-w-0 max-h-0"}
											transition-all duration-500 ease-in-out overflow-hidden font-bold
										`}
									>
										Pedidos
									</span>
								</a>
							</div>
						</div>
					) : (
						<div className="flex items-center gap-4">
							<div className="sm:flex sm:gap-4">
								<a
									className="block rounded-md bg-red-400 px-5 py-2.5 text-sm font-medium text-white 
										transition delay-50 duration-300 ease-in-out hover:scale-110 hover:bg-red-600"
									href="/login"
								>
									Login
								</a>

								<a
									className="hidden rounded-md border border-red-600 bg-slate-100 px-5 py-2.5 text-sm font-medium text-red-500 
										transition delay-50 duration-300 ease-in-out hover:scale-110 hover:text-red-700 hover:bg-slate-200 sm:block"
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
