function flatAndSortArray(array) {
    if (!array || !Array.isArray(array)) {
        throw TypeError();
    }

    let flattened = array;
    while (flattened.some(element => Array.isArray(element))) {
        flattened = flattened.reduce(
            function (accumulator, currentValue) {
                return accumulator.concat(currentValue);
            },
            []
        );
    }

    return flattened.sort((a, b) => {
        if (typeof a !== "number" && typeof a !== "string" || typeof b !== "number" && typeof b !== "string") {
            return 0;
        } else {
            return a - b;
        }
    });
}

// console.log(flatAndSortArray([1, 2, "1000", "300", [400, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6]]))
