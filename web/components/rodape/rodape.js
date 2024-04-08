import { HeartIcon } from "@heroicons/react/24/solid";

export default function Rodape() {
    return (
        <div className="">
            <div className="flex items-center justify-center">
                <p className="flex gap-x-[5px] items-center text-[0.7rem] text-cor-offwhite">
                    Poké Ipsum
                    <HeartIcon className="h-4 w-4 text-cor-offwhite" />
                    Visit the repository on</p>
                <div className="logo">
                    <a href="https://github.com/FernandoBade/poke-ipsum" target="_blank" rel="noopener noreferrer"><img src="../../img/github-logo.png" alt="Github Logo" className="ml-1 w-20 hover:scale-105 transition-all ease-in-out" /></a>
                </div>
            </div>
        </div>
    );
}
