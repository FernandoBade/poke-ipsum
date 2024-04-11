import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';


export default function Display({ show, onHide, children }) {
    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement='end'
            backdrop='static'
            className='absolute right-0 bg-cor-offwhite text-cor-marrom p-2 max-w-[385px]'>
            <Offcanvas.Header className='flex flex-row-reverse justify-between items-end'>
                <Offcanvas.Title>Title Here</Offcanvas.Title>
                 {<ArrowRightEndOnRectangleIcon className='w-7 cursor-pointer' onClick={onHide} />}
            </Offcanvas.Header>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
