import { FacebookShareButton, WhatsappShareButton, WhatsappIcon, TwitterShareButton, LinkedinShareButton, PinterestShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, PinterestIcon } from 'react-share';

export function Share(url, title, media) {
    return (
        <div className="flex gap-4 justify-center items-center">
            Share
            <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <PinterestShareButton url={url} media={media} description={title}>
                <PinterestIcon size={32} round />
            </PinterestShareButton>
        </div>
    );
};
