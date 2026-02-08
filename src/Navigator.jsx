import { VscFiles, VscSparkle, VscTerminal } from "react-icons/vsc";
import { GrCircleInformation } from "react-icons/gr";


function Navigator({ showAI, setShowAI, showDirectory, setDirectory, showTerminal, setTerminal }) {

    return (
        <>
            <header className="header">

                <button style={{ opacity: showDirectory ? '1' : '0.6' }} onClick={() => setDirectory(!showDirectory)} className="transparentButton">
                    {<VscFiles size='1.5rem' />}
                </button>

                <button style={{ opacity: showAI ? '1' : '0.6' }} onClick={() => setShowAI(!showAI)} className="transparentButton">
                    {<VscSparkle size='1.5rem' />}
                </button>

                <button style={{ opacity: showTerminal ? '1' : '0.6' }} onClick={() => setTerminal(!showTerminal)} className="transparentButton">
                    {<VscTerminal size='1.5rem' />}
                </button>

                <button className="transparentButton">
                    {<GrCircleInformation size='1.5rem' />}
                </button>

            </header>
        </>
    )
}

export default Navigator;