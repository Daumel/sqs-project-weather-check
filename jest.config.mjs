import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: [
        '<rootDir>/__tests__/unit/**/*.test.tsx',
        '<rootDir>/__tests__/int/**/*.test.tsx',
    ],
};

export default createJestConfig(config);
