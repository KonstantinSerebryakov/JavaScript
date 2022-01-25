const fs = require('fs');
const requireFields = ["email", "categories", "japaneseKnowledge", "level"];
const path = require('path');
const dbPath = path.resolve(__dirname, './db/applicants');

async function getAllApplicants() {
    const applicantFilesList = await fs.promises.readdir(dbPath);
    return Promise.all(applicantFilesList.map(async applicantFile => {
        const applicantRaw = await fs.promises.readFile(`${dbPath}/${applicantFile}`, 'utf8');
        return JSON.parse(applicantRaw);
    }));
}

async function addApplicant(applicant) {
    const errorMessage = getRequiredFieldsCheckError(requireFields, applicant);
    if (errorMessage) {
        throw new Error(errorMessage);
    }
    applicant.id = `${applicant.email}-${(new Date).getTime()}`;
    await fs.promises.writeFile(`${dbPath}/${applicant.id}.txt`, JSON.stringify(applicant));
    return applicant.id;
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

async function updateApplicant(id, applicantToSet) {
    const errorMessage = getRequiredFieldsCheckError(requireFields, applicantToSet);
    if (errorMessage) {
        throw new Error(errorMessage);
    }

    let status;
    if (fs.existsSync(`${dbPath}/${id}.txt`)) {
        status = 200;
    } else {
        status = 201;
    }
    await fs.promises.writeFile(`${dbPath}/${id}.txt`, JSON.stringify(applicantToSet));

    return status;
}

async function removeApplicant(id) {
    if (fs.existsSync(`${dbPath}/${id}.txt`)) {
        await fs.promises.unlink(`${dbPath}/${id}.txt`);
    }
}

module.exports = {
    addApplicant,
    updateApplicant,
    removeApplicant,
    getAllApplicants
}