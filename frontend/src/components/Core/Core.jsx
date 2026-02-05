import './core.css'
import { useState } from 'react'


export default function Core() {

    const [action, changeAction] = useState('encrypt');
    const [selected, changeSelect] = useState('cesar');
    const [messageUser, changeMessage] = useState('');
    const [keyUser, changeKey] = useState('');
    const [result, changeResult] = useState('');
    const [error, changeError] = useState('');
    const [errorField, changeErrorField] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const introMap = {
        encrypt: 'Choose a cipher and transform your text securely',
        decrypt: 'Discover a secret message',
        hash: 'Transform your text to a whole new thing'
    }

    const getIntro = () => introMap[action];


    const options = {
        encrypt: ['caesar', 'atbash', 'vignere', 'transposition'],
        decrypt: ['caesar'],
        hash: ['md5', 'sha256']
    };

    const changeAct = (newAction) => {
        changeAction(newAction);
        changeResult('');
        setIsCopied(false);
        document.getElementById('description').innerHTML = '';

    }

    const description = {
        cesar: action === 'encrypt' ? 'Shift each letter of the original text a fixed number of positions in the alphabet' : 'Reverse the shift to recover the original message',
        atbash: 'It reverses the alphabetm, no need for a key.',
        vignere: 'Use a keyword to shift each letter variably. Safer than Caesar',
        transposition: 'Arrange the letters of the message according to a numerical pattern (columns)',
        md5: 'It generates a 128-bit digital fingerprint from the text. Very fast, but no longer considered secure for cryptography.',
        sha256: 'It produces a 256-bit fingerprint. Much more secure than MD5, used in blockchain and digital signatures.'
    };

    const showDescription = (action) => {
        const descriptionField = document.getElementById('description');
        descriptionField.classList.remove('hidden');

        descriptionField.innerHTML = `Method description: ${description[action]}`;
    }

    const currentMethods = options[action] || [];

    const submit = (e) => {
        e.preventDefault();
        connectAPI();
    }


    const copyResult = () => {
        setIsCopied(true);
        try {
            navigator.clipboard.writeText(result);
            const copied = document.getElementById('copy-btn');
            const copyLogo = document.getElementById('copy-result');


            setTimeout(() => {
                copied.innerHTML = 'COPIED';
                copyLogo.src = '/copied.svg';

            }, 500)
        } catch (error) {
            console.log(error);
        }
    }

    const changingInput = (tempText) => {
        changeMessage(`${tempText}`);
        changeError('');
        changeErrorField('');

    }

    const connectAPI = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/${action}/${selected}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: messageUser,
                    key: keyUser
                })
            });

            const data = await response.json();
            if (!response.ok) {
                console.log('error data:', data);
                changeError(data.message);
                changeErrorField(data.field);
                changeMessage('');


                throw new Error(data);
            }


            const success = data.success
            console.log("Respuesta del servidor:", data);

            changeError('');
            changeErrorField('');
            setIsLoading(true);
            changeResult('');

            setTimeout(() => {
                setIsLoading(false);
                changeResult(success || 'error');
            }, 2600);

        } catch (error) {
            console.log(error);
        }
    };


    return (

        <>
            <div className="corePresentation">
                <h2 className='coreTitle'>Secure your text</h2>
                <p className='coreSubtitle'>Please, choose between our services</p>
            </div>

            {/* Inside */}
            <section className="coreBox">
                <div className="coreServiceOptions">
                    <button onClick={() => changeAct('encrypt')} className={action === 'encrypt' ? 'btnServiceSelected' : 'btnService'}>
                        Encrypt
                    </button>
                    <button onClick={() => changeAct('decrypt')} className={action === 'decrypt' ? 'btnServiceSelected' : 'btnService'}>
                        Decrypt
                    </button>
                    <button onClick={() => changeAct('hash')} className={action === 'hash' ? 'btnServiceSelected' : 'btnService'}>
                        Hash
                    </button>
                </div>

                {/* types */}
                <div className={'coreBoxInside'}>

                    <div className="coreBoxInsideIntroduction">

                        <h4 className='introTitle'>Let's {action}</h4>
                        <p className='introSubtitle'>{getIntro()}</p>
                    </div>


                    <form className='coreBoxForm' onSubmit={(e) => submit(e)}>
                        <div className='message'>
                            <label htmlFor="" className='coreFormField'>Text to encrypt <input type="text" id='message' className={errorField === 'message' ? 'error-form' : ''} onChange={(e) => changingInput(e.target.value)} /></label>
                            <p className={errorField === 'message' ? 'error' : 'hidden'} id='error'>{error}</p>

                        </div>


                        <div className={action === 'hash' || selected === 'atbash' ? 'noKey' : "coreAdditional"}>

                            <div className="amount">
                                <label htmlFor="" className={action === 'hash' || selected === 'atbash' ? 'hidden' : 'coreFormField'}>Encryption key <input className={errorField === 'key' ? 'error-form' : ''} type={selected === 'cesar' ? "number" : "text"} id='key' onChange={(e) => changeKey(e.target.value)}  /></label>
                                <p className={errorField === 'key' ? 'error' : 'hidden'}>{error}</p>
                            </div>


                            <label htmlFor="" className='coreFormField'>Select the type

                                <div className="coreTypeOptions">
                                    {currentMethods.map(method => (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => changeSelect(method)}
                                            className={method === selected ? 'btnCoreTypeSelected' : 'btnCoreType'}
                                            onMouseEnter={() => showDescription(method)}
                                        >
                                            {method}
                                        </button>
                                    ))}


                                </div>


                            </label>




                        </div>

                        <div className="desc">
                            <p id='description'></p>
                        </div>
                        <footer>
                            <button type="submit" id='coreCTA' ><img src="/coreCTA.png" alt="" />Proccess</button>
                        </footer>
                    </form>


                </div>




                <div className="result">
                    <div className='result-inside'>
                        <div className="result-info">
                            <img src="/encrypt-result.png" alt="result-logo" id='lock-result' />
                            <p>Output</p>
                        </div>
                        <div>
                            <button id='copy-btn' className={result !== '' ? 'copy' : 'hidden'} onClick={() => copyResult()} ><img src={!isCopied ? "/copy.png" : "/copied.png"} alt="copy result" id='copy-result' />{!isCopied ? "Copy" : "Copied"}</button>
                        </div>
                    </div>


                    <div className="result-show">
                        {isLoading && <div className="skeleton" />}

                        {!isLoading && result && (
                            <p className="result-appear">{result}</p>
                        )}
                    </div>



                </div>


            </section>


        </>
    )
}
