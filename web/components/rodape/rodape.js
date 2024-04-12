import { HeartIcon } from "@heroicons/react/24/outline";

export default function Rodape() {
    return (
        <div className="">
            <div className="flex justify-center items-center">
                <p className="flex gap-x-[6px] mb-0 bottom-0 text-sm text-cor-offwhite">
                    Poké Ipsum
                    <HeartIcon className="h-4 w-4 mt-[2px] text-cor-offwhite" />
                    Visit the repository on</p>
                <div className="logo">
                    <a href="https://github.com/FernandoBade/poke-ipsum" target="_blank" rel="noopener noreferrer"><img src="../../img/github-logo.png" alt="Github Logo" className="ml-1 mt-0 w-20 opacity-95 hover:opacity-100 hover:scale-105 transition-all ease-in-out" /></a>
                </div>
            </div>
        </div>
    );
}
