const db = require('./dbController');
const Work = db.work;
const Worker = db.worker;

async function createNotes() {
    const work1 = await Work.create(
        {
            name: "name1",
        }
    )

    const work2 = await Work.create(
        {
            name: "name2",
        }
    )

    const worker1 = await Worker.create({
        firstName: "first1",
        lastName: "last1"
    })

    await worker1.joinWork(work1);
    await worker1.joinWork(work2);

    console.log(await worker1.getWorksInfo());
}

createNotes();
