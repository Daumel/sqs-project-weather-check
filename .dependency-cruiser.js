/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: 'no-circular',
            severity: 'warn',
            comment: 'This dependency is part of a circular relationship',
            from: {},
            to: {
                circular: true,
            },
        },
        {
            name: 'no-duplicate-dep-types',
            severity: 'warn',
            comment: 'This module depends on an external package that occurs more than once in the package.json',
            from: {},
            to: {
                moreThanOneDependencyType: true,
                dependencyTypesNot: ['type-only'],
            },
        },
        {
            name: 'no-orphans',
            severity: 'warn',
            comment: "This is an orphan module - it's likely not used anymore",
            from: {
                orphan: true,
            },
            to: {},
        },
        {
            name: 'no-non-package-json',
            severity: 'error',
            comment: "This module depends on a package that isn't in the 'dependencies' section of the package.json",
            from: {},
            to: {
                dependencyTypes: ['npm-no-pkg', 'npm-unknown'],
            },
        },
        {
            name: 'not-to-test',
            severity: 'error',
            comment: 'This module depends on code within a folder that should only contain tests',
            from: {
                pathNot: '^(__tests__)',
            },
            to: {
                path: '^(__tests__)',
            },
        },
        {
            name: 'not-to-backend',
            severity: 'error',
            comment: 'This frontend module depends on a backend module. Interaction is expected to occur via API calls',
            from: {
                path: '^(src/components)',
            },
            to: {
                path: '^(src/pages/api)',
            },
        },
        {
            name: 'not-to-frontend',
            severity: 'error',
            comment: 'This backend module depends on a frontend module',
            from: {
                path: '^(src/pages/api)',
            },
            to: {
                path: '^(src/components)',
            },
        },
    ],
    options: {
        doNotFollow: {
            path: 'node_modules',
        },
        tsPreCompilationDeps: true,
        tsConfig: {
            fileName: 'tsconfig.json',
        },
        enhancedResolveOptions: {
            exportsFields: ['exports'],
            conditionNames: ['import', 'require', 'node', 'default'],
            mainFields: ['main', 'types'],
        },
        reporterOptions: {
            dot: {
                collapsePattern: 'node_modules/(@[^/]+/[^/]+|[^/]+)',
            },
            text: {
                highlightFocused: true,
            },
        },
    },
};
