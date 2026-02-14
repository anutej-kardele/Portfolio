import { VscFiles, VscSparkle, VscTerminal } from "react-icons/vsc";
import { GrCircleInformation } from "react-icons/gr";


function Navigator({ showAI, setShowAI, showDirectory, setDirectory, showTerminal, setTerminal }) {

    return (
        <>
            <header className="header">

                <button disabled={true}
                    onClick={() => setDirectory(!showDirectory)}
                    className={`transparentButton status-item-header ${showDirectory ? 'active' : ''}`}>
                    {<VscFiles size='1.5rem' />}
                </button>

                <button onClick={() => setShowAI(!showAI)}
                    className={`transparentButton status-item-header ${showAI ? 'active' : ''}`}>
                    {<VscSparkle size='1.5rem' />}
                </button>

                <button disabled={true}
                    onClick={() => setTerminal(!showTerminal)}
                    className={`transparentButton status-item-header ${showTerminal ? 'active' : ''}`}>
                    {<VscTerminal size='1.5rem' />}
                </button>

                <button className="transparentButton status-item-header ">
                    {<GrCircleInformation size='1.5rem' />}
                </button>

            </header>
        </>
    )
}

export default Navigator;