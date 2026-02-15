import { VscMarkdown, VscJson, VscCode } from "react-icons/vsc";
import ubLogo from '../assets/ub.png';
import vitLogo from '../assets/vit.png';

export const fileSystem = [
    {
        id: "info",
        name: "Information",
        type: "folder",
        isOpen: true, // Default open state
        children: [
            { id: "about", name: "About", type: "file", icon: <VscMarkdown color="#6997d5" /> },
            { id: "skill", name: "Skills", type: "file", icon: <VscJson color="#f1c40f" /> }
        ]
    },
    {
        id: "edu",
        name: "Education",
        type: "folder",
        children: [
            {
                id: "masters", name: "Masters", type: "file",
                icon: <img src={ubLogo} alt="UB" style={{ height: '0.9rem', width: 'auto' }} />
            },
            {
                id: "bachelors", name: "Bachelors", type: "file",
                icon: <img src={vitLogo} alt="VIT" style={{ height: '0.9rem', width: 'auto' }} />
            }
        ]
    },
    {
        id: "projects",
        name: "Projects",
        type: "folder",
        children: [
            { id: "portfolio", name: "Project1", type: "file", icon: <VscCode color="#f1c40f" /> }
        ]
    }
];