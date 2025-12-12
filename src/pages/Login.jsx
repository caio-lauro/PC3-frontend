import Header from "../components/Header";

export default function Login() {
    return (
        <>
            <Header />
            <main className="h-screen">
                <div className="flex content-center items-center justify-center">
                    <form className="bg-white/80 border border-black/25 backdrop-blur-sm shadow-md rounded pt-4 px-8 pb-4 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                E-mail
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="E-mail" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Senha
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
                        </div>

                        <div className="flex items-center justify-center">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}