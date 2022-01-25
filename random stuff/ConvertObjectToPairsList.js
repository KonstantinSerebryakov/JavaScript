function convertObjectToPairsList(object) {
    if (!object || typeof object !== "object") {
        throw TypeError();
    }

    return Object.entries(object);
}
