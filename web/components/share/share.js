import { RiFacebookLine, RiLinkedinLine , RiRedditLine, RiTwitterXLine, RiTiktokLine , RiGithubLine } from "react-icons/ri";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';
import { SiWhatsapp } from "react-icons/si";

function openShareDialog(url, network) {
    let shareUrl = "";

    switch (network) {
        case 'github':
            shareUrl = `https://github.com/${url}`;
            break;
        case 'tiktok':
            shareUrl = `https://www.tiktok.com/@${url}`;
            break;
        case 'reddit':
            shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
}


export function Share({ url, title, media }) {
    return (
        <div className="flex gap-4 justify-center items-center">
            Share
            <FacebookShareButton url={url} quote={title} className='flex'>
                <span className="p-2 text-xl border-1 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                    <RiFacebookLine />
                </span>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title} className='flex'>
                <span className="p-2 text-xl border-1 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                    <RiTwitterXLine />
                </span>
            </TwitterShareButton>
            <WhatsappShareButton url={url} title={title} className='flex'>
                <span className="p-2 text-xl border-1 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                    <SiWhatsapp />
                </span>
            </WhatsappShareButton>
            <LinkedinShareButton url={url} title={title} className='flex'>
                <span className="p-2 text-xl border-1 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out">
                    <RiLinkedinLine />
                </span>
            </LinkedinShareButton>
            <span className="p-2 text-xl border-1 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out cursor-pointer" onClick={() => openShareDialog(url, 'github')}>
                <RiGithubLine />
            </span>
            <span className="p-2 text-xl border-1 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out cursor-pointer" onClick={() => openShareDialog(url, 'tiktok')}>
                <RiTiktokLine />
            </span>
            <span className="p-2 text-xl border-1 border-cor-marrom rounded-lg text-cor-marrom hover:text-cor-laranja hover:border-cor-laranja transition-all ease-in-out cursor-pointer" onClick={() => openShareDialog(url, 'reddit')}>
                <RiRedditLine />
            </span>
        </div>
    );
};
