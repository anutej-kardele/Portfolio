import { fileSystem } from './fileSystem';

export const getFolderChildren = (currentDirectory, nodes = fileSystem) => {

    if (!currentDirectory) return [];

    // 2. If the current directory has a 'children' array, return it.
    // Otherwise return an empty array to prevent .filter() from crashing.
    return Array.isArray(currentDirectory.children) ? currentDirectory.children : [];
};

// export const getFolderChildren = (node) => {
//     // If it's a folder and has children, return them. 
//     // Otherwise, return an empty array so .filter() doesn't crash.
//     return (node && node.type === 'folder' && node.children) ? node.children : [];
// };

// Helper to format the date like "Feb 14 22:01"
const formatLsDate = (isoString) => {
    const date = new Date(isoString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, ' ');
    const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return `${month} ${day} ${time}`; // Always "MMM DD HH:mm"
};

// Helper to generate the single line for ls -l
export const formatLongListing = (child) => {
    const isDir = child.type === 'folder';
    const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';

    // Fixed widths for every column
    const links = (isDir ? '2' : '1').padEnd(3);
    const user = 'anutej'.padEnd(8);
    const group = 'staff'.padEnd(8);
    const size = (child.size || '0KB').padEnd(8);
    const date = formatLsDate(child.created).padEnd(14);

    return `${perms} ${links} ${user} ${group} ${size} ${date} ${child.name}`;
};