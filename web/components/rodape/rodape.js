import { HeartIcon } from "@heroicons/react/24/solid";

export default function Rodape() {
    return (
        <div className="">
            <div className="flex items-center justify-center">
                <p className="flex gap-x-2 items-center text-[0.8rem] text-cor-offwhite">
                    Poké Ipsum
                    <HeartIcon className="h-4 w-4 text-cor-offwhite" />
                    Visit repository on</p>
                <div className="logo">
                    <img src="../../img/github-logo.png" alt="Github Logo" className="ml-2 w-20" />
                </div>
            </div>
        </div>
    );
}
