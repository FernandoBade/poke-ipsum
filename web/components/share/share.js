import { RiFacebookLine, RiInstagramLine  } from "react-icons/ri";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, PinterestShareButton } from 'react-share';

export function Share({ url, title, media }) {
    return (
        <div className="flex gap-4 justify-center items-center">
            Share
            <FacebookShareButton url={url} quote={title} className='flex'>
                <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                <RiFacebookLine />
                </span>
            </FacebookShareButton>
            <TwitterShareButton url={url} className='flex'>
                <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                    <RiInstagramLine  />
                </span>
            </TwitterShareButton>
            <WhatsappShareButton url={url} className='flex'>
                <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                    <FaWhatsapp />
                </span>
            </WhatsappShareButton>
            <LinkedinShareButton url={url} className='flex'>
                <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                    <FaLinkedinIn />
                </span>
            </LinkedinShareButton>
            <PinterestShareButton url={url} className='flex'>
                <span className="p-2 text-xl border-2 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                    <FaPinterestP />
                </span>
            </PinterestShareButton>
        </div>
    );
};
