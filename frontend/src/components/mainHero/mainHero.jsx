import './mainHero.css';

export default function MainHero() {

    const goToTool = () => {
        document.getElementById('core')?.scrollIntoView({
            behavior: 'smooth'
        });
    };


    return (
        <>
            <img src="/heroLogo.png" alt="heroLogo" id='heroLogo' />
            <h2 className='heroMainTitle'>Encrypt. Decrypt. Hash.</h2>
            <p className='heroSubtitle'>Online tool for keeping your data safe. Faster, more private and no log in.</p>
            <div className="heroPills">
                <button className="pill"><img src="/encryptPill.png" alt="encrypt-logo" />Encrypt</button>
                <button className="pill"><img src="/decryptPill.png" alt="decrypt-logo" />Decrypt</button>
                <button className="pill"><img src="/hashPill.png" alt="hash-logo" />Hash</button>
            </div>
            <button id="heroCTA" onClick={goToTool}>Start</button>
        </>
    )
}