import './header.css'
import { SwitchMode } from './header'

export default function Header() {
    return (
        <>
            <div className="headerTop">
                <div className="headerLeftTop">
                    <img src="/logo2.png" alt="logo" id="logo" />
                    <a href="">endeha</a>
                </div>

                <div className="headerRightTop">
                    <button id="mode" onClick={SwitchMode}><img src="/lightmode.png" alt="mode" id='mode-img'/></button>
                   {/* } <button>Sign in</button> */}
                </div>
            </div>
            <div className="headerBottom">
                <p>Endeha - Secure Text Tools</p>
            </div>
        </>
    )
}