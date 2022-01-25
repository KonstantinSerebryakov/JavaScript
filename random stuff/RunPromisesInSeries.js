function runPromisesInSeries(promises) {
    let promise = Promise.resolve();
    promises.forEach((item) => {
        promise = promise.then((value) => {
            return item;
        })
    })
}
