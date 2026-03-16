function calcTotalPrice(items) {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
    }, 0);
}

function calcTotalCount(items) {
    return items.reduce((sum, obj) => {
        return sum + obj.count;
    }, 0);
}

export {calcTotalPrice, calcTotalCount};