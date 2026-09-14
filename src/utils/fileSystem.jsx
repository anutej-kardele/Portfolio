import { VscMarkdown, VscJson, VscCode, VscFolder, VscFolderOpened } from "react-icons/vsc";
import ubLogo from '../assets/ub.png';
import vitLogo from '../assets/vit.png';

export const fileSystem = [
    {
        id: "root",
        name: "Anutej",
        type: "folder",
        size: "0KB",
        created: "2025-02-14T21:58:00Z",
        isOpen: true,
        children: [
            {
                id: "Information",
                name: "Information",
                type: "folder",
                size: "0KB",
                created: "2025-02-14T22:01:00Z",
                children: [
                    { id: "about", name: "About", type: "file", size: "7KB", created: "2025-02-14T22:18:00Z", icon: <VscMarkdown color="#6997d5" /> },
                    { id: "skill", name: "Skills", type: "file", size: "3KB", created: "2025-02-15T03:54:00Z", icon: <VscJson color="#f1c40f" /> }
                ]
            },
            {
                id: "Education",
                name: "Education",
                type: "folder",
                size: "0KB",
                created: "2025-02-14T21:58:00Z",
                children: [
                    {
                        id: "masters", name: "Masters", type: "file", size: "8KB", created: "2025-02-14T21:58:00Z",
                        icon: <img src={ubLogo} alt="UB" style={{ height: '0.9rem', width: 'auto' }} />
                    },
                    {
                        id: "bachelors", name: "Bachelors", type: "file", size: "7KB", created: "2025-02-14T21:58:00Z",
                        icon: <img src={vitLogo} alt="VIT" style={{ height: '0.9rem', width: 'auto' }} />
                    }
                ]
            },
            {
                id: "projects",
                name: "Projects",
                type: "folder",
                size: "0KB",
                created: "2025-02-17T17:41:00Z",
                children: [
                    { id: "AI_Data_Extraction", name: "AI Data Extraction", type: "file", size: "1KB", created: "2025-02-17T17:51:00Z", icon: <VscCode color="#f1c40f" /> },
                    { id: "openstream", name: "OpenStream", type: "file", size: "1KB", created: "2026-09-14T12:00:00Z", icon: <VscCode color="#61dafb" /> },
                    { id: "portfolio_site", name: "VS Code Portfolio", type: "file", size: "2KB", created: "2026-02-20T10:00:00Z", icon: <VscCode color="#3b82f6" /> }
                ]
            },
            {
                id: "secret",
                name: "Hidden",
                type: "hiddenFile", // Custom type for your logic
                size: "2KB",
                created: "2025-02-17T18:35:00Z",
                icon: <VscCode color="#61dafb" /> // React Blue
            }
        ]
    }
];

