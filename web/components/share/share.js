import React, { useState } from 'react';
import { RiFacebookLine, RiLinkedinLine, RiTwitterXLine, RiLink } from "react-icons/ri";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';
import { SiWhatsapp } from "react-icons/si";

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        alert('Link copied to clipboard!'); // Você pode substituir isso por uma notificação mais sofisticada se desejar
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

export function Share({ url, title, media }) {
    const [showIcons, setShowIcons] = useState(false);

    const toggleIcons = () => setShowIcons(!showIcons);

    return (
        <div className="flex items-center justify-center gap-4">
            <button onClick={toggleIcons} className="border-2 border-cor-marrom text-cor-marrom px-4 py-2 rounded-md hover:border-cor-laranja hover:text-cor-laranja transition-all ease-in-out duration-500">
                Share
            </button>
            {showIcons && (
                <div className="flex gap-4 justify-center items-center transition-all ease-in-out duration-500">
                    {/* Outros botões de compartilhamento */}
                    <button onClick={() => copyToClipboard(url)} className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                        <RiLink />

                    </button>
                    <FacebookShareButton url={url} quote={title} className='flex'>
                        <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                            <RiFacebookLine />
                        </span>
                    </FacebookShareButton>
                    <TwitterShareButton url={url} title={title} className='flex'>
                        <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                            <RiTwitterXLine />
                        </span>
                    </TwitterShareButton>
                    <WhatsappShareButton url={url} title={title} className='flex'>
                        <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                            <SiWhatsapp />
                        </span>
                    </WhatsappShareButton>
                    <LinkedinShareButton url={url} title={title} className='flex'>
                        <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                            <RiLinkedinLine />
                        </span>
                    </LinkedinShareButton>
                </div>
            )}
        </div>
    );
}
