function caseInsensitiveSearch(source, string) {
    if (typeof source !== "string" || typeof string !== "string") {
        throw TypeError();
    }

    if (!string) {
        return "Not Matched";
    }

    const isInclude = source.toLowerCase().includes(string.toLowerCase());
    if (isInclude) {
        return "Matched";
    } else {
        return "Not Matched";
    }
}

// console.log(caseInsensitiveSearch('JavaScript Exercises', 'exercises'));
// console.log(caseInsensitiveSearch('JavaScript Exercises', 'Exercises'));
// console.log(caseInsensitiveSearch('JavaScript Exercises', 'Exercisess'));
// console.log(caseInsensitiveSearch('JavaScript Exercises', '*'));
