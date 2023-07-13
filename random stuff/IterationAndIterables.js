//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
(async function () {
    // SYNCHRONOUS GENERATOR
    function* generateIterator(limit = Number.MAX_SAFE_INTEGER) {
        let current = 0;
        while (current < limit) {
            yield current++;
        }
        return current;
    }

    const generatorIterable = generateIterator(5);
    for (const value of generatorIterable) {
        console.log("generator iterable: " + value);
    }

    // SYNCHRONOUS PROMISE GENERATOR
    function* generatePromiseIterator(limit = Number.MAX_SAFE_INTEGER) {
        let current = 0;
        while (current < limit) {
            const timeout = Math.random() * 1000;
            yield new Promise((resolve, reject) => setTimeout(resolve, timeout, current++));
        }
        return current;
    }

    const generatorPromiseIterable = generatePromiseIterator(5);

    generatorPromiseIterable.next().value.then((result) => { console.log("promise iterator: " + result) });

    for await (const iteratorResult of generatorPromiseIterable) {
        console.log("promise generator iterable: " + iteratorResult);
    }

    // ASYNC GENERATOR
    async function* generateAsyncIterator(limit = Number.MAX_SAFE_INTEGER) {
        let current = 0;
        while (current < limit) {
            yield await new Promise((solve, reject) => { solve(current++) });
        }
        return current;
    }

    const asyncGeneratorIterable = generateAsyncIterator(5);

    asyncGeneratorIterable.next().then((iteratorResult) => { console.log("async iterator: " + iteratorResult.value) });

    for await (const value of asyncGeneratorIterable) {
        console.log("async generator iterable: " + value);
    }

    // USER DEFINED ITERABLE
    const customIterable = {
        counter: 0,
        limit: Number.MAX_SAFE_INTEGER,

        *[Symbol.iterator]() {
            while (this.counter < this.limit) {
                yield this.counter++;
            }
            return this.counter;
        },
    }
    customIterable.limit = 5;

    for (const item of customIterable) {
        console.log("user defined iterable: " + item)
    }

    // ITERATOR
    function counterIterator() {
        const limit = 10;
        let counter = 0;

        return {
            [Symbol.iterator]() {
                return this;
            },

            next() {
                if (counter > limit) return { done: true }

                return {
                    value: counter++,
                    done: false,
                };
            },
        };
    }

    const iteratorIterable = counterIterator();

    for (const value of iteratorIterable) {
        console.log("iterator iterable: " + value)
    }

    // BUILT-IN ITERABLE
    const mySet = new Set();

    for (let i = 0; i < 10; i++) {
        mySet.add(Math.random() * 100);
    }

    const builtInIterator = mySet[Symbol.iterator]();
    console.log(builtInIterator.next().value);
})()
