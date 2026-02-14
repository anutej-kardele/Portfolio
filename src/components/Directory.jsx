function Directory({ showDirectory }) {
    return (
        <>
            {/* directory */}
            {showDirectory && (
                <aside className='directory'>
                    <div style={{
                        position: 'absolute', left: '1rem', top: '1rem', fontSize: '0.8rem',
                        paddingBottom: '3px',
                        width: 'fit-content'
                    }}>
                        EXPLORER
                    </div>
                </aside>
            )}
        </>
    )
}

export default Directory;