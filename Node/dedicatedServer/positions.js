const fs = require('fs');
const path = require('path');
const requireFields = ['category', 'level', 'company', 'description'];

async function addNewPosition(position) {
    checkRequiredFields(requireFields, position);
    position.id = `${position.company}-${(new Date).getTime()}`;
    await fs.promises.writeFile(path.resolve(__dirname, `./db/${position.id}.txt`), JSON.stringify(position));
    return position.id;
}

async function getAllPositions() {
    const positionFilesList = await fs.promises.readdir(path.resolve(__dirname, `./db`));
    return Promise.all(positionFilesList.map(async positionFile => {
        const positionRaw = await fs.promises.readFile(path.resolve(__dirname, `./db/${positionFile}`), 'utf8');
        return JSON.parse(positionRaw);
    }));
}

function checkRequiredFields(requiredFields, objectToCheck) {
    requireFields.forEach(requireField => {
        if (!objectToCheck.hasOwnProperty(requireField)) {
            throw new Error(`No required property '${requireField}' in a new position`);
        }
    });
}

module.exports = {
    addNewPosition,
    getAllPositions
}