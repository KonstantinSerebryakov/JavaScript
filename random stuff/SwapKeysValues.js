function swapKeysValues(object) {
    return Object.entries(object).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc
    }, {})
}
