import React, { useState } from 'react';
import { Offcanvas, Spinner } from 'react-bootstrap';
import { ArrowRightEndOnRectangleIcon, ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function Display({ show, onHide, data }) {
    const [copiado, setCopiado] = useState(false);
    const [emTransformacao, setEmTransformacao] = useState(false);
    const [mostrarLoader, serMostrarLoader] = useState(false);

    const handleCopia = () => {
        navigator.clipboard.writeText(data);
        setCopiado(true);
        setEmTransformacao(true);

        setTimeout(() => {
            setEmTransformacao(false);
            serMostrarLoader(true);

            setTimeout(() => {
                serMostrarLoader(false);

                setTimeout(() => {
                    setCopiado(false);
                }, 500);
            }, 500);
        }, 300);
    };

    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement='end'
            backdrop='static'
            style={{ width: 'calc(100% - 385px)' }}
            className='absolute bg-cor-offwhite opacity-90 text-cor-marrom'>
            <Offcanvas.Header className='flex z-40 flex-row justify-between items-end bg-cor-offwhite shadow-md'>
                <div id="copy" className='border-2 p-2 rounded-md border-cor-marrom cursor-pointer hover:border-cor-laranja hover:text-cor-laranja transition-all ease-in-out' onClick={handleCopia}>
                    <Offcanvas.Title className='pr-2 flex items-center gap-1'>
                        <div>
                            {emTransformacao ? (
                                <Spinner animation="grow" size="sm" className='ml-[4px] spinner-cor' />
                            ) : copiado ? (
                                <>
                                    {mostrarLoader ? (
                                        <Spinner animation="grow" size="sm" className='ml-[4px] spinner-cor' />
                                    ) : (
                                        <ClipboardDocumentCheckIcon className='w-5 cursor-pointer' />
                                    )}
                                </>
                            ) : (
                                <ClipboardDocumentIcon className='w-5 cursor-pointer' />
                            )}
                        </div>
                        COPY TO CLIPBOARD
                    </Offcanvas.Title>
                </div>
                <ArrowRightEndOnRectangleIcon className='w-8 cursor-pointer hover:text-cor-laranja transition-all ease-in-out' onClick={onHide} />
            </Offcanvas.Header>
            <Offcanvas.Body className='bg-cor-offwhite text-cor-marrom p-3 text-md'>
                {data && (
                    <div>
                        {data.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
