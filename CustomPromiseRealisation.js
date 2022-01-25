(function () {
    const PENDING = 0;
    const FULFILLED = 1;
    const REJECTED = 2;

    class MyPromise {
        constructor(callback) {
            this.value = undefined;
            this.state = PENDING;
            this.handlers = [];

            this.resolve = resolvedValue => {
                this.value = resolvedValue;
                this.state = FULFILLED;
                this.triggerHandlers();
            }

            this.reject = rejectedValue => {
                this.value = rejectedValue;
                this.state = REJECTED;
                this.triggerHandlers();
            }

            MyPromise.doResolve({promise: this, callback: callback});
        }

        static doResolve(handler) {
            setTimeout(function () {
                const promise = handler.promise;
                const callback = handler.callback;
                try {
                    callback(promise.resolve, promise.reject);
                } catch (e) {
                    promise.reject(e)
                }
            }, 0);
        }

        then(...args) {
            const onFulfilled = args[0];
            const onRejected = args[1];

            let callback;

            if (args.length === 0 || this.state === REJECTED && args.length < 2) {
                callback = (resolve, reject) => {
                    if (this.state === FULFILLED) {
                        return resolve(this.value);
                    } else if (this.state === REJECTED) {
                        return reject(this.value);
                    }
                };
            } else if (this.state === FULFILLED && args.length === 1 && typeof onFulfilled === "function") {
                callback = (resolve, reject) => {
                    return resolve(onFulfilled(this.value));
                };
            } else if (this.state === REJECTED && args.length === 2 && typeof onRejected === "function") {
                callback = (resolve, reject) => {
                    // return reject(onRejected(this.value));
                    return resolve(onRejected(this.value));
                };
            } else if (this.state === PENDING) {
                callback = (resolve, reject) => {
                    if (this.state === FULFILLED && typeof onFulfilled === "function") {
                        return resolve(onFulfilled(this.value));
                    } else if (this.state === REJECTED && typeof onRejected === "function") {
                        // return reject(onRejected(this.value));
                        return resolve(onRejected(this.value));
                    } else {
                        return reject(this.value);
                    }
                }
            } else if (args.length > 2 || this.state === FULFILLED && args.length > 1) {
                throw "error: arguments doesn't match";
            } else {
                throw "unknown error";
            }

            const promise = new MyPromise((resolve, reject) => {
            });
            this.handlers.push({
                promise: promise,
                callback: callback,
            })
            return promise;
        }

        catch(onRejected) {
            const callback = (resolve, reject) => {
                if (this.state === FULFILLED) {
                    resolve(this.value);
                } else if (this.state === REJECTED) {
                    try {
                        const value = onRejected(this.value);
                        if (typeof value === "object" && value instanceof MyPromise && value.state === REJECTED) {
                            reject(value);
                        } else {
                            resolve(value);
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            };

            const promise = new MyPromise((resolve, reject) => {
            });
            this.handlers.push({
                promise: promise,
                callback: callback,
            })
            return promise;
        }

        triggerHandlers() {
            this.handlers.forEach(MyPromise.doResolve);
            this.handlers = [];
        }
    }

    /*
        /////////////////
        //// TESTING ////
        /////////////////
        const myPromise = new MyPromise((resolve, reject) => {
            // resolve(123);
            setTimeout(function () {
                resolve(222)
                // resolve(222)
            }, 1000)
        })
        const myPromise1 = myPromise.then(function a(value) {
            console.log(value);
            return value + 100;
        }).then().then(function b(value) {
            console.log(value);
            // throw "afwafaf"
            return value + 1;
        }).then(function c(value) {
            console.log(value);
        }).then(console.log, console.error).then(function () {
        }).catch(console.error);

        /////////////////
        //// TESTING ////
        /////////////////
        const promise = new Promise((resolve, reject) => {
            // resolve(123);
            setTimeout(function () {
                resolve(222)
                // resolve(222)
            }, 1000)
        })

        const promise1 = promise.then(function a(value) {
            console.log(value);
            return value + 100;
        }).then().then(function b(value) {
            console.log(value);
            // throw "afwafaf"
            return value + 1;
        }).then(function c(value) {
            console.log(value);
        }).then(console.log, console.error).then(function () {
        }).catch(console.error);
    */
})();
