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
                                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                    href="/pedido"
                                >
                                    Fazer Pedido
                                </a>
                            </div>
                        </div>
					) : (
                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <a
                                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                    href="/login"
                                >
                                    Login
                                </a>

                                <a
                                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                    href="/cadastrar"
                                >
                                    Register
                                </a>
                            </div>
                        </div>
					)}
				</div>
			</div>
		</header>
	);
}
