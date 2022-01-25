const Worker = require('./model/workers.model');
const Work = require('./model/works.model');
const Logbook = require('./model/logbook.model');
const sequelize = require('./model/sequelize');

Worker.prototype.getWorkingHoursTicks = async function () {
    const works = await this.getWorks();
    let totalTime = 0;
    works.forEach((work) => {
        totalTime += new Date(`1970-01-01T${work.logbook.workingHours}Z`).getTime();
    });
    return totalTime;
}

Worker.prototype.joinWork = async function (work, salary = 0, workingHours = "08:00:00") {
    if (!work || !work instanceof Worker) {
        throw TypeError();
    }
    if (typeof salary !== "number" || salary < 0) {
        throw TypeError();
    }
    if (!workingHours || typeof workingHours !== "string" || !workingHours.match(new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])"))) {
        throw TypeError();
    }

    const currentWorkingHoursTicks = await this.getWorkingHoursTicks();
    const additionalWorkingHoursTicks = new Date(`1970-01-01T${workingHours}Z`).getTime();
    if (currentWorkingHoursTicks + additionalWorkingHoursTicks <= new Date("1970-01-01T20:00:00Z").getTime()) {
        await this.addWork(work, {through: {salary: salary, workingHours: workingHours}});
    } else {
        throw Error("Can not work more than 20 hours");
    }
}

Worker.prototype.joinWorkByName = async function (name, salary = 0, workingHours = "08:00:00") {
    if (typeof name !== "string" || typeof salary !== "number" || salary < 0) {
        throw TypeError();
    }
    if (!workingHours || typeof workingHours !== "string" || !workingHours.match(new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])"))) {
        throw TypeError();
    }

    const currentWorkingHoursTicks = await this.getWorkingHoursTicks();
    const additionalWorkingHoursTicks = new Date(`1970-01-01T${workingHours}Z`).getTime();
    if (currentWorkingHoursTicks + additionalWorkingHoursTicks <= new Date("1970-01-01T20:00:00Z").getTime()) {
        const works = await this.getWorks();
        const work = works.find((work) => {
            return work.name === name;
        });
        await this.addWork(work, {through: {salary: salary, workingHours: workingHours}});
    } else {
        throw Error("Can not work more than 20 hours");
    }
}

Worker.prototype.dropWork = async function (work) {
    if (!work || !work instanceof Work) {
        throw TypeError();
    }

    await this.removeWork(work);
}

Worker.prototype.dropWorkByName = async function (name) {
    if (typeof name !== "string") {
        throw TypeError();
    }

    const works = await this.getWorks();
    const work = works.find((work) => {
        return work.name === name;
    });
    await this.removeWork(work);
}

Worker.prototype.getWorksInfo = async function () {
    const works = await this.getWorks();
    const result = [];
    let totalSalary = 0;
    works.forEach((work) => {
        result.push(`Registration date: ${work.logbook.createdAt}\n`
            + `Work name: ${work.name}\n`
            + `Salary: ${work.logbook.salary}\n`);
        totalSalary += work.logbook.salary;
    });
    result.push(`Total salary: ${totalSalary}`);

    return result;
}

Work.prototype.fireWorker = async function (worker) {
    if (!worker || !worker instanceof Worker) {
        throw TypeError();
    }

    await this.removeWorker(worker);
}

Work.prototype.fireWorkerByName = async function (firstName, lastName) {
    if (typeof firstName !== "string" || typeof lastName !== "string") {
        throw TypeError();
    }

    const workers = this.getWorkers();
    const worker = workers.find((worker) => {
        return worker.firstName === firstName
            && worker.lastName === lastName;
    });

    await this.removeWorker(worker);
}

Work.prototype.getWorkersInfo = async function () {
    const workers = await this.getWorkers();
    const result = [];
    let totalSalary = 0;
    workers.forEach((worker) => {
        result.push(`Registration date: ${worker.logbook.createdAt}\n`
            + `Salary: ${worker.logbook.salary}\n`);
        totalSalary += worker.logbook.salary;
    });
    result.push(`Total salary: ${totalSalary}`);

    return result;
}

sequelize.sync().then(() => {
    console.log("synchronized successfully");
}).catch((error) => {
    console.error(error);
});

module.exports = {
    sequelize: sequelize,
    work: Work,
    worker: Worker,
}
