import React, { useState, useEffect } from 'react';
import { Listbox, RadioGroup, Popover } from '@headlessui/react';
import obterTiposElementos, { obterGeracoes } from '/utils/pokeipsumAPI';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

export default function Formulario() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("PARAGRAFO");
    const [tiposElementos, setTiposElementos] = useState([]);
    const [tiposElementosSelecionados, setTiposElementoSelecionados] = useState([]);
    const [geracoes, setGeracoes] = useState([]);
    const [geracoesSelecionadas, setGeracoesSelecionadas] = useState([]);
    const [quantidade, setQuantidade] = useState('5');

    useEffect(() => {
        obterTiposElementos().then(dados => {
            setTiposElementos(dados);
            setTiposElementoSelecionados([dados[0]]);
        }).catch(error => console.error(error));

        obterGeracoes().then(dados => {
            setGeracoes(dados);
            setGeracoesSelecionadas([dados[1]]);
        }).catch(error => console.error(error));
    }, []);

    const handleTiposElementosChange = (opcoesSelecionadas) => {
        const allTypesSelecionado = opcoesSelecionadas.some(opcao => opcao.name === 'All types') && !tiposElementosSelecionados.some(opcao => opcao.name === 'All types');

        if (allTypesSelecionado) {
            setTiposElementoSelecionados([tiposElementos[0]]);
        } else {
            if (tiposElementosSelecionados.some(opcao => opcao.name === 'All types') && opcoesSelecionadas.length > 1) {
                const novaSelecao = opcoesSelecionadas.filter(opcao => opcao.name !== 'All types');
                setTiposElementoSelecionados(novaSelecao);
            } else {
                setTiposElementoSelecionados(opcoesSelecionadas);
            }
        }
    };

    const handleGeracoesChange = (opcoesSelecionadas) => {
        const allGenerationsSelecionado = opcoesSelecionadas.some(opcao => opcao.name === 'All Generations');
        const selecaoAnteriorAllgenerations = geracoesSelecionadas.some(opcao => opcao.name === 'All Generations');

        if (allGenerationsSelecionado && !selecaoAnteriorAllgenerations) {
            setGeracoesSelecionadas([geracoes.find(g => g.name === 'All Generations')]);
        } else if (selecaoAnteriorAllgenerations && opcoesSelecionadas.length > 1) {
            const novaSelecao = opcoesSelecionadas.filter(opcao => opcao.name !== 'All Generations');
            setGeracoesSelecionadas(novaSelecao);
        } else {
            setGeracoesSelecionadas(opcoesSelecionadas);
        }
    };

    const handleQuantidadeChange = (e) => {
        setQuantidade(e.target.value);
    };

    const validarQuantidade = () => {
        let value = parseInt(quantidade, 10);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        setQuantidade(value.toString().padStart(1));
    };

    const handleBotao = () => {
        const quantidade = document.getElementById('quantity').value;

        console.log("Opção selecionada:", opcaoSelecionada);
        console.log("Tipos de elementos selecionados:", tiposElementosSelecionados);
        console.log("Gerações selecionadas:", geracoesSelecionadas);
        console.log("Quantidade:", quantidade);
    };

    return (
        <>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleBotao();
                }}>
                    <div id="radioButtons">
                        <p className="mb-2 font-bold index-100 text-sm text-cor-offwhite">CONTENT MODE:</p>
                        <RadioGroup value={opcaoSelecionada} onChange={setOpcaoSelecionada} className="flex justify-between items-center">
                            <RadioGroup.Option value="PARAGRAFO" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`cursor-pointer transition-all ease-in-out hover:transition-all border border-transparent ${checked ? 'bg-cor-offwhite text-cor-marrom text-sm p-2 rounded-md text-cor-amarelho hover:shadow-2xl' : 'hover:border-cor-offwhite p-2 text-sm rounded-md'}`}>
                                        <input type="radio" className="sr-only" />
                                        <label htmlFor="paragraphs" className="cursor-pointer">Paragraphs</label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="FRASE" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`cursor-pointer transition-all ease-in-out hover:transition-all border border-transparent ${checked ? 'bg-cor-offwhite text-cor-marrom text-sm p-2 rounded-md text-cor-amarelho hover:shadow-2xl' : 'hover:border-cor-offwhite p-2 text-sm rounded-md'}`}>
                                        <input type="radio" className="sr-only" />
                                        <label htmlFor="sentences" className="cursor-pointer">Sentences</label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="PALAVRA" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`cursor-pointer transition-all ease-in-out hover:transition-all border border-transparent ${checked ? 'bg-cor-offwhite text-cor-marrom text-sm p-2 rounded-md text-cor-amarelho hover:shadow-2xl' : 'hover:border-cor-offwhite p-2 text-sm rounded-md'}`}>
                                        <input type="radio" className="sr-only" />
                                        <label htmlFor="words" className="cursor-pointer">Words</label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                        </RadioGroup>
                    </div>

                    <Listbox value={tiposElementosSelecionados} onChange={handleTiposElementosChange} multiple>
                        {({ open }) => (
                            <>
                                <div className='flex mt-[1.5rem!important]'>
                                    <Listbox.Label className="mb-2 flex font-bold text-sm text-cor-offwhite">TYPE:</Listbox.Label>
                                    <Popover className="relative ml-1">
                                        {({ open }) => (
                                            <>
                                                <Popover.Button className="active:outline-nome active:border-none hover:scale-110 transition-all ease-in-out">
                                                    <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-cor-offwhite" />
                                                </Popover.Button>

                                                <Popover.Panel className="absolute shadow-2xl z-20 font-thin left-full w-[250px] text-sm translate-y-[-60px] transition-all ease-in-out text-cor-offwhite p-4 ml-2 bg-cor-marrom rounded-md opacity-95">
                                                    Remember that in the new generations there are classic Pokémon with different types.
                                                </Popover.Panel>
                                            </>
                                        )}
                                    </Popover>
                                </div>
                                <div className="relative">
                                    <Listbox.Button className="mb-2 w-full text-left bg-cor-offwhite shadow-lg text-sm p-2 rounded-md text-cor-marrom">
                                        {tiposElementosSelecionados.length > 0
                                            ? tiposElementosSelecionados.map((tipo) => tipo.name).join(', ')
                                            : "Select at least one type"}
                                    </Listbox.Button>
                                    <Listbox.Options className="z-10 absolute w-full text-left bg-cor-offwhite text-cor-marrom shadow-lg max-h-60 rounded-md text-base overflow-auto focus:outline-none sm:text-sm">
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

                    <Listbox value={geracoesSelecionadas} onChange={handleGeracoesChange} multiple>
                        {({ open }) => (
                            <>
                                <div className='flex mt-[1rem!important]'>
                                    <Listbox.Label className="mb-2 font-bold text-sm text-cor-offwhite">GENERATION:</Listbox.Label>
                                    <Popover className="relative ml-1 focus:outline-none">
                                        {({ open }) => (
                                            <>
                                                <Popover.Button className="hover:scale-110 transition-all ease-in-out">
                                                    <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-cor-offwhite" />
                                                </Popover.Button>

                                                <Popover.Panel className="absolute shadow-2xl z-30 font-thin left-full w-[250px] text-sm translate-y-[-70px] transition-all ease-in-out text-cor-offwhite p-4 ml-2 bg-cor-marrom rounded-md opacity-95">
                                                    For Pokémon variants such as Mega, Gigantamax, or special editions, only their original names will be displayed.
                                                </Popover.Panel>
                                            </>
                                        )}
                                    </Popover>

                                </div>
                                <div className="relative">
                                    <Listbox.Button className="mb-2 w-full text-left bg-cor-offwhite shadow-lg text-sm p-2 rounded-md text-cor-marrom">
                                        {geracoesSelecionadas.length > 0
                                            ? geracoesSelecionadas.map((geracao) => geracao.name).join(', ')
                                            : 'Select at least one generation'}
                                    </Listbox.Button>
                                    <Listbox.Options className="z-10 absolute w-full text-left bg-cor-offwhite text-cor-marrom shadow-lg max-h-60 rounded-md text-base overflow-auto focus:outline-none sm:text-sm">
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

                    <div className="flex items-end mt-[1rem!important] space-x-4">
                        <div className="w-1/5">
                            <label htmlFor="quantity" className="block mb-2 font-bold text-sm text-cor-offwhite">QUANTITY:</label>
                            <input type="text" maxLength={2} value={quantidade} onChange={handleQuantidadeChange} onBlur={validarQuantidade} id="quantity" name="quantity" className="w-full bg-cor-offwhite shadow-lg text-sm p-2 rounded-md text-cor-marrom" />
                        </div>

                        <div className="w-4/5">
                            <button type="submit" className="w-full bg-cor-amarelo transition-all py-2 px-4 duration-150 rounded-md text-sm text-cor-marrom font-bold hover:bg-cor-amarelo hover:shadow-2xl hover:transition-all hover:ease-in-out hover:duration-150 hover:border-cor-amarelo hover:bg-opacity-90">
                                GENERATE POKÉ IPSUM
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </>
    );
}
