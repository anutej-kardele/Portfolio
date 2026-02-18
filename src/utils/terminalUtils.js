import { parse } from 'shell-quote';
import { handleLsCommand } from './commands/ls';
import { getFolderChildren } from './fileSystemUtils';

export const handleTerminalCommand = (command, currentDirectory, setActiveFile) => {
    console.log("Terminal Command Received:", command);

    const entries = parse(command);
    // console.log("Parsed Output:", entries);

    if (entries.length === 0) return;

    const cmd = entries[0];
    const args = entries.slice(1);

    // console.log("Command:", cmd);
    // console.log("Args:", args);

    switch (cmd) {
        case 'ls':
            // console.log(`ls: forwarding command: ${args}`);
            handleLsCommand(args, currentDirectory);
            break;
        case 'cd':
            console.log(`cd: forwarding command: ${args}`);
            break;
        case 'clear':
            console.log("Clearing...");
            break;
        case 'ai':
            console.log("Toggling AI...");
            break;
        case 'open':
            const fileName = args[0];
            if (!fileName) {
                console.log("usage: open <filename>");
                break;
            }

            const children = getFolderChildren(currentDirectory);
            const fileToOpen = children.find(child => child.name.toLowerCase() === fileName.toLowerCase());

            if (!fileToOpen)
                console.log(`Error: File '${fileName}' not found.`);
            else if (fileToOpen.type === 'folder')
                console.log(`Error: '${fileName}' is a directory. Use 'cd' instead.`);
            else
                setActiveFile(fileToOpen.id);

            // console.log(`Opening file: ${args}`);
            break;
        default:
            console.error(`zsh: Command not found: ${command}`);
    }

};