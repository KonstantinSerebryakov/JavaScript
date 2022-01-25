"use strict";
const eventEmitter = require('events');
const nodemailer = require('nodemailer');
const positionModel = require('./positions');
const applicantsModel = require('./applicants');

const emitter = new eventEmitter();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '<email>',
        pass: '<password>'
    }
});

async function getValidRecipients(position, applicants) {
    const recipients = [];
    applicants.forEach((applicant) => {
        const isCategoryMatch = applicant.categories && Array.isArray(applicant.categories)
            && applicant.categories.includes(position.category);

        const isLevelMatch = applicant.level && typeof applicant.level === "string"
            && position.level && typeof position.level === "string"
            && position.level === applicant.level;

        const isJapaneseKnowledgeMatch = typeof applicant.japaneseKnowledge === "boolean"
            && (applicant.japaneseKnowledge || typeof position.japaneseRequired === "boolean" && !position.japaneseRequired);

        if (!isCategoryMatch || !isLevelMatch || !isJapaneseKnowledgeMatch) {
            return;
        }

        if (applicant.email && typeof applicant.email === "string") {
            recipients.push(applicant.email);
        }
    });
    return recipients;
}

emitter.on('add', async (id) => {
    const positionGet = await positionModel.getPositionById(id);
    if (!positionGet.length) {
        return;
    }
    const position = positionGet[0];

    const applicants = await applicantsModel.getAllApplicants();
    if (!applicants.length) {
        return;
    }

    const recipients = await getValidRecipients(position, applicants);

    if (!recipients.length) {
        return;
    }

    const mailOptions = {
        from: '<email>',
        to: recipients,
        subject: 'position added',
        text: 'That was easy!',
        alternatives: [{
            contentType: 'application/json',
            content: JSON.stringify(position)
        }]
    }

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

emitter.on('remove', async (id) => {
    const positionGet = await positionModel.getPositionById(id);
    if (!positionGet.length) {
        return;
    }
    const position = positionGet[0];

    const applicants = await applicantsModel.getAllApplicants();
    if (!applicants.length) {
        return;
    }

    const recipients = await getValidRecipients(position, applicants);

    if (!recipients.length) {
        return;
    }

    const mailOptions = {
        from: '<email>',
        to: recipients,
        subject: 'position added',
        text: 'That was easy!',
        alternatives: [{
            contentType: 'application/json',
            content: JSON.stringify(position)
        }]
    }

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

module.exports = emitter;
