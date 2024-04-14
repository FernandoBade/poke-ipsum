import React, { useState } from 'react';
import { Offcanvas, Spinner } from 'react-bootstrap';
import { ArrowRightEndOnRectangleIcon, ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function Display({ show, onHide, children }) {
    const [copiado, setCopiado] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const handleCopia = () => {
        navigator.clipboard.writeText(children);
        setCopiado(true);
        setIsTransitioning(true);

        setTimeout(() => {
            setIsTransitioning(false);
            setShowSpinner(true);

            setTimeout(() => {
                setShowSpinner(false);

                setTimeout(() => {
                    setCopiado(false);
                }, 1000);
            }, 1000);
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
                            {isTransitioning ? (
                                <Spinner animation="grow" size="sm" className='ml-[4px] spinner-cor' />
                            ) : copiado ? (
                                <>
                                    {showSpinner ? (
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
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
