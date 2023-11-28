const { test, readInput } = require('../utils')

const BLANK_LINE = /\n{2,}/g
const NEW_LINE_SPACE = /\n{1,}| /g
const HAIR_COLOR = /#([a-f]|[0-9]){6}/g
const EYE_COLOR = /(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth){1}/g
const PASS_ID = /[0-9]{9}/g

const deleteEmptyFields = (entries, currField) =>
  currField === '' ? entries : [...entries, currField]

const splitStringByColonToKeyValue = (keyValuePass, currEntry) => {
  const entry = currEntry.split(':')
  return { ...keyValuePass, [entry[0]]: entry[1] }
}

const prepareInput = (rawInput) => {
  const parsedPassports = rawInput
    .split(BLANK_LINE)
    .map((passport) =>
      passport.split(NEW_LINE_SPACE).reduce(deleteEmptyFields, [])
    )

  return parsedPassports.map((passport) =>
    passport.reduce(splitStringByColonToKeyValue, {})
  )
}

const input = prepareInput(readInput())

const passportValidation = (transformator = (bool, _) => bool) => (passport) =>
  transformator(
    passport.hasOwnProperty('ecl') &&
      passport.hasOwnProperty('pid') &&
      passport.hasOwnProperty('eyr') &&
      passport.hasOwnProperty('hcl') &&
      passport.hasOwnProperty('byr') &&
      passport.hasOwnProperty('iyr') &&
      passport.hasOwnProperty('hgt'),
    passport
  )

const countValidPassports = (validPassCount, passportValid) =>
  passportValid ? validPassCount + 1 : validPassCount

const goA = (input) => {
  return input.map(passportValidation()).reduce(countValidPassports, 0)
}

const goB = (input) => {
  const checkPassEntries = (pass) => {
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = pass
    return (
      (byr.length === 4
        ? parseInt(byr) >= 1920 && parseInt(byr) <= 2002
        : false) &&
      (iyr.length === 4
        ? parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020
        : false) &&
      (eyr.length === 4
        ? parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030
        : false) &&
      (hgt.endsWith('cm')
        ? hgt.slice(0, -2) >= 150 && hgt.slice(0, -2) <= 193
        : hgt.endsWith('in')
        ? hgt.slice(0, -2) >= 59 && hgt.slice(0, -2) <= 76
        : false) &&
      (hcl.length === 7 ? hcl.match(HAIR_COLOR) !== null : false) &&
      (ecl.length === 3 ? ecl.match(EYE_COLOR) !== null : false) &&
      (pid.length === 9 ? pid.match(PASS_ID) !== null : false)
    )
  }

  // the passportValidation gets a custom transformation function to be able to access the data later
  return input
    .map(
      passportValidation((bool, passport) => ({
        valid: bool,
        passport,
      }))
    )
    .map((passport) =>
      passport.valid ? checkPassEntries(passport.passport) : passport.valid
    )
    .reduce(countValidPassports, 0)
}

/* Tests */

// test(result, expected)

/* Results */

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
