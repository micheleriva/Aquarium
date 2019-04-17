module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "js",
    "json",
    "node"
  ],
  "coverageDirectory": "./coverage/",
  "collectCoverage": true
}