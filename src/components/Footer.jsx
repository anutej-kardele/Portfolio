import { useTheme } from "../js/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { VscGithubInverted, VscTerminal, VscSparkle, VscSourceControl } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer({ showAI, setShowAI, showTerminal, setTerminal }) {

    const { theme, toggleTheme } = useTheme();

    return (
        <footer className='footer'>

            <div className='footer-inner'>

                {/* Left part  */}
                <div onClick={() => window.open('https://github.com/anutej-kardele/Portfolio/tree/master', '_blank')}
                    className='status-item footer-branch'>
                    <VscSourceControl size={'1rem'} />
                    <span>master</span>
                </div>

                {/* Right part  */}
                <div className='footer-actions'>

                    {/* GitHub Repo Button */}
                    <button onClick={() => window.open('https://github.com/anutej-kardele', '_blank')}
                        className='transparentButtonFooter status-item'
                        aria-label='GitHub profile'>
                        <VscGithubInverted size={'1rem'} />
                    </button>

                    {/* LinkedIn Button */}
                    <button onClick={() => window.open('https://www.linkedin.com/in/anutej-kardele/', '_blank')}
                        className='transparentButtonFooter status-item'
                        aria-label='LinkedIn profile'>
                        <FaLinkedin size={'1rem'} />
                    </button>

                    {/* LeetCode Button */}
                    <button onClick={() => window.open('https://leetcode.com/u/Anutej98/', '_blank')}
                        className='transparentButtonFooter status-item'
                        aria-label='LeetCode profile'>
                        <SiLeetcode size={'1rem'} />
                    </button>

                    {/* UTF-8 Text (Hidden on mobile) */}
                    <div className="footer-mobile-hidden footer-label">
                        <span>UTF-8</span>
                    </div>

                    {/* JavaScript JSX Text (Hidden on mobile) */}
                    <div className="footer-mobile-hidden footer-label">
                        <span>JavaScript JSX</span>
                    </div>

                    {/* Terminal Button (Hidden on mobile) */}
                    <button className="footer-mobile-hidden transparentButtonFooter status-item"
                        style={{ opacity: showTerminal ? '1' : '0.6' }}
                        onClick={() => setTerminal(!showTerminal)}
                        aria-label='Toggle terminal'>
                        <VscTerminal size={'1rem'} />
                    </button>

                    {/* AI Button (Hidden on mobile) */}
                    <button className="footer-mobile-hidden transparentButtonFooter status-item"
                        style={{ opacity: showAI ? '1' : '0.6' }}
                        onClick={() => setShowAI(!showAI)}
                        aria-label='Toggle AI chat'>
                        <VscSparkle size='1rem' />
                    </button>

                    {/* Theme Toggle Button */}
                    <button className='transparentButtonFooter status-item'
                        onClick={toggleTheme}
                        aria-label='Toggle theme'>
                        {theme === 'light' ? (<MdLightMode size={'0.9rem'} />) : (<MdDarkMode size={'0.9rem'} />)}
                    </button>

                </div>

            </div>

        </footer>
    )
}

export default Footer;