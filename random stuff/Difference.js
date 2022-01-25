function difference(left, right) {
    if (!Array.isArray(left) || !Array.isArray(right)) {
        throw TypeError();
    }

    const concatenated = [].concat(left).concat(right);
    const flattened = concatenated.flat(Infinity);

    const mapped = flattened.map(value => {
        if (typeof value === "symbol") {
            return value;
        }
        const number = Number(value);
        if (Number.isNaN(number)) {
            return value;
        } else {
            return number;
        }
    });

    const unique = [...new Set(mapped)];
    const sorted = unique.sort((a, b) => {
        if (typeof a !== "number" || typeof b !== "number") {
            return 0;
        } else {
            return a - b
        }
    });

    return sorted.map(value => {
        if (typeof value === "number") {
            return value.toString();
        } else {
            return value;
        }
    });
}

// console.log(difference([1, 2, 3], [100, 2, 1, 10]));
// console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]], [5, 6]]));
// console.log(difference([1, 2, 3], [100, 2, 1, 10]));
// console.log(difference([1, 2, 3, {}, {}], [100, 2, 1, 10]));
// console.log(difference([1, 2, 120, 3, {}, Symbol(3)], [100, 2, 1, 10]));
