import React, { useState, useEffect } from 'react';
import Display from '../display/display';
import obterTiposElementos, { obterGeracoes } from '/utils/pokeipsumAPI';
import { Listbox, RadioGroup, Popover } from '@headlessui/react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

const retornoDadosMockup = [
    "Farfetchd dodrio spearow ditto pidgey dodrio pidgeotto fearow. Persian tauros chansey meowth chansey. Meowth raticate pidgey wigglytuff rattata. Pidgey snorlax tauros meowth tauros persian. Jigglypuff farfetchd meowth lickitung tauros ditto porygon doduo.",
    "Rattata jigglypuff wigglytuff spearow chansey doduo. Chansey kangaskhan lickitung persian spearow tauros meowth pidgeotto. Jigglypuff dodrio dodrio doduo wigglytuff ditto. Lickitung snorlax wigglytuff spearow eevee chansey.",
    "Fearow snorlax meowth wigglytuff meowth porygon ditto persian. Kangaskhan pidgeot meowth meowth pidgeot. Raticate jigglypuff persian snorlax ditto farfetchd chansey. Wigglytuff farfetchd snorlax persian raticate pidgey.",
    "Farfetchd dodrio spearow ditto pidgey dodrio pidgeotto fearow. Persian tauros chansey meowth chansey. Meowth raticate pidgey wigglytuff rattata. Pidgey snorlax tauros meowth tauros persian. Jigglypuff farfetchd meowth lickitung tauros ditto porygon doduo.",
    "Rattata jigglypuff wigglytuff spearow chansey doduo. Chansey kangaskhan lickitung persian spearow tauros meowth pidgeotto. Jigglypuff dodrio dodrio doduo wigglytuff ditto. Lickitung snorlax wigglytuff spearow eevee chansey.",
    "Fearow snorlax meowth wigglytuff meowth porygon ditto persian. Kangaskhan pidgeot meowth meowth pidgeot. Raticate jigglypuff persian snorlax ditto farfetchd chansey. Wigglytuff farfetchd snorlax persian raticate pidgey.",
    "Dodrio raticate rattata ditto snorlax tauros rattata ditto. Snorlax kangaskhan wigglytuff kangaskhan ditto pidgeotto. Eevee pidgey raticate ditto pidgey raticate farfetchd. Fearow eevee chansey chansey snorlax meowth kangaskhan.",
    "Farfetchd dodrio spearow ditto pidgey dodrio pidgeotto fearow. Persian tauros chansey meowth chansey. Meowth raticate pidgey wigglytuff rattata. Pidgey snorlax tauros meowth tauros persian. Jigglypuff farfetchd meowth lickitung tauros ditto porygon doduo.",
    "Rattata jigglypuff wigglytuff spearow chansey doduo. Chansey kangaskhan lickitung persian spearow tauros meowth pidgeotto. Jigglypuff dodrio dodrio doduo wigglytuff ditto. Lickitung snorlax wigglytuff spearow eevee chansey.",
    "Fearow snorlax meowth wigglytuff meowth porygon ditto persian. Kangaskhan pidgeot meowth meowth pidgeot. Raticate jigglypuff persian snorlax ditto farfetchd chansey. Wigglytuff farfetchd snorlax persian raticate pidgey.",
    "Dodrio raticate rattata ditto snorlax tauros rattata ditto. Snorlax kangaskhan wigglytuff kangaskhan ditto pidgeotto. Eevee pidgey raticate ditto pidgey raticate farfetchd. Fearow eevee chansey chansey snorlax meowth kangaskhan.",
    "Kangaskhan eevee persian fearow pidgey wigglytuff dodrio. Kangaskhan chansey doduo doduo lickitung rattata. Snorlax pidgey doduo dodrio tauros rattata porygon ditto."
];

export default function Formulario() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("PARAGRAFO");
    const [tiposElementos, setTiposElementos] = useState([]);
    const [tiposElementosSelecionados, setTiposElementoSelecionados] = useState([]);
    const [geracoes, setGeracoes] = useState([]);
    const [geracoesSelecionadas, setGeracoesSelecionadas] = useState([]);
    const [quantidade, setQuantidade] = useState('5');
    const [mostrarOffcanvas, setMostrarOffcanvas] = useState(false);


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

    const handleBotao = (e) => {
        e.preventDefault();
        const quantidade = document.getElementById('quantity').value;

        console.log("Opção selecionada:", opcaoSelecionada);
        console.log("Tipos de elementos selecionados:", tiposElementosSelecionados);
        console.log("Gerações selecionadas:", geracoesSelecionadas);
        console.log("Quantidade:", quantidade);
        setMostrarOffcanvas(true);
    };


    const toggleOffcanvas = (status) => {
        setMostrarOffcanvas(status);
    };

    return (
        <>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault(); // Impede o comportamento padrão do evento de formulário
                    handleBotao(e);
                }}>
                    <div id="radioButtons">
                        <p className="mb-2 font-bold index-100 text-sm text-cor-offwhite">CONTENT MODE:</p>
                        <RadioGroup value={opcaoSelecionada} onChange={setOpcaoSelecionada} className="flex justify-between items-center">
                            <RadioGroup.Option value="PARAGRAFO" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`px-3 py-2 border-2 text-sm border-cor-offwhite border-opacity-80 text-opacity-90 font-semibold rounded-md cursor-pointer ${checked ? 'bg-cor-offwhite text-cor-marrom' : 'text-cor-offwhite'} hover:text-opacity-100 hover:border-opacity-100 transition-all ease-in-out`}>
                                        <input type="radio" className="sr-only" />
                                        <label htmlFor="paragraphs" className="cursor-pointer">Paragraphs</label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="FRASE" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`px-3 py-2 border-2 text-sm border-cor-offwhite border-opacity-80 text-opacity-90 font-semibold rounded-md cursor-pointer ${checked ? 'bg-cor-offwhite text-cor-marrom' : 'text-cor-offwhite'} hover:text-opacity-100 hover:border-opacity-100 transition-all ease-in-out`}>
                                        <input type="radio" className="sr-only" />
                                        <label htmlFor="sentences" className="cursor-pointer">Sentences</label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="PALAVRA" className="cursor-pointer">
                                {({ checked }) => (
                                    <div className={`px-3 py-2 border-2 text-sm border-cor-offwhite border-opacity-80 text-opacity-90 font-semibold rounded-md cursor-pointer ${checked ? 'bg-cor-offwhite text-cor-marrom' : 'text-cor-offwhite'} hover:text-opacity-100 hover:border-opacity-100 transition-all ease-in-out`}>
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
                            <button type="submit" className="w-full bg-cor-amarelo transition-all py-2 px-4 duration-150 rounded-md text-sm text-cor-marrom font-bold hover:bg-cor-amarelo hover:box-shadow-2xl hover:transition-all hover:ease-in-out hover:duration-150 hover:border-cor-amarelo hover:text-cor-laranja">
                                GENERATE POKÉ IPSUM
                            </button>

                            <Display show={mostrarOffcanvas} onHide={() => toggleOffcanvas(false)}>
                                {retornoDadosMockup}
                            </Display>
                        </div>
                    </div>
                </form>
            </div >
        </>
    );
}