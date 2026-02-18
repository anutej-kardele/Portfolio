import React, { useState } from 'react';
import { fileSystem } from '../utils/fileSystem.jsx';
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";

const FileNode = ({ node, setActiveFile, activeFile, depth = 0 }) => {

    const [isOpen, setIsOpen] = useState(node.isOpen || false);

    const paddingLeft = `${0.5 + (depth * 0.8)}rem`;

    if (node.type === 'hiddenFile') return null;

    if (node.type === 'folder') {
        return (
            <div>
                <div
                    className="directory-item folder"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ paddingLeft: paddingLeft }}
                >
                    <span style={{
                        marginRight: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--text-color)',
                        opacity: 0.8
                    }}>
                        {isOpen ? <VscChevronDown /> : <VscChevronRight />}
                    </span>
                    {/* Make the root folder uppercase for a "Project Root" feel */}
                    <span style={{
                        fontWeight: depth === 0 ? '800' : 'bold',
                        fontSize: '0.85rem',
                        letterSpacing: depth === 0 ? '0.5px' : 'normal'
                    }}>
                        {node.name}
                    </span>
                </div>

                {isOpen && (
                    <div>
                        {node.children.map(child => (
                            <FileNode
                                key={child.id}
                                node={child}
                                setActiveFile={setActiveFile}
                                activeFile={activeFile}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`directory-item file ${activeFile === node.id ? 'active' : ''}`}
            onClick={() => setActiveFile(node.id)}
            style={{ paddingLeft: paddingLeft }}>

            <span style={{ marginRight: '6px', display: 'flex', alignItems: 'center' }}>
                {node.icon}
            </span>
            <span>{node.name}</span>
        </div>
    );
}

function Directory({ showDirectory, activeFile, setActiveFile }) {
    return (
        <>
            {/* directory */}
            {showDirectory && (
                <aside
                    className='directory'
                    tabIndex={0}
                    style={{ outline: 'none' }}
                >
                    <div className="directoryInnerDiv" >
                        EXPLORER
                    </div>


                    <div className='file-tree' style={{ marginTop: '2.5rem' }}>
                        {fileSystem.map(node => (
                            <FileNode
                                key={node.id}
                                node={node}
                                setActiveFile={setActiveFile}
                                activeFile={activeFile}
                            />
                        ))}
                    </div>

                </aside>
            )}
        </>
    )
}

export default Directory;