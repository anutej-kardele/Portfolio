import { VscFiles, VscSparkle, VscTerminal, VscThreeBars } from "react-icons/vsc";
import { GrCircleInformation } from "react-icons/gr";

function Navigator({ showAI, setShowAI, showDirectory, setDirectory, showTerminal, setTerminal }) {

    return (
        <>
            <style>{`
                /* Hide the mobile menu button on PC */
                .mobile-only-btn {
                    display: none !important;
                }

                @media (max-width: 1024px) {
                    .header {
                        position: fixed !important;
                        top: 0.5rem !important;
                        left: 0.5rem !important;
                        width: auto !important;
                        height: auto !important;
                        flex-direction: row !important;
                        background: transparent !important;
                        backdrop-filter: none !important;
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        z-index: 1000 !important;
                    }
                    
                    /* Show the mobile menu button on phones */
                    .header .status-item-header.mobile-only-btn {
                        display: flex !important;
                        width: 40px !important;
                        height: 40px !important;
                        padding: 0 !important;
                        align-items: center !important;
                        justify-content: center !important;
                        background: transparent !important;
                    }

                    /* Completely hide the PC buttons on phones */
                    .desktop-only-btn {
                        display: none !important;
                    }
                }
            `}</style>
            <header className="header">

                {/* ── MOBILE ONLY: Three Bars Menu ── */}
                <button
                    type="button"
                    onClick={() => setDirectory(!showDirectory)}
                    className={`transparentButton status-item-header mobile-only-btn ${showDirectory ? 'active' : ''}`}
                    title="Toggle Pages Directory">
                    <VscThreeBars size='1.5rem' />
                </button>


                {/* ── DESKTOP ONLY: Original Buttons ── */}

                <button disabled={false}
                    onClick={() => setDirectory(!showDirectory)}
                    className={`transparentButton status-item-header desktop-only-btn ${showDirectory ? 'active' : ''}`}>
                    {<VscFiles size='1.5rem' />}
                </button>

                <button onClick={() => setShowAI(!showAI)}
                    className={`transparentButton status-item-header desktop-only-btn ${showAI ? 'active' : ''}`}>
                    {<VscSparkle size='1.5rem' />}
                </button>

                <button disabled={false}
                    onClick={() => setTerminal(!showTerminal)}
                    className={`transparentButton status-item-header desktop-only-btn ${showTerminal ? 'active' : ''}`}>
                    {<VscTerminal size='1.5rem' />}
                </button>

                <button className="transparentButton status-item-header desktop-only-btn">
                    {<GrCircleInformation size='1.5rem' />}
                </button>

            </header>
        </>
    )
}

export default Navigator;