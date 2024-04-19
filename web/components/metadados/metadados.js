import { Helmet } from 'react-helmet';

export function Metadados() {
    const title = "Poké Ipsum - Your design journey, one Pokémon at a time!";
    const description = "Explore design with a fun twist using Poké Ipsum for your placeholder text needs. Each paragraph is uniquely generated with names of Pokémon.";
    const imageUrl = "../../public/img/bg.png"

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content="https://yourwebsite.com" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default Metadados;
