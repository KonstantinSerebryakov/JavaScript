function popNullUndefined(array, callback) {
    if (!callback || typeof callback !== "function") {
        throw TypeError();
    }

    let result;
    if (!array || !Array.isArray(array)) {
        result = TypeError();
    }

    if (!result) {
        result = array.filter(value => value !== null && value !== undefined);
    }

    setTimeout(() => {
        callback(result);
    }, 5000);
}

// const array = [1, 2, null, 3, NaN, 4, undefined, 5];
// popNullUndefined(array, (result) => {
//     console.log(result)
// });
// popNullUndefined(12, (result) => {
//     console.log(result)
// });

