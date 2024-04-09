import React, { useState, useEffect } from 'react';
import Menu from '../components/menu/menu';
import Fundo from '../components/fundo/fundo';
import Display from '../components/display/display';

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

export default function Index() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setDados(retornoDadosMockup);
        }, 1000);
    }, []);

    return (
        <div className="relative">
            <main className="flex">
                <Menu />
                <Display dados={dados} />
            </main>
            <Fundo />
        </div>
    );
}
