import Header from "../components/Header";
import isLoggedIn from "../api/utils";
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
			<main className="h-screen">
				<div className="flex content-center items-center justify-center h-screen">
					<div className="p-30 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg -translate-y-16">
                        <h1 className="text-7xl text-orange-400 font-semibold">
                            Que bom que está aqui!
                        </h1>
						{loggedIn ? (
							<></>
						) : (
							<>
								<p className="mt-15 text-6xl text-center text-orange-400">
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
