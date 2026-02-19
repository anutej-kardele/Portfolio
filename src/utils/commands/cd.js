import { parse } from 'shell-quote';
import { fileSystem } from '../fileSystem.jsx';
import { getFolderChildren } from '../fileSystemUtils';

// Helper to find the parent of a node recursively
const findParentNode = (root, targetId) => {
    if (!root.children) return null;
    for (const child of root.children) {
        if (child.id === targetId) return root;
        if (child.type === 'folder') {
            const found = findParentNode(child, targetId);
            if (found) return found;
        }
    }
    return null;
};

export const handleCdCommand = (command, currentDirectory, setCurrentDirectory) => {
    const entries = parse(command);
    const args = entries.slice(1);
    const target = args[0];

    // 1. Home Directory: 'cd' or 'cd ~'
    if (!target || target === '~') {
        setCurrentDirectory(fileSystem[0]);
        return "";
    }

    // 2. Stay Current: 'cd .'
    if (target === '.') return "";

    // 3. Move Up: 'cd ..'
    if (target === '..') {
        const parent = findParentNode(fileSystem[0], currentDirectory.id);
        if (parent) {
            setCurrentDirectory(parent);
        }
        return "";
    }

    // 4. Move Down: 'cd folderName'
    const children = getFolderChildren(currentDirectory);
    const folder = children.find(c =>
        c.name.toLowerCase() === target.toLowerCase() && c.type === 'folder'
    );

    if (!folder) {
        // Use the authentic ZSH error format
        return `zsh: cd: no such file or directory: ${target}`;
    }

    setCurrentDirectory(folder);
    return "";
};