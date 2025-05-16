/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function(arr, size) {
    // Handle empty array case
    if (arr.length === 0) return [];
    
    const result = [];
    
    // Iterate through the array with step size
    for (let i = 0; i < arr.length; i += size) {
        // Slice the array from current index to size elements ahead
        // If less than size elements remain, slice will automatically take all remaining elements
        result.push(arr.slice(i, i + size));
    }
    
    return result;
};

// Test cases
console.log(chunk([1,2,3,4,5], 1));  // [[1],[2],[3],[4],[5]]
console.log(chunk([1,9,6,3,2], 3));  // [[1,9,6],[3,2]]
console.log(chunk([8,5,3,2,6], 6));  // [[8,5,3,2,6]]
console.log(chunk([], 1));           // []


