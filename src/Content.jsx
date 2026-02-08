import Load from "./Load";

function Content({ showDirectory, showAI, showTerminal }) {
    return (
        <>
            {/* content */}
            <div className='content' style={{ position: 'fixed', top: '0rem', left: showDirectory ? '22rem' : '4rem', right: showAI ? '24rem' : '0rem', bottom: showTerminal ? '20rem' : '2rem' }}>
                <Load />
            </div>
        </>
    )
}

export default Content;