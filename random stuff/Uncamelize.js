function uncamelize(text, separator = " ") {
    if (typeof text !== "string" || typeof separator !== "string") {
        throw TypeError();
    }

    const trimmed = text.trim();

    const index = trimmed.search(new RegExp("[A-Z]|[А-Я]"));
    if (index === -1) {
        return trimmed;
    }

    const replaced = trimmed.replace(new RegExp("[A-Z]|[А-Я]", "g"), function (match) {
        return separator + match.toLowerCase();
    });

    if (index) {
        return replaced;
    } else {
        return replaced.substr(separator.length)
    }
}

// console.log(uncamelize(" Awfa Awf"));
// console.log(uncamelize("001Awfa Awf", "00"));
// console.log(uncamelize('helloWorld'));
// console.log(uncamelize('helloWorld','-'));
// console.log(uncamelize('helloWorld','_'));
// console.log(uncamelize('heАlloWorld','_'));
// console.log(uncamelize('hellЯoWorld','_'));
// console.log(uncamelize('helloWoМrld','_'));
