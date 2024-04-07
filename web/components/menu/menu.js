import Formulario from "../formulario/formulario";

export default function MenuLateral() {
    return (
        <div className="fixed top-0 left-0 h-full w-[385px] bg-cor-carvao opacity-95 text-cor-offwhite z-10 shadow-lg">
            <div className="p-6">
                <div className="logo">
                    <img src="../../img/logo.png" alt="Logotipo" className="ml-2 pt-4 w-auto" />
                </div>
                <h2 className="text-sm text-center text-cor-amarelo font-bold">Your design journey, one Pokémon at time!</h2>
                <hr className="my-6" />
                <Formulario />
                <hr className="my-8" />

            </div>
        </div>
    );
}
