import React, { useState } from 'react';
import Formulario from "../formulario/formulario";
import Rodape from "../rodape/rodape";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import { Modal } from 'react-bootstrap';

export default function Menu() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const handleModal = () => setMostrarModal(true);

    return (
        <>
            <div className="fixed top-0 left-0 h-full w-[385px] bg-cor-carvao bg-opacity-80 text-cor-offwhite z-10 flex flex-col justify-between drop-shadow-[0_25px_6px_rgba(0,0,0,0.55)]">
                <div className="absolute top-5 left-5">
                    <CodeBracketSquareIcon className="h-6 w-6 text-cor-amarelo cursor-pointer hover:text-cor-laranja transition-all ease-in-out" onClick={handleModal} />
                </div>
                <div className="p-6 flex-grow">
                    <div className="logo">
                        <img src="../../img/logo.png" alt="Poké Ipsum Logo" className="ml-2 pt-4 w-auto" />
                    </div>
                    <h2 className="mb-0 text-sm text-center text-cor-amarelo font-bold">Your design journey, one Pokémon at time!</h2>
                    <hr className="mb-4 mt-4" />
                    <Formulario />
                    <hr className="mt-4" />
                </div>
                <div className="p-3">
                    <Rodape />
                </div>
            </div>

            <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} size="md" centered>
                <Modal.Body>
                    <p className='text-cor-marrom mb-4'>This is an unofficial, non-profit project developed for study purposes, with no guarantee of data accuracy. All images, names, and other content related to Pokémon are the exclusive property of <a href="https://corporate.pokemon.com/en-us/" target="_blank" rel="noopener noreferrer" className="text-cor-marrom font-bold hover:text-cor-laranja no-underline transition-all ease-in-out">The Pokémon Company©</a>. All rights reserved.</p>
                    <p className='text-cor-marrom mb-4'><a href="https://moewalls.com/games/pikachu-in-the-rain-pokemon-live-wallpaper/" target="_blank" rel="noopener noreferrer" className="text-cor-marrom font-bold hover:text-cor-laranja no-underline transition-all ease-in-out">Here </a> you can found the Pikachu In The Rain background video source.</p>
                    <p className='text-cor-marrom mb-0'>If you enjoyed the project or would like more information, feel free to visit the repository <a href="https://github.com/FernandoBade/poke-ipsum" target="_blank" rel="noopener noreferrer" className="text-cor-marrom font-bold hover:text-cor-laranja no-underline transition-all ease-in-out">repository on GitHub</a>.</p>
                </Modal.Body>
                <Modal.Footer className='flex justify-between'>
                    <p>Poké Ipsum v1.2 - May 2024</p>

                    <button onClick={() => setMostrarModal(false)} type="submit" className=" bg-cor-amarelo transition-all py-2 px-3 duration-150 rounded-md text-sm text-cor-marrom font-bold hover:bg-cor-amarelo hover:box-shadow-2xl hover:transition-all hover:ease-in-out hover:duration-150 hover:border-cor-amarelo hover:text-cor-laranja">
                        CLOSE
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
