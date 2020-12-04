const { test, readInput } = require('../utils')

// put each row in an array and slice away the last element (it's empty)
const prepareInput = (rawInput) =>
  rawInput.split(/\n/).map((row) => row.slice(0, row.length - 1))

const input = prepareInput(readInput())

// By calculating the index with modulo, the pattern starts again if
// the last element of a row is reached
const checkForTree = (right, down) => (mapRow, rowIdx) =>
  rowIdx % down === 0
    ? mapRow[((rowIdx / down) * right) % mapRow.length] === '#'
    : false

const countTreeHits = (numOfTrees, rowHasTree) =>
  rowHasTree ? numOfTrees + 1 : numOfTrees

const checkSlope = (right, down, grid) =>
  grid.map(checkForTree(right, down)).reduce(countTreeHits, 0)

const goA = (input) => {
  return checkSlope(3, 1, input)
}

const goB = (input) =>
  checkSlope(1, 1, input) *
  checkSlope(3, 1, input) *
  checkSlope(5, 1, input) *
  checkSlope(7, 1, input) *
  checkSlope(1, 2, input)

/* Tests */

// test(result, expected)

/* Results */

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
