import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';

const tiposElementos = [
    { id: 1, name: 'All types' },
    { id: 2, name: 'Fire' },
    { id: 3, name: 'Water' },
    { id: 4, name: 'Grass' },
];

const geracoes = [
    { id: 1, name: 'Generation I' },
    { id: 2, name: 'Generation II' },
    { id: 3, name: 'Generation III' },
];

export default function Formulario() {
    const [tiposElementosSelecionados, setTiposElementoSelecionados] = useState([tiposElementos[0]]);
    const [geracoesSelecionadas, setGeracoesSelecionadas] = useState([geracoes[0]]);

    const handleTiposElementosChange = (opcoesSelecionadas) => {
        const isAllTypesBeingSelected = opcoesSelecionadas.some(opcao => opcao.name === 'All types') && !tiposElementosSelecionados.some(opcao => opcao.name === 'All types');

        if (isAllTypesBeingSelected) {
            setTiposElementoSelecionados([tiposElementos[0]]);
        } else {
            if (tiposElementosSelecionados.some(opcao => opcao.name === 'All types') && opcoesSelecionadas.length > 1) {
                const newSelection = opcoesSelecionadas.filter(opcao => opcao.name !== 'All types');
                setTiposElementoSelecionados(newSelection);
            } else {
                setTiposElementoSelecionados(opcoesSelecionadas);
            }
        }
    };

    return (
        <>
            <div>
                <form className="space-y-4">
                    <div>
                        <p className="mb-6 font-bold text-center index-100 text-md text-cor-amarelo">Choose your options:</p>
                        <div className="flex justify-between mb-6">
                            <label htmlFor="paragraphs" className="cursor-pointer">
                                <input type="radio" id="paragraphs" name="option" value="paragraphs" className="mr-2" defaultChecked />
                                Paragraphs
                            </label>
                            <label htmlFor="sentences" className="cursor-pointer">
                                <input type="radio" id="sentences" name="option" value="sentences" className="mr-2" />
                                Sentences
                            </label>
                            <label htmlFor="words" className="cursor-pointer">
                                <input type="radio" id="words" name="option" value="words" className="mr-2" />
                                Words
                            </label>
                        </div>
                    </div>

                    <Listbox value={tiposElementosSelecionados} onChange={handleTiposElementosChange} multiple>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block mb-2 font-bold text-sm text-cor-offwhite">TYPE</Listbox.Label>
                                <div className="relative">
                                    <Listbox.Button className="w-full mb-2 text-left bg-cor-offwhite shadow-lg text-sm p-2 rounded-md text-cor-marrom">
                                        {tiposElementosSelecionados.length > 0
                                            ? tiposElementosSelecionados.map((tipo) => tipo.name).join(', ')
                                            : "Select at least one type"}
                                    </Listbox.Button>
                                    <Listbox.Options className="z-10 absolute w-full text-left bg-cor-offwhite text-cor-marrom shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                                        {tiposElementos.map((tipo) => (
                                            <Listbox.Option
                                                key={tipo.id}
                                                value={tipo}
                                                className={({ active, selected }) =>
                                                    `cursor-pointer select-none relative py-2 pl-4 pr-4 ${selected ? 'bg-cor-amarelo opacity-90' : 'bg-cor-offwhite'
                                                    } ${active && 'bg-cor-amarelo'}`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                            {tipo.name}
                                                        </span>
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </>
                        )}
                    </Listbox>

                    <Listbox value={geracoesSelecionadas} onChange={setGeracoesSelecionadas} multiple>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block mb-2 font-bold text-sm text-cor-offwhite">GENERATION</Listbox.Label>
                                <div className="relative">
                                    <Listbox.Button className="w-full mb-2 text-left bg-cor-offwhite shadow-lg text-sm p-2 rounded-md text-cor-marrom">
                                        {geracoesSelecionadas.length > 0
                                            ? geracoesSelecionadas.map((geracao) => geracao.name).join(', ')
                                            : 'Select at least one generation'}
                                    </Listbox.Button>
                                    <Listbox.Options className="z-10 absolute w-full text-left bg-cor-offwhite text-cor-marrom shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                                        {geracoes.map((geracao) => (
                                            <Listbox.Option
                                                key={geracao.id}
                                                value={geracao}
                                                className={({ active, selected }) =>
                                                    `cursor-pointer select-none relative py-2 pl-4 pr-4 ${selected ? 'bg-cor-amarelo opacity-90' : 'bg-cor-offwhite'
                                                    } ${active && 'bg-cor-amarelo'}`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                            {geracao.name}
                                                        </span>
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </>
                        )}
                    </Listbox>

                    <div className="flex items-end space-x-4">
                        <div className="w-1/5">
                            <label htmlFor="quantity" className="block mb-2 font-bold text-sm text-cor-offwhite">QUANTITY</label>
                            <input type="text" maxLength={2} defaultValue={3} id="quantity" name="quantity" className="w-full bg-cor-offwhite shadow-lg text-sm p-2 rounded-md text-cor-marrom" />
                        </div>

                        <div className="w-4/5">
                            <button type="button" className="w-full bg-cor-amarelo bg-opacity-90 hover:bg-cor-amarelo hover:shadow-lg transition-all font-bold py-2 px-4 rounded-md text-sm text-cor-marrom">
                                GENERATE POKÉ IPSUM
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
