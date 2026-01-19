import './mainHome.css'
import { connectAPI } from './main'
import { useState } from 'react'

export default function MainHero() {

    const [action, changeAction] = useState('encrypt');
    const [selected, changeSelect] = useState('cesar');
    const [messageUser, changeMessage] = useState('');
    const [keyUser, changeKey] = useState('');
    const [result, changeResult] = useState('');
    const [error, changeError] = useState('');

    const introMap = {
        encrypt: 'Choose a cipher and transform your text securely',
        decrypt: 'Discover a secret message',
        hash: 'Transform your text to a whole new thing'
    }

    const getIntro = () => introMap[action];


    const options = {
        encrypt: ['cesar', 'atbash', 'vignere', 'transposition'],
        decrypt: ['cesar'],
        hash: ['md5', 'sha256']
    };

    const currentMethods = options[action] || [];

    const submit = (e) => {
        e.preventDefault();
        connectAPI();
    }

     const copyResult = () => {
            try {
                navigator.clipboard.writeText(result);
                const copied = document.querySelector('.copied');
                copied.classList.remove('hidden-section');
            } catch (error) {
                console.log(error);
            }
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

            if (!response.ok) {
                console.log('error' + response.error)
                document.getElementById('result').textContent = data.error;
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            const success = data.success
            console.log("Respuesta del servidor:", data);

            // Aquí podés actualizar el resultado en el DOM
            changeResult(success || 'error')
        } catch (error) {
            document.getElementById('result').textContent = error;
        }
    };

   



    return (

        <>

            {/* Hero Presentation */}
            <div className="heroPresentation">
                <h2>Hello! What do you want to {action} today?</h2>
                <p>Please, choose between our services</p>
            </div>

            {/* Inside */}
            <section className="inside">
                <div className="select">
                    <button onClick={() => changeAction('encrypt')} className={action === 'encrypt' ? 'selected' : 'btn-sele'}>
                        Encrypt
                    </button>
                    <button onClick={() => changeAction('decrypt')} className={action === 'decrypt' ? 'selected' : 'btn-sele'}>
                        Decrypt
                    </button>
                    <button onClick={() => changeAction('hash')} className={action === 'hash' ? 'selected' : 'btn-sele'}>
                        Hash
                    </button>
                </div>

                {/* types */}
                <div className={'encrypt'}>
                    <div className="encrypt-presentation">
                        <h3>Let's {action}!</h3>
                        <p>{getIntro()}</p>
                        <a href="" id='user-help'>I don't know what it is</a>
                    </div>

                    <form className='encrypt-form' onSubmit={(e) => submit(e)}>
                        <label htmlFor="" className='form-field'>Text to encrypt <input type="text" id='message' onChange={(e) => changeMessage(e.target.value)} /></label>


                        <div className="encrypt-form-inside">
                            <label htmlFor="" className='form-field'>Select the type

                                <div className="options">
                                    {currentMethods.map(method => (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => changeSelect(method)}
                                            className={method === selected ? 'option-selected' : 'btn-option'}
                                        >
                                            {method}
                                        </button>
                                    ))}
                                </div>


                            </label>

                            <div className="amount">
                                <label htmlFor="" className={action === 'hash' || selected === 'atbash' ? 'hidden-section' : 'form-field'}>Encryption key <input type={selected === 'cesar' ? "number" : "text"} id='key' onChange={(e) => changeKey(e.target.value)} /></label>

                            </div>


                        </div>
                        <button type="submit" id='proccess' >{action.charAt(0).toUpperCase() + action.slice(1)} text</button>
                    </form>


                </div>




                <div className="result">
                    <div className="result-info">
                        <img src="/encrypt-result.png" alt="result-logo" id='lock-result' />
                        <p>Your encrypted result will appear here...</p>
                    </div>


                    <div className="result-show">
                        <p className={result === '' ? 'hidden-section' : 'result-done'}>✅ Done: {result}</p>
                        <button className={result !== '' ? 'copy' : 'hidden-section'} onClick={copyResult}><img src="/copy.png" alt="copy result" /></button>
                    </div>


                </div>

                <div className="copied hidden-section">
                    <p>✅ Copied!</p>
                </div>
            </section>











        </>
    )
}
