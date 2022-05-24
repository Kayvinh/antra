arr = [1,2,3,4,5]

// Map
Array.prototype.MyMap =  function (callbackFn)  {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callbackFn(this[i], i, this));
    }
    return result;
};

// Reduce 
Array.prototype.MyReduce = function (callbackFn, initial=0) {
    let result = initial;
    for (let i = 0; i < this.length; i++) {
        result = callbackFn(result, this[i], i, this);
    }
    return result;
};

let newReduce = arr.MyReduce((curr, prev, currIndex, array) => {
    return curr + prev;
}, 2)
console.log(newReduce);     //      17

// Filter
Array.prototype.MyFilter = function (callbackFn) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callbackFn(this[i]))
            result.push(this[i]);
    }
    return result;
};

const moreThanTwo = arr.MyFilter((element, index, array) => {
    return element > 1;
})
console.log(moreThanTwo);       // [2,3,4,5]

// Some
Array.prototype.MySome = function (callbackFn) {
    let result = false;
    for (let i = 0; i < this.length; i++) {
        if (callbackFn(this[i]))
            result = true;
    }
    return result;
};

let lessThanThree = arr.MySome((element, index, array) => {
    return  element < 3;
})
console.log(lessThanThree);