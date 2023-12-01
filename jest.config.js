/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // transformIgnorePatterns: [
    //     '/node_modules/',
    //     '\\.css$',
    //   ],

    // moduleNameMapper: {
    //     "\\.(jpg|jpeg|png|svg)$": "<rootDir>/mocks/prismaMock.js",
    //     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    // },

    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
      },

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: ['<rootDir>/mocks/prismaMock.js']
}
