//stable variant
function countOccurrences(string, substring) {
    if (typeof string !== "string" || typeof substring !== "string") {
        throw TypeError();
    }

    if (!substring) {
        return 0;
    }

    let count = -1;
    let index = -substring.length - 1;
    while (index !== -1) {
        index = string.indexOf(substring, index + substring.length);
        count++;
    }

    return count;
}

// console.log(countOccurrences("assssssassssssaaassssaaa", ""));
// console.log(countOccurrences("assssssassssssaaassssaaa", "a"));
// console.log(countOccurrences("ZZasZZZZssxsssasxsssssZZxxxaaassssaaxaxx", "*"));

//throws error if substring is special RegExp value
/*
function countOccurrencesRegExp(string, substring) {
    if (typeof string !== "string" || typeof substring !== "string") {
        throw TypeError();
    }

    if (!substring) {
        return 0;
    }

    const matches = string.match(new RegExp(substring, "g"));

    if (matches) {
        return matches.length;
    } else {
        return 0
    }
}
*/

// console.log(countOccurrencesRegExp("assssssassssssaaassssaaa", ""));
// console.log(countOccurrencesRegExp("assssssassssssaaassssaaa", "a"));
// console.log(countOccurrencesRegExp("ZZasZZZZssxsssasxsssssZZxxxaaassssaaxaxx", "*"));
