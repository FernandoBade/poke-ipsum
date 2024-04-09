import React, { useState } from 'react';
import Formulario from "../formulario/formulario";
import Rodape from "../rodape/rodape";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Menu() {
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const handleAlerta = () => setMostrarAlerta(true);
    return (
        <div className="fixed top-0 left-0 h-full w-[385px] bg-cor-carvao bg-opacity-90 text-cor-offwhite z-10 flex flex-col justify-between drop-shadow-[0_25px_6px_rgba(0,0,0,0.55)]">
            {mostrarAlerta && (
                <div className="  fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="max-w-[385px] bg-cor-offwhite text-cor-marrom p-4 rounded-lg shadow-lg text-center text-sm">
                        <div className="mb-2 font-bold text-cor-laranja text-lg">Poké Ipsum - Version 1.0 - April/2024</div>
                        <hr className="my-2 bg-cor-marrom" />
                        <p>This is a study project and is not for profit. All images, names, or any content related to Pokémon are the property of <a href="https://corporate.pokemon.com/en-us/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-cor-laranja transition-all ease-in-out">The Pokémon Company ©</a>. All rights reserved.</p>

                        <p className="mt-4">For more details about the project, visit the <a href="https://github.com/FernandoBade/poke-ipsum" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-cor-laranja transition-all ease-in-out">repository on GitHub</a>.</p>
                        <div className="flex justify-center mt-4">
                            <button onClick={() => setMostrarAlerta(false)} className="bg-cor-amarelo bg-opacity-80 transition-all py-2 px-4 duration-150 rounded-md text-sm text-cor-marrom font-bold hover:bg-cor-amarelo hover:shadow-md hover:transition-all hover:ease-in-out hover:duration-150 hover:border-cor-amarelo">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="absolute top-4 right-4">
                <InformationCircleIcon className="h-6 w-6 text-cor-amarelo cursor-pointer hover:scale-105 transition-all ease-in-out" onClick={handleAlerta} />
            </div>
            <div className="p-6 flex-grow">
                <div className="logo">
                    <img src="../../img/logo.png" alt="Poké Ipsum Logo" className="ml-2 pt-4 w-auto" />
                </div>
                <h2 className="text-sm text-center text-cor-amarelo font-bold">Your design journey, one Pokémon at time!</h2>
                <hr className="mb-4 mt-4" />
                <Formulario />
                <hr className="mt-5" />
            </div>
            <div className="p-4">
                <Rodape />
            </div>
        </div>
    );
}
