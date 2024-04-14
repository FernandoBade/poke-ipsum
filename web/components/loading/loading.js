import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className={`fixed inset-0 bg-cor-offwhite z-50 flex justify-center items-center
                        ${fadeOut ? 'opacity-0 transition-all duration-1000 ease-in-out' : 'opacity-100'}`}>
            <Spinner animation="grow" size="xl" className='text-cor-marrom' />
        </div>
    );
};

export default LoadingScreen;
