import '../styles/global.css';

function App({ Component, pageProps }) {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&display=swap" rel="stylesheet" />
            <Component {...pageProps} />;
        </>
    )
}

export default App;
