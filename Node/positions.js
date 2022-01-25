const fs = require('fs');
const requireFields = ["category", "level", "company", "japaneseRequired"];
const path = require('path');
const dbPath = path.resolve(__dirname, './db/positions');

async function addNewPosition(position) {
    const errorMessage = getRequiredFieldsCheckError(requireFields, position);
    if (errorMessage) {
        throw new Error(errorMessage);
    }
    position.id = `${position.company}-${(new Date).getTime()}`;
    await fs.promises.writeFile(`${dbPath}/${position.id}.txt`, JSON.stringify(position));
    return position.id;
}

function getRequiredFieldsCheckError(requiredFields, objectToCheck) {
    const errors = [];
    requireFields.forEach(requireField => {
        if (!objectToCheck.hasOwnProperty(requireField)) {
            errors.push(requireField);
        }
    });
    return errors.length ? 'No required property(ies): ' + errors : false;
}

async function getPositionById(id) {
    const positions = await getAllPositions()
    return [positions.find(position => position.id === id)];
}

async function removePosition(id) {
    if (fs.existsSync(`${dbPath}/${id}.txt`)) {
        await fs.promises.unlink(`${dbPath}/${id}.txt`);
    }
}

async function updatePosition(id, positionToPatch) {
    const positionGet = await getPositionById(id);
    if (!positionGet.length) {
        return 404;
    }

    const position = positionGet[0];
    Object.keys(positionToPatch).forEach((key) => {
        if (key !== "id") {
            position[key] = positionToPatch[key];
        }
    });

    await fs.promises.writeFile(`${dbPath}/${position.id}.txt`, JSON.stringify(position));
    return 200;
}

async function getAllPositions() {
    const positionFilesList = await fs.promises.readdir(dbPath);
    return Promise.all(positionFilesList.map(async positionFile => {
        const positionRaw = await fs.promises.readFile(`${dbPath}/${positionFile}`, 'utf8');
        return JSON.parse(positionRaw);
    }));
}

module.exports = {
    addNewPosition,
    getAllPositions,
    getPositionById,
    updatePosition,
    removePosition
}