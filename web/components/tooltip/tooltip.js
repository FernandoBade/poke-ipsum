import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function PopoverReactBootstrap({ titulo, subtitulo, children }) {
    const popoverStyle = {
        backgroundColor: 'rgba(205, 128, 33, 0.95)',
        marginLeft: '4px',
        boxShadow: '#2b36407a 2px 2px 8px 1px',
        border: 'none',
        zIndex: 10000
    };

    const popover = (
        <Popover style={popoverStyle} id="popover-basic">
            <Popover.Header as="h3">{titulo}</Popover.Header>
            <Popover.Body style={{ color: '#FFFDE3', fontSize: '0.875rem' }}>{subtitulo}</Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger id='overlay-basic' trigger={['hover', 'focus']} placement="right" overlay={popover}>
            {children}
        </OverlayTrigger>
    );

}

export default PopoverReactBootstrap;
