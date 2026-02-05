import { useTheme } from "./useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Box } from 'lucide-react';
import { VscGithubInverted, VscTerminal } from "react-icons/vsc";

function Footer() {

    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <footer className='footer' >

                <div style={{
                    display: 'flex', justifyContent: 'space-between', width: '100%', alignContent: 'center'
                }}>

                    <div style={{ cursor: 'pointer', opacity: 0.6, display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.9rem', marginLeft: '1rem' }}>
                        <Box size={'1rem'} />
                        <span>Master</span>
                    </div>

                    <div style={{ display: 'flex', marginRight: '1rem', gap: '0.5rem', alignItems: 'center' }}>  {/* Right part  */}

                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='transparentButton' >{<VscTerminal size={'1rem'} />}</button>
                        <button onClick={() => window.open('https://github.com/anutej-kardele', '_blank')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='transparentButton' >{<VscGithubInverted size={'1rem'} />}</button>

                        <div style={{ cursor: 'pointer', opacity: 0.6, display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                            <span>UTF-8</span>
                        </div>

                        <div style={{ cursor: 'pointer', opacity: 0.6, display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                            <span>JavaScript JSX</span>
                        </div>

                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='transparentButton' onClick={toggleTheme}>{theme === 'light' ? (<MdLightMode size={'0.9rem'} />) : (<MdDarkMode size={'0.9rem'} />)}</button>

                    </div>

                </div>

            </footer>

        </>
    )
}

export default Footer;