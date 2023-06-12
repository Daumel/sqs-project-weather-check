import { defineConfig } from 'cypress';
import * as preprocessor from '@badeball/cypress-cucumber-preprocessor';
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        supportFile: false,
        specPattern: '**/*.feature',
        videosFolder: '__tests__/e2e/videos',
        screenshotsFolder: '__tests__/e2e/screenshots',
        retries: {
            runMode: 2,
            openMode: 0,
        },
        async setupNodeEvents(on, config) {
            await preprocessor.addCucumberPreprocessorPlugin(on, config);
            const options = {
                typescript: require.resolve('typescript'),
            };
            on('file:preprocessor', browserify(config, options));

            return config;
        },
    },
});
