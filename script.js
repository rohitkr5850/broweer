const fileIcons = {
    txt: 'icons/txt.png',
    pdf: 'icons/pdf.png',
    mp3: 'icons/mp3.png',
    exe: 'icons/exe.png',
    rar: 'icons/rar.png'
};

let files = [
    { id: 1, name: 'Document 1.txt' },
    { id: 2, name: 'Presenter 1.pdf' },
    { id: 3, name: 'Song 1.mp3' },
    { id: 4, name: 'Installer 1.exe' },
    { id: 5, name: 'Archive 1.rar' },
   { id: 1, name: 'Document 1.txt' },
    { id: 2, name: 'Presenter 1.pdf' },
    { id: 3, name: 'Song 1.mp3' },
    { id: 4, name: 'Installer 1.exe' },
    { id: 5, name: 'Archive 1.rar' }
];

let bin = [];
let fileHistory = [];
let modalAction;

displayFiles();

function displayFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    files.forEach(file => {
        const ext = file.name.split('.').pop();
        const icon = fileIcons[ext] || 'icons/file.png';

        const fileDiv = document.createElement('div');
        fileDiv.className = 'file';
        fileDiv.innerHTML = `
            <img src="${icon}" alt="${ext}">
            <p>${file.name.replace(`.${ext}`, '')}</p>
            <button onclick="editFileName(${file.id})">Edit</button>
            <button onclick="moveToBin(${file.id})">Delete</button>
        `;
        fileList.appendChild(fileDiv);
    });
}

function moveToBin(id) {
    const file = files.find(f => f.id === id);
    bin.push(file);
    files = files.filter(f => f.id !== id);
    displayFiles();
    displayBin();
}

function displayBin() {
    const binContainer = document.getElementById('bin');
    binContainer.innerHTML = '';

    bin.forEach(file => {
        const ext = file.name.split('.').pop();
        const icon = fileIcons[ext] || 'icons/file.png';

        const fileDiv = document.createElement('div');
        fileDiv.className = 'file';
        fileDiv.innerHTML = `
            <img src="${icon}" alt="${ext}">
            <p>${file.name}</p>
            <button onclick="restoreFile('${file.name}')">Restore</button>
            <button onclick="removeFromBin('${file.name}')">Delete</button>
        `;
        binContainer.appendChild(fileDiv);
    });
}

function restoreFile(name) {
    const file = bin.find(f => f.name === name);
    files.push(file);
    bin = bin.filter(f => f.name !== name);
    displayFiles();
    displayBin();
}

function searchFiles() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredFiles = files.filter(f => f.name.toLowerCase().includes(query));
    displayFiles(filteredFiles);
}
