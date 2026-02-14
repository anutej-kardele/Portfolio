// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState } from 'react';

import {
    Layout,       // Icon for Red Panel
    Sidebar,      // Icon for Green Sidebar
    PanelBottom,  // Icon for Footer Panel toggle
    AppWindow,    // Icon for Blue Sidebar toggle
    Box           // Placeholder icon
} from 'lucide-react';

const AppCode = () => {
    // 1. State for visibility
    const [showGreen, setShowGreen] = useState(true);
    const [showRed, setShowRed] = useState(true);
    const [showBlue, setShowBlue] = useState(true);

    return (
        // ROOT CONTAINER: Flex Column (Stacks Main Body on top of Footer)
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            fontFamily: 'sans-serif'
        }}>

            {/* --- MIDDLE SECTION: Contains Black Bar + Workspace --- */}
            {/* flex: 1 ensures this takes up all height EXCEPT the footer */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* PART 1: THE BLACK BAR (Static, 5%) */}
                <nav style={{
                    width: '5%',
                    minWidth: '50px',
                    backgroundColor: '#1e1e1e', // VS Code Dark Gray
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '20px',
                    gap: '25px',
                    color: '#858585' // Inactive color
                }}>
                    {/* Toggle Green (Left Sidebar) */}
                    <div
                        onClick={() => setShowGreen(!showGreen)}
                        style={{ cursor: 'pointer', color: showGreen ? 'white' : '#858585' }}
                        title="Toggle Left Sidebar"
                    >
                        <Sidebar size={24} />
                    </div>

                    {/* Toggle Red (Bottom Panel) */}
                    <div
                        onClick={() => setShowRed(!showRed)}
                        style={{ cursor: 'pointer', color: showRed ? 'white' : '#858585' }}
                        title="Toggle Bottom Panel"
                    >
                        <Layout size={24} />
                    </div>

                    {/* Toggle Blue (Right Sidebar) */}
                    <div
                        onClick={() => setShowBlue(!showBlue)}
                        style={{ cursor: 'pointer', color: showBlue ? 'white' : '#858585' }}
                        title="Toggle Right Sidebar"
                    >
                        {/* Rotating icon to point right */}
                        <Sidebar size={24} style={{ transform: 'rotate(180deg)' }} />
                    </div>
                </nav>

                {/* --- WORKSPACE CONTAINER --- */}
                <div style={{ flex: 1, display: 'flex' }}>

                    {/* PART 2: THE GREEN BAR (Left Sidebar) */}
                    {showGreen && (
                        <aside style={{
                            width: '200px',
                            backgroundColor: '#4ade80', // Green
                            borderRight: '1px solid #ddd'
                        }}>
                            <div style={{ padding: '10px', fontWeight: 'bold' }}>Explorer</div>
                        </aside>
                    )}

                    {/* CENTER COLUMN WRAPPER (White Main + Red Panel) */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                        {/* PART 3: THE WHITE PART (Main Content) */}
                        <main style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            padding: '20px',
                            overflow: 'auto' // Allows scrolling if content is long
                        }}>
                            <h1>Main Workspace</h1>
                            <p>Toggle the panels using the icons in the sidebar or the footer.</p>
                        </main>

                        {/* PART 4: THE RED PART (Bottom Panel) */}
                        {showRed && (
                            <footer style={{
                                height: '150px',
                                backgroundColor: '#f87171', // Red
                                borderTop: '1px solid #ddd'
                            }}>
                                <div style={{ padding: '10px', fontWeight: 'bold', color: 'white' }}>Terminal / Output</div>
                            </footer>
                        )}
                    </div>

                    {/* PART 5: THE BLUE PART (Right Sidebar) */}
                    {showBlue && (
                        <aside style={{
                            width: '200px',
                            backgroundColor: '#60a5fa', // Blue
                            borderLeft: '1px solid #ddd'
                        }}>
                            <div style={{ padding: '10px', fontWeight: 'bold', color: 'white' }}>Properties</div>
                        </aside>
                    )}

                </div>
            </div>

            {/* --- NEW FOOTER (Status Bar) --- */}
            <footer style={{
                height: '22px',
                backgroundColor: '#007acc', // VS Code Blue
                display: 'flex',
                justifyContent: 'space-between', // Pushes left and right groups apart
                alignItems: 'center',
                padding: '0 10px',
                color: 'white',
                fontSize: '12px',
                userSelect: 'none'
            }}>

                {/* --- LEFT SIDE FOOTER BUTTONS --- */}
                <div style={{ display: 'flex', gap: '15px' }}>

                    {/* Toggle Red Part */}
                    <div
                        onClick={() => setShowRed(!showRed)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                        title="Toggle Panel"
                    >
                        <PanelBottom size={14} />
                        <span>Panel</span>
                    </div>

                    {/* Placeholder Button */}
                    <div style={{ cursor: 'pointer', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Box size={12} />
                        <span>Master*</span>
                    </div>
                </div>

                {/* --- RIGHT SIDE FOOTER BUTTONS --- */}
                <div style={{ display: 'flex', gap: '15px' }}>

                    {/* Placeholder Button */}
                    <div style={{ cursor: 'pointer', opacity: 0.8 }}>
                        <span>Ln 12, Col 4</span>
                    </div>

                    <div style={{ cursor: 'pointer', opacity: 0.8 }}>
                        <span>UTF-8</span>
                    </div>

                    {/* Toggle Blue Part */}
                    <div
                        onClick={() => setShowBlue(!showBlue)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                        title="Toggle Sidebar"
                    >
                        <AppWindow size={14} />
                        <span>Sidebar</span>
                    </div>

                </div>
            </footer>

        </div>
    );
};

export default AppCode;