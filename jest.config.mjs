import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        url: 'http://127.0.0.1:3000',
    },
    testMatch: [
        '<rootDir>/__tests__/unit/**/*.test.ts?(x)',
        '<rootDir>/__tests__/int/**/*.test.ts?(x)',
    ],
};

export default createJestConfig(config);
