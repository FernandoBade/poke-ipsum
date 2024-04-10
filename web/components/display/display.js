import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

function Display(props) {
    const { dados, mostrarOffcanvas, toggleOffcanvas } = props;

    return (
        <Offcanvas show={mostrarOffcanvas} placement="end" onHide={() => toggleOffcanvas(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>RESULTS</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/* Corpo do Offcanvas */}
                {dados.map((item, index) => (
                    <p key={index} className="my-2 text-justify">
                        {item}
                    </p>
                ))}
                {/* Rodapé do Offcanvas */}
                <div className="p-4 bg-cor-amarelo bg-opacity-90 shadow-lg text-center">
                    <div className="flex align-middle justify-center gap-1 items-center cursor-pointer hover:scale-105 transition-all ease-in-out">
                        <ClipboardDocumentIcon className="h-6 w-6 text-cor-marrom hover:text-cor-laranja transition-all ease-in-out" />
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Display;
