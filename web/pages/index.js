import MenuLateral from '../components/menu/menu.js';
import Fundo from '../components/fundo/fundo.js';

export default function Index() {
    return (
        <div className="relative">
            <main className="">
                <Fundo />
                <MenuLateral />

            </main>
        </div>
    );
}
