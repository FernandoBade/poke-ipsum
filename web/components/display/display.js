import React, { useState } from 'react';
import { Offcanvas, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { ArrowRightEndOnRectangleIcon, ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { Share } from '../share/share';

export default function Display({ show, onHide, data }) {
    const [copiado, setCopiado] = useState(false);
    const [emTransformacao, setEmTransformacao] = useState(false);
    const [mostrarLoader, serMostrarLoader] = useState(false);
    const [mostrarToast, setMostrarToast] = useState(false);

    const handleCopia = () => {
        navigator.clipboard.writeText(data);
        setCopiado(true);
        setMostrarToast(true);
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
        <>
            <Offcanvas
                show={show}
                onHide={onHide}
                placement='end'
                backdrop='static'
                style={{ width: 'calc(100% - 385px)' }}
                className='absolute bg-cor-offwhite opacity-90 text-cor-marrom'>
                <Offcanvas.Header className='flex z-10 flex-row justify-between items-end bg-cor-offwhite shadow-md'>
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
                <Offcanvas.Body className='bg-cor-offwhite text-cor-marrom p-3 text-md mb-[60px]'>
                    {data ? (
                        <div>
                            {data.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="lg"
                            role="status"
                            aria-hidden="true"
                            className="text-cor-marrom"
                        />
                    </div>
                    )}
                    <div className='absolute w-full right-0 bottom-0 p-3 bg-cor-offwhite z-50 drop-shadow-3xl'>
                        <Share className="" />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Toast para confirmação */}
            <ToastContainer position="top-end" className="p-3">
                <Toast show={mostrarToast} onClose={() => setMostrarToast(false)} delay={1500} autohide style={{ width: '190px' }}>
                    <Toast.Body className='bg-cor-laranja rounded-md text-center text-cor-offwhite font-bold uppercase text-md'>
                        Copied to clipboard
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
