import { parse } from 'shell-quote';
import { getFolderChildren, formatLongListing } from '../fileSystemUtils';

export const handleLsCommand = (command, currentDirectory) => {

    const entries = parse(command);
    const cmd = entries[0];

    // console.log("Parsed Output ls:", entries);
    // if (entries.length === 0) return;
    // const args = entries.slice(1);

    let output = "";

    const children = getFolderChildren(currentDirectory);

    const visibleChildren = children.filter(child => child.type !== 'hiddenFile');
    // const hiddenChildren = children.filter(child => child.type === 'hiddenFile');

    switch (cmd) {
        case '-l':
            if (!visibleChildren)
                output = `Error: Directory '${currentDirectory}' not found.`;
            else
                output = visibleChildren.toSorted((a, b) => a.name.localeCompare(b.name)).map(formatLongListing).join('\n');

            console.log("debug files in detail...");
            break;
            // console.log(`debug files in detail...`);
            break;

        case '-a':
            if (!children)
                output = `Error: Directory '${currentDirectory}' not found.`;
            else
                output = children.toSorted((a, b) => a.name.localeCompare(b.name)).map(child => child.name).join('   ');

            // console.log(`debug hidden files...`);
            break;

        case '-t':
            if (!visibleChildren)
                output = `Error: Directory '${currentDirectory}' not found.`;
            else
                output = visibleChildren.toSorted((a, b) => new Date(b.created) - new Date(a.created)).map(child => child.name).join('   ');

            // console.log("debug sort by time...");
            break;

        case '-r':
            if (!visibleChildren)
                output = `Error: Directory '${currentDirectory}' not found.`;
            else
                output = visibleChildren.toSorted((a, b) => b.name.localeCompare(a.name)).map(child => child.name).join('   ');

            // console.log("debug reverse order...");
            break;

        case '-s':
            if (!visibleChildren)
                output = `Error: Directory '${currentDirectory}' not found.`;
            else
                output = visibleChildren.toSorted((a, b) => a.name.localeCompare(b.name))
                    .map(child => { const sizeNum = parseFloat(child.size); return `${sizeNum.toString().padEnd(2)} ${child.name}`; }).join('   ');

            // console.log("debug with file sizes...");
            break;

        case '-S':
            if (!visibleChildren)
                output = `Error: Directory '${currentDirectory}' not found.`;
            else
                output = visibleChildren.toSorted((a, b) => parseFloat(b.size) - parseFloat(a.size)).map(child => child.name).join('   ');

            // console.log("debug sort by size...");
            break;

        default:
            if (!visibleChildren)
                output = `Error: Directory '${currentDirectory}' not found.`;
            else
                output = visibleChildren.toSorted((a, b) => a.name.localeCompare(b.name)).map(child => child.name).join('   ');

        // console.log(`debug files...`);
    }

    console.log(output);

};