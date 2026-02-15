import Load from "./tempComponents/Load";
import Masters from "./content/Education/Masters";
import Bachelors from "./content/Education/Bachelors";
import AboutMe from "./content/Information/About";
import Skills from "./content/Information/Skills";

function Content({ showDirectory, showAI, showTerminal, activeFile }) {

    const renderMap = {
        'about': <AboutMe />,
        'skill': <Skills />,
        'masters': <Masters />,
        'bachelors': <Bachelors />
    };

    return (
        <>
            {/* content */}
            <div className='content' style={{ position: 'fixed', top: '0rem', left: showDirectory ? '22rem' : '4rem', right: showAI ? '24rem' : '0rem', bottom: showTerminal ? '17rem' : '2rem' }}>
                {/* <Load /> */}

                {renderMap[activeFile] || <div className="contentData"><h1>Null Refrence Exception</h1></div>}
            </div>
        </>
    )
}

export default Content;