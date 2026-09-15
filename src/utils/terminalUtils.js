import { parse } from 'shell-quote';
import { handleLsCommand } from './commands/ls';
import { handleCdCommand } from './commands/cd';
import { getFolderChildren } from './fileSystemUtils';
import { askAI } from './ai';
import removeMd from 'remove-markdown';


export const handleTerminalCommand = async (command, currentDirectory, setActiveFile, setCurrentDirectory, activeFile) => {
    // console.log("Terminal Command Received:", command);

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
            return handleLsCommand(command, currentDirectory);
        case 'cd':
            return handleCdCommand(command, currentDirectory, setCurrentDirectory);
            // setCurrentDirectory('Information');
            return;
        // console.log(`cd: forwarding command: ${args}`);
        // break;
        case 'ai': {
            const aiQuery = args.join(' ')
            if (!aiQuery) {
                return `ai: prompt expected. Usage: ai "What is your experience?"`
            }

            try {
                const answer = await askAI({
                    question: aiQuery.replace(/^["']|["']$/g, ''),
                    activeFile,
                    history: [],
                })
                return removeMd(answer)
            } catch (error) {
                return `Error: ${error.message}`
            }
        }

            console.log("Response AI...");
            break;
        case 'open':
            // const fileName = args[0];
            const fileName = args.join(' ');

            // const fileName = args;
            if (!fileName) {
                return `open: operand expected`;
                break;
            }

            const children = getFolderChildren(currentDirectory);
            const fileToOpen = children.find(child => child.name.toLowerCase() === fileName.toLowerCase());

            if (!fileToOpen)
                return `Error: File '${fileName}' not found.`;
            else if (fileToOpen.type === 'folder')
                return `Error: '${fileName}' is a directory. Use 'cd' instead.`;
            else {
                setActiveFile(fileToOpen.id);
            }


            // console.log(`Opening file: ${args}`);
            break;
        default:
            return `zsh: Command not found: ${command}`;
    }

};