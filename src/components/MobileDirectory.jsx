import React, { useState } from 'react';
import { fileSystem } from '../utils/fileSystem.jsx';
import { VscChevronRight, VscChevronDown, VscClose } from "react-icons/vsc";

const MobileFileNode = ({ node, setActiveFile, activeFile, setDirectory, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(node.isOpen || false);
    const paddingLeft = `${1 + (depth * 1.2)}rem`; // Larger touch targets for mobile

    if (node.type === 'hiddenFile') return null;

    if (node.type === 'folder') {
        return (
            <div>
                <div
                    className="mobile-dir-item folder"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ paddingLeft: paddingLeft }}
                >
                    <span className="mobile-dir-icon">
                        {isOpen ? <VscChevronDown /> : <VscChevronRight />}
                    </span>
                    <span style={{
                        fontWeight: depth === 0 ? '700' : '600',
                        fontSize: '1rem',
                        letterSpacing: depth === 0 ? '0.5px' : 'normal',
                        color: depth === 0 ? '#ffffff' : '#cccccc'
                    }}>
                        {node.name}
                    </span>
                </div>

                {isOpen && (
                    <div>
                        {node.children.map(child => (
                            <MobileFileNode
                                key={child.id}
                                node={child}
                                setActiveFile={setActiveFile}
                                activeFile={activeFile}
                                setDirectory={setDirectory}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`mobile-dir-item file ${activeFile === node.id ? 'active' : ''}`}
            onClick={() => {
                setActiveFile(node.id);
                setDirectory(false); // Auto-close drawer on selection
            }}
            style={{ paddingLeft: paddingLeft }}
        >
            <span className="mobile-dir-icon">
                {node.icon}
            </span>
            <span style={{ fontSize: '0.95rem' }}>{node.name}</span>
        </div>
    );
}

function MobileDirectory({ showDirectory, setDirectory, activeFile, setActiveFile }) {
    return (
        <>
            <style>{`
                /* Hide this entire component on Desktop */
                @media (min-width: 1025px) {
                    .mobile-drawer-wrapper {
                        display: none !important;
                    }
                }

                .mobile-drawer-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    z-index: 1000;
                    opacity: ${showDirectory ? 1 : 0};
                    visibility: ${showDirectory ? 'visible' : 'hidden'};
                    transition: all 0.3s ease;
                }

                .mobile-drawer-panel {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 80vw;
                    max-width: 320px;
                    height: 100vh;
                    background-color: #252526; /* VS Code Dark+ Sidebar */
                    border-right: 1px solid #333333;
                    z-index: 1001;
                    transform: translateX(${showDirectory ? '0' : '-100%'});
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 4px 0 15px rgba(0,0,0,0.5);
                }

                .mobile-drawer-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.2rem 1rem;
                    color: #cccccc;
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                    border-bottom: 1px solid #333333;
                }

                .mobile-drawer-close-btn {
                    background: none;
                    border: none;
                    color: #cccccc;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                }

                .mobile-drawer-body {
                    flex: 1;
                    overflow-y: auto;
                    padding-top: 1rem;
                    padding-bottom: 2rem;
                }

                .mobile-dir-item {
                    display: flex;
                    align-items: center;
                    padding: 0.8rem 1rem;
                    color: #cccccc;
                    transition: background 0.2s;
                }
                
                .mobile-dir-item.active {
                    background-color: #37373d;
                    color: #ffffff;
                }

                .mobile-dir-icon {
                    margin-right: 10px;
                    display: flex;
                    align-items: center;
                    color: #cccccc;
                }
            `}</style>

            <div className="mobile-drawer-wrapper">
                {/* Backdrop overlay (clicks close the drawer) */}
                <div
                    className="mobile-drawer-backdrop"
                    onClick={() => setDirectory(false)}
                />

                {/* Sliding Side Panel */}
                <div className="mobile-drawer-panel">
                    <div className="mobile-drawer-header">
                        <span>EXPLORER</span>
                        <button className="mobile-drawer-close-btn" onClick={() => setDirectory(false)}>
                            <VscClose />
                        </button>
                    </div>

                    <div className="mobile-drawer-body">
                        {fileSystem.map(node => (
                            <MobileFileNode
                                key={node.id}
                                node={node}
                                setActiveFile={setActiveFile}
                                activeFile={activeFile}
                                setDirectory={setDirectory}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MobileDirectory;