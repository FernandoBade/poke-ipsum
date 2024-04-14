import React, { useState, useEffect, useRef } from 'react';
import Display from '../display/display';
import PopoverReactBootstrap from '../tooltip/tooltip';
import obterTiposElementos, { obterGeracoes, realizarRequisicao, criarParametrosURL } from '/utils/pokeipsumAPI';
import { Listbox, RadioGroup } from '@headlessui/react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { Spinner } from 'react-bootstrap';

export default function Formulario() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("PARAGRAFO");
    const [tiposElementos, setTiposElementos] = useState([]);
    const [tiposElementosSelecionados, setTiposElementoSelecionados] = useState([]);
    const [geracoes, setGeracoes] = useState([]);
    const [geracoesSelecionadas, setGeracoesSelecionadas] = useState([]);
    const [mostrarOffcanvas, setMostrarOffcanvas] = useState(false);
    const [dadosRetornados, setDadosRetornados] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantidade, setQuantidade] = useState('');
    
    const inputRef = useRef(null);

    useEffect(() => {
        document.getElementById('quantity').addEventListener('blur', () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        });

        obterTiposElementos().then(setTiposElementos).catch(console.error);
        obterGeracoes().then(setGeracoes).catch(console.error);
    }, []);

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
        const value = e.target.value;
        // Allow only numeric values
        if (/^\d*$/.test(value)) {
            setQuantidade(value);
        }
    };

    const handleBotao = async (e) => {
        e.preventDefault();
        setMostrarOffcanvas(true);
        setLoading(true);

        const opcoesUsuario = {
            modo: opcaoSelecionada,
            tiposelementos: tiposElementosSelecionados.length > 0 ? tiposElementosSelecionados.map(tipoElemento => tipoElemento.id).join(',') : "",
            geracoes: geracoesSelecionadas.length > 0 ? geracoesSelecionadas.map(geracao => geracao.id).join(',') : "",
            quantidade: quantidade || '0'

        };

        try {
            const data = await realizarRequisicao(criarParametrosURL(opcoesUsuario));

            setDadosRetornados(data);
            setMostrarOffcanvas(true);
        } catch (erro) {
            console.log(erro);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const toggleOffcanvas = (status) => {
        setMostrarOffcanvas(status);
    };

    return (
        <>
            <div>
                <form onSubmit={handleBotao}>

                    <div id="radioButtons">
                        <p className="mb-2 font-bold index-100 text-sm text-cor-offwhite">CONTENT MODE:</p>
                        <RadioGroup value={opcaoSelecionada} onChange={setOpcaoSelecionada} className="flex justify-between items-center">
                            <RadioGroup.Option value="PARAGRAFO" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`px-3 py-2 border-2 text-md border-cor-offwhite border-opacity-80 text-opacity-90 rounded-md cursor-pointer ${checked ? 'bg-cor-offwhite text-cor-marrom' : 'text-cor-offwhite'} hover:text-opacity-100 hover:border-opacity-100 transition-all ease-in-out`}>
                                        <input type="radio" className="sr-only" />
                                        <label htmlFor="paragraphs" className="cursor-pointer">Paragraphs</label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="FRASE" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`px-3 py-2 border-2 text-md border-cor-offwhite border-opacity-80 text-opacity-90 rounded-md cursor-pointer ${checked ? 'bg-cor-offwhite text-cor-marrom' : 'text-cor-offwhite'} hover:text-opacity-100 hover:border-opacity-100 transition-all ease-in-out`}>
                                        <input type="radio" className="sr-only" />
                                        <label htmlFor="sentences" className="cursor-pointer">Sentences</label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="PALAVRA" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`px-3 py-2 border-2 text-md border-cor-offwhite border-opacity-80 text-opacity-90 rounded-md cursor-pointer ${checked ? 'bg-cor-offwhite text-cor-marrom' : 'text-cor-offwhite'} hover:text-opacity-100 hover:border-opacity-100 transition-all ease-in-out`}>
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
                                    <PopoverReactBootstrap subtitulo="In Poké Ipsum, Pokémon are listed by their original names, regardless of regional types, mega forms, or any other variations">
                                        <ChatBubbleLeftEllipsisIcon className="ml-1 mt-[2px] h-4 w-4 text-cor-offwhite cursor-pointer hover:scale-110 hover:text-cor-laranja transition-all ease-in-out" />
                                    </PopoverReactBootstrap>
                                </div>
                                <div className="relative">
                                    <Listbox.Button className="mb-2 w-full text-left bg-cor-offwhite shadow-lg text-md p-2 rounded-md text-cor-marrom">
                                        {tiposElementosSelecionados.length > 0
                                            ? tiposElementosSelecionados.map((tipo) => tipo.name).join(', ')
                                            : "Select at least one type"}
                                    </Listbox.Button>
                                    <Listbox.Options className="z-10 absolute w-full text-left bg-cor-offwhite text-cor-marrom shadow-lg max-h-60 rounded-md text-base overflow-auto focus:outline-none">
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
                                                        <span className={'block truncate'}>
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
                                    <PopoverReactBootstrap subtitulo="In Poké Ipsum, Pokémon are listed by their original names, regardless of regional types, mega forms, or any other variations">
                                        <ChatBubbleLeftEllipsisIcon className="ml-1 mt-[2px] h-4 w-4 text-cor-offwhite cursor-pointer hover:scale-110 hover:text-cor-laranja transition-all ease-in-out" />
                                    </PopoverReactBootstrap>

                                </div>
                                <div className="relative">
                                    <Listbox.Button className="mb-2 w-full text-left bg-cor-offwhite shadow-lg text-md p-2 rounded-md text-cor-marrom">
                                        {geracoesSelecionadas.length > 0
                                            ? geracoesSelecionadas.map((geracao) => geracao.name).join(', ')
                                            : 'Select at least one generation'}
                                    </Listbox.Button>
                                    <Listbox.Options className="z-10 absolute w-full text-left bg-cor-offwhite text-cor-marrom shadow-lg max-h-60 rounded-md overflow-auto focus:outline-none">
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
                                                        <span className={'block truncate'}>
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
                            <input
                                ref={inputRef}
                                type="text"
                                id="quantity"
                                name="quantity"
                                className="w-full bg-cor-offwhite shadow-lg text-md p-2 rounded-md text-cor-marrom"
                                value={quantidade}
                                onChange={handleQuantidadeChange}
                            />
                        </div>

                        <div className="w-4/5">
                            <button type="submit" className="w-full bg-cor-amarelo transition-all py-2 px-4 duration-150 rounded-md text-md text-cor-marrom font-bold hover:bg-cor-amarelo hover:box-shadow-2xl hover:transition-all hover:ease-in-out hover:duration-150 hover:border-cor-amarelo hover:text-cor-laranja" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Loading...</span>
                                    </>
                                ) : (
                                    'GENERATE POKÉ IPSUM'
                                )}
                            </button>

                            <Display show={mostrarOffcanvas} onHide={() => toggleOffcanvas(false)} data={dadosRetornados}></Display>
                        </div>
                    </div>
                </form>
            </div >
        </>
    );
}