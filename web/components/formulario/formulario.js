export default function Formulario() {
    return (
        <>
            <div>
                <form className="space-y-4">
                    <div>
                        <p className="mb-6 font-bold text-center text-lg text-cor-amarelo">Choose your options:</p>
                        <div className="flex justify-between mb-8">
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

                    <div>
                        <label htmlFor="type" className="block mb-2">Type</label>
                        <select id="type" name="type" className="w-full mb-2 bg-cor-offwhite shadow-lg text-cor-marrom text-sm p-2 rounded-md">
                        </select>
                    </div>

                    <div>
                        <label htmlFor="generation" className="block mb-2">Generation</label>
                        <select id="generation" name="generation" className="w-full mb-2 bg-cor-offwhite shadow-lg text-cor-marrom text-sm p-2 rounded-md">
                        </select>
                    </div>

                    <div className="flex items-end space-x-4">
                        <div className="w-1/5">
                            <label htmlFor="quantity" className="block mb-2">Quantity</label>
                            <input type="text" maxLength={2} defaultValue={3} id="quantity" name="quantity" className="w-full bg-cor-offwhite shadow-lg text-sm text-cor-marrom p-2 rounded-md" />
                        </div>

                        <div className="w-4/5">
                            <button type="" className="w-full bg-cor-amarelo bg-opacity-90 text-sm text-cor-marrom hover:bg-cor-amarelo hover:shadow-lg transition-all font-bold py-2 px-4 rounded-md">
                                Generate Poké Ipsum
                            </button>
                        </div>
                    </div>
                </form >
            </div >

        </>
    )
}