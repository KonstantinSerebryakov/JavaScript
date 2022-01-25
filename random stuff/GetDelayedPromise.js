function getDelayedPromise(value) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 6000, value);
    });
}
