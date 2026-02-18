import { fileSystem } from './fileSystem';

export const getFolderChildren = (folderName, nodes = fileSystem) => {
    for (const node of nodes) {

        if (node.name === folderName && node.type === 'folder') {
            return node.children || [];
        }

        // // 3. If this node has children, search recursively inside them
        // if (node.children && node.children.length > 0) {
        //     const found = getFolderChildren(folderName, node.children);
        //     if (found) {
        //         return found; // If found deep down, return it up the chain
        //     }
        // }
    }

    return null;
};

// Helper to format the date like "Feb 14 22:01"
const formatLsDate = (isoString) => {
    if (!isoString) return "Jan 01 00:00";
    const date = new Date(isoString);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${dateStr} ${timeStr}`;
};

// Helper to generate the single line for ls -l
export const formatLongListing = (child) => {
    // 1. Permissions (d = directory, - = file)
    const isDir = child.type === 'folder';
    const perms = isDir ? 'dr-xr-xr-x' : '-r--r--r--';

    // 2. Hard Links (Arbitrary: 2 for folder, 1 for file)
    const links = isDir ? '2' : '1';

    // 3. User & Group
    const user = 'anutej';
    const group = 'staff';

    // 4. Size (Pad to 6 spaces for alignment)
    // If size is missing, default to 0KB
    const size = (child.size || '0KB').padEnd(6);

    // 5. Date
    const date = formatLsDate(child.created);

    // 6. Return the full formatted string
    return `${perms}  ${links} ${user}  ${group}  ${size} ${date}  ${child.name}`;
};