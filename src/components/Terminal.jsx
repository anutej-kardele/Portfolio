import { VscChromeClose } from "react-icons/vsc";

function Terminal({ showTerminal, setTerminal, showDirectory, showAI }) {
    return (
        <>
            {showTerminal && (
                <aside className='terminal' style={{ left: showDirectory ? '22rem' : '4rem', right: showAI ? '24rem' : '0rem' }}>
                    <div>
                        <div style={{
                            position: 'absolute', left: '1rem', top: '1rem', fontSize: '0.9rem',
                            borderBottom: '2px solid var(--accent-blue)',
                            paddingBottom: '3px',
                            width: 'fit-content'
                        }}>
                            TERMINAL
                        </div>

                        <button onClick={() => setTerminal(false)} className="transparentButton" style={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                            <VscChromeClose size={'1rem'} />
                        </button>
                    </div>
                </aside>
            )}
        </>
    )
}

export default Terminal;