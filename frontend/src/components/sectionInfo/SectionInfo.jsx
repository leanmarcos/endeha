import { useState } from 'react';
import './SectionInfo.css';

export default function SectionInfo() {
    return (
        <>
            <header className='sectionInfoHeader'>
                <h2>How it works</h2>
                <p>A quick look at the encryption, decryption, and hashing methods available in endeha.</p>
            </header>

            <main>
                <section className="info-section">
                    <header>
                        <div className="headerEncryptLeft">

                        </div>

                        <section className="headerEncryptRight">
                            <h4>Encryption</h4>
                            <p>Transform plaintext into ciphertext</p>
                        </section>

                        <main className='box'>
                            <section className="infoBox">
                                <h4>Caesar Cipher</h4>
                                <p>Shifts each letter by a fixed number of positions in the alphabet.</p>
                            </section>

                            <section className="infoBox">
                                <h4>Atbash Cipher</h4>
                                <p>Mirrors the alphabet — A becomes Z, B becomes Y, and so on.</p>
                            </section>

                            <section className="infoBox">
                                <h4>Vigénere Cipher</h4>
                                <p>Uses a keyword to apply multiple Caesar shifts across the text.</p>
                            </section>

                            <section className="infoBox">
                                <h4>Column Transposition</h4>
                                <p>Rearranges characters by writing them in rows and reading by columns.</p>
                            </section>
                        </main>
                    </header>

                </section>
                <section className="info-section">


                </section>
                <section className="info-section">


                </section>
            </main>
        </>
    )
}