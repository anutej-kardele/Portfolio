import { parse } from 'shell-quote';
import { handleLsCommand } from './commands/ls';
import { handleCdCommand } from './commands/cd';
import { getFolderChildren } from './fileSystemUtils';

import { getGeminiResponse } from './gemini';
import information from '../../information.json';
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
        case 'ai':

            const aiQuery = args.join(' ');

            if (!aiQuery) {
                return `ai: prompt expected. Usage: ai "What is your experience?"`;
            }

            // Strip quotes if the user typed ai "question" instead of ai question
            const cleanQuery = aiQuery.replace(/^["']|["']$/g, '');

            const textToSend = `You are Anutej Sachin Kardele, speaking directly to visitors on your portfolio website. Use ONLY the following JSON data to answer questions accurately and conversationally.\n
        IMPORTANT INSTRUCTIONS:
        - Respond in FIRST PERSON (use "I", "my", "me" instead of "Anutej", "he", "his")
        - Keep responses CONCISE (2-3 short paragraphs maximum)
        - Be conversational and friendly
        - Keep responses CONCISE and to-the-point (2-3 short paragraphs maximum)
        - Only provide longer responses when the question specifically requires detailed technical explanations \n
            
            JSON DATA: ${JSON.stringify(information, null, 2)}

            CONTEXT - Current Page: ${activeFile} \n
            
            USER QUESTION: ${cleanQuery}`;

            try {
                // Await the response from Gemini
                const textResponse = await getGeminiResponse(textToSend);
                const plainTextResponse = removeMd(textResponse);
                return plainTextResponse;
            } catch (error) {
                console.error("Terminal AI Error:", error);
                return `Error: Could not connect to AI.`;
            }

            console.log("Response AI...");
            break;
        case 'open':
            const fileName = args[0];
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