import { useTheme } from "../js/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { VscGithubInverted, VscTerminal, VscSparkle, VscSourceControl } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer({ showAI, setShowAI, showTerminal, setTerminal }) {

    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <style>{`
                @media (max-width: 1024px) {
                    .footer-mobile-hidden {
                        display: none !important;
                    }
                }
            `}</style>
            <footer className='footer' >

                <div style={{
                    display: 'flex', justifyContent: 'space-between', width: '100%', alignContent: 'center', height: '100%'
                }}>

                    {/* Left part  */}
                    <div onClick={() => window.open('https://github.com/anutej-kardele/Portfolio/tree/master', '_blank')}
                        style={{ cursor: 'pointer', display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.9rem', marginLeft: '1rem' }}
                        className='status-item'>
                        <VscSourceControl size={'1rem'} />
                        <span>master</span>
                    </div>

                    {/* Right part  */}
                    <div style={{ display: 'flex', marginRight: '1rem', gap: '0.5rem', alignItems: 'center' }}>

                        {/* GitHub Repo Button */}
                        <button onClick={() => window.open('https://github.com/anutej-kardele', '_blank')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            className='transparentButtonFooter status-item' >
                            {<VscGithubInverted size={'1rem'} />}
                        </button>

                        {/* LinkedIn Button */}
                        <button onClick={() => window.open('https://www.linkedin.com/in/anutej-kardele/', '_blank')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            className='transparentButtonFooter status-item' >
                            {<FaLinkedin size={'1rem'} />}
                        </button>

                        {/* LeetCode Button */}
                        <button onClick={() => window.open('https://leetcode.com/u/Anutej98/', '_blank')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            className='transparentButtonFooter status-item' >
                            {<SiLeetcode size={'1rem'} />}
                        </button>

                        {/* UTF-8 Text (Hidden on mobile) */}
                        <div className="footer-mobile-hidden" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                            <span>UTF-8</span>
                        </div>

                        {/* JavaScript JSX Text (Hidden on mobile) */}
                        <div className="footer-mobile-hidden" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                            <span>JavaScript JSX</span>
                        </div>

                        {/* Terminal Button (Hidden on mobile) */}
                        <button className="footer-mobile-hidden transparentButtonFooter status-item"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: showTerminal ? '1' : '0.6' }}
                            onClick={() => setTerminal(!showTerminal)}>
                            {<VscTerminal size={'1rem'} />}
                        </button>

                        {/* AI Button (Hidden on mobile) */}
                        <button className="footer-mobile-hidden transparentButtonFooter status-item"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: showAI ? '1' : '0.6' }}
                            onClick={() => setShowAI(!showAI)}>
                            {<VscSparkle size='1rem' />}
                        </button>

                        {/* Theme Toggle Button */}
                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            className='transparentButtonFooter status-item'
                            onClick={toggleTheme}>{theme === 'light' ? (<MdLightMode size={'0.9rem'} />) : (<MdDarkMode size={'0.9rem'} />)}</button>

                    </div>

                </div>

            </footer>

        </>
    )
}

export default Footer;