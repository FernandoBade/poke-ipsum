import React, { useState } from 'react';
import { RiFacebookLine, RiLinkedinLine, RiTwitterXLine, RiLink } from "react-icons/ri";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';
import { SiWhatsapp } from "react-icons/si";
import { Toast, ToastContainer } from 'react-bootstrap';

const pokeIpsumURL = 'https://poke-ipsum.vercel.app';

export function Share({ title, media }) {
    const [showIcons, setShowIcons] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const toggleIcons = () => setShowIcons(!showIcons);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setShowToast(true);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4">
            <button onClick={toggleIcons} className="font-bold border-2 border-cor-marrom text-cor-marrom py-1 px-2 rounded-md hover:border-cor-laranja hover:text-cor-laranja transition-all ease-in-out duration-500">
                SHARE
            </button>
            {showIcons && (
                <div className="flex gap-4 justify-center items-center transition-all ease-in-out duration-500">
                    <button onClick={() => copyToClipboard(pokeIpsumURL)} className="p-2 text-sm border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                        <RiLink />
                    </button>
                    <FacebookShareButton url={pokeIpsumURL} quote={title} className='flex'>
                        <span className="p-2 text-sm border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                            <RiFacebookLine />
                        </span>
                    </FacebookShareButton>
                    <TwitterShareButton url={pokeIpsumURL} title={title} className='flex'>
                        <span className="p-2 text-sm border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                            <RiTwitterXLine />
                        </span>
                    </TwitterShareButton>
                    <WhatsappShareButton url={pokeIpsumURL} title={title} className='flex'>
                        <span className="p-2 text-sm border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                            <SiWhatsapp />
                        </span>
                    </WhatsappShareButton>
                    <LinkedinShareButton url={pokeIpsumURL} title={title} className='flex'>
                        <span className="p-2 text-sm border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                            <RiLinkedinLine />
                        </span>
                    </LinkedinShareButton>
                </div>
            )}
            {/* Toast de confirmação */}
            <ToastContainer position="middle-end" className="fixed top-0 right-0 p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={1500} autohide style={{ width: '190px' }}>
                    <Toast.Body className='bg-cor-laranja rounded-md text-center text-cor-offwhite font-bold uppercase text-md'>
                        Copied to clipboard
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}
