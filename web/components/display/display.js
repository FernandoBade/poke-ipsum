import React from 'react';
import { Offcanvas } from 'react-bootstrap';

export default function Display({ show, onHide, children }) {
    return (
        <Offcanvas show={show} onHide={onHide} className='absolute right-0 bg-cor-offwhite text-cor-marrom p-2 max-w-[385px]'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Title Here</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
