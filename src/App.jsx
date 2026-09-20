import './App.css'
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Navigator from './components/Navigator';
import Prompter from './components/Prompter';
import Directory from './components/Directory';
import MobileDirectory from './components/MobileDirectory';
import MobilePrompter from './components/MobilePrompter';
import Terminal from './components/Terminal';
import Content from "./components/Content";
import { fileSystem } from './utils/fileSystem';
import { getHealth } from './utils/api'

function App() {

  const [showAI, setShowAI] = useState(false);
  const [showDirectory, setDirectory] = useState(true);
  const [showTerminal, setTerminal] = useState(false);
  const [activeFile, setActiveFile] = useState('about');
  const [currentDirectory, setCurrentDirectory] = useState(fileSystem[0]);

  useEffect(() => {
    // Wake up the primary AI backend
    getHealth().catch(() => { });

    // Wake up the BERTweet Guard Cloud Run service from scale-to-zero
    fetch("https://bertweet-guard-api-544105507963.us-east4.run.app/health")
      .catch(() => { });
  }, [])

  return (
    <>
      <Content showDirectory={showDirectory} showAI={showAI} showTerminal={showTerminal} activeFile={activeFile} />

      <Terminal showTerminal={showTerminal} setTerminal={setTerminal} showDirectory={showDirectory} showAI={showAI} currentDirectory={currentDirectory} setActiveFile={setActiveFile} setCurrentDirectory={setCurrentDirectory} activeFile={activeFile} />

      <Prompter showAI={showAI} setShowAI={setShowAI} activeFile={activeFile} />

      <MobilePrompter activeFile={activeFile} />

      {/* Desktop Sidebar Directory */}
      <Directory showDirectory={showDirectory} activeFile={activeFile} setActiveFile={setActiveFile} />

      {/* Mobile Slide-Out Drawer Directory */}
      <MobileDirectory showDirectory={showDirectory} setDirectory={setDirectory} activeFile={activeFile} setActiveFile={setActiveFile} />

      <Navigator showAI={showAI} setShowAI={setShowAI} showDirectory={showDirectory} setDirectory={setDirectory} showTerminal={showTerminal} setTerminal={setTerminal} />

      <Footer showAI={showAI} setShowAI={setShowAI} showTerminal={showTerminal} setTerminal={setTerminal} />
    </>
  )
}

export default App