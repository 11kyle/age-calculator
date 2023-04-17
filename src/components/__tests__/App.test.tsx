import { describe, expect, it, test } from "vitest"
import { months, generateArray } from "../../App"

const testArray = generateArray(1,10)
const testArrayObject = testArray[0]

describe("#generateArray function", () => {
  test("Object in array", () => {
    expect(testArrayObject).toHaveProperty('id')
    expect(testArrayObject).toHaveProperty('name')
  })

  test("id is type of number", () => {
    expect(testArray[0].id).toBeTypeOf('number')
  })

  test("name is type of string", () => {
    expect(testArray[0].name).toBeTypeOf('string')
  })

  it("first index includes start arg", () => {
    expect(testArray[0].id).toBe(1)
    expect(testArray[0].name).toBe("1")
  })

  it("last index includes end arg", () => {
    expect(testArray[testArray.length-1].id).toBe(10)
    expect(testArray[testArray.length-1].name).toBe("10")
  })
})

describe("#months", () => {
  test("month at index 0 is January", () => {
    expect(months[0].name).to.equal("January")
  })
  test("month at index 0 is January", () => {
    expect(months[1].name).to.equal("February")
  })
  test("month at index 0 is January", () => {
    expect(months[2].name).to.equal("March")
  })
  test("month at index 0 is January", () => {
    expect(months[3].name).to.equal("April")
  })
  test("month at index 0 is January", () => {
    expect(months[4].name).to.equal("May")
  })
  test("month at index 0 is January", () => {
    expect(months[5].name).to.equal("June")
  })
  test("month at index 0 is January", () => {
    expect(months[6].name).to.equal("July")
  })
  test("month at index 0 is January", () => {
    expect(months[7].name).to.equal("August")
  })
  test("month at index 0 is January", () => {
    expect(months[8].name).to.equal("September")
  })
  test("month at index 0 is January", () => {
    expect(months[9].name).to.equal("October")
  })
  test("month at index 0 is January", () => {
    expect(months[10].name).to.equal("November")
  })
  test("month at index 0 is January", () => {
    expect(months[11].name).to.equal("December")
  })
})