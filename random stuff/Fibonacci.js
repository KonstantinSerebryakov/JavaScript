function generateFibonacci(upToNumber) {
    if (typeof upToNumber === "symbol") {
        throw TypeError();
    }
    upToNumber = Number(upToNumber);
    if (!upToNumber && !Number.isFinite(upToNumber)) {
        throw TypeError();
    }

    const series = [];
    let left = 0;
    let right = 1;
    while (left < upToNumber) {
        series.push(left);
        left = right;
        right += series[series.length - 1];
    }

    return series;
}
