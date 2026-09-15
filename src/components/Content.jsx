import Load from "./tempComponents/Load";
import Masters from "./content/Education/Masters";
import Bachelors from "./content/Education/Bachelors";
import AboutMe from "./content/Information/About";
import Skills from "./content/Information/Skills";
import AI_Data_Extraction from "./content/Projects/AI_Data_Extraction";
import OpenStream from "./content/Projects/OpenStream";
import PortfolioSite from "./content/Projects/PortfolioSite";
import Hidden from "./content/Hidden";
import BERTweetGuard from "./content/Projects/BERTweetGuard"

function Content({ showDirectory, showAI, showTerminal, activeFile }) {

    const renderMap = {
        'about': <AboutMe />,
        'skill': <Skills />,
        'masters': <Masters />,
        'bachelors': <Bachelors />,
        'AI_Data_Extraction': <AI_Data_Extraction />,
        'openstream': <OpenStream />,
        'portfolio_site': <PortfolioSite />,
        'secret': <Hidden />,
        'bertweet': <BERTweetGuard />
    };

    return (
        <>
            <style>{`
                @media (max-width: 1024px) {
                    .content {
                        left: 0rem !important;
                        right: 0rem !important;
                        bottom: var(--footer-height) !important; /* Sit above the taller phone footer */
                        padding-top: 3.5rem !important; /* Pulls content below the button */
                    }
                }
            `}</style>
            {/* content */}
            <div className='content' style={{ position: 'fixed', top: '0rem', left: showDirectory ? '22rem' : '4rem', right: showAI ? '24rem' : '0rem', bottom: showTerminal ? '17rem' : '2rem' }}>
                {/* <Load /> */}

                {renderMap[activeFile] || <div className="contentData"><h1>Null Refrence Exception</h1></div>}
            </div>
        </>
    )
}

export default Content;