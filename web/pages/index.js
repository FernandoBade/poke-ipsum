import React from 'react';
import Menu from '../components/menu/menu';
import Fundo from '../components/fundo/fundo';
import LoadingScreen from '../components/loading/loading';


export default function Index() {
    return (
        <div className="relative">
            <LoadingScreen />
            <main className="flex">
                <Menu />
            </main>
            <Fundo />
        </div>
    );
}
