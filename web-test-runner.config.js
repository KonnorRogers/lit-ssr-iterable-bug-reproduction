import { esbuildPlugin } from '@web/dev-server-esbuild';
import { litSsrPlugin } from '@lit-labs/testing/web-test-runner-ssr-plugin.js';
import { playwrightLauncher } from '@web/test-runner-playwright';
import * as os from 'os';

// os.availableParallelism only available as of Node 18.14.0 , maybe dont need the fallback?
const cores = os.availableParallelism?.() ?? os.cpus.length;
const concurrency = Math.max(Math.floor(cores / 3), 1);

export default {
  rootDir: '.',
  files: './basic.test.js', // "default" group
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ['production', 'default'],
  },
  testFramework: {
    config: {
      ui: 'tdd',
      timeout: 3000,
      retries: 1,
    },
  },
  plugins: [
    // esbuildPlugin({
    //   target: 'es2020',
    // }),
    litSsrPlugin(),
  ],
   browsers: [
    playwrightLauncher({ product: 'chromium', concurrency }),
    playwrightLauncher({ product: 'firefox', concurrency }),
    playwrightLauncher({ product: 'webkit', concurrency }),
  ],
  testRunnerHtml: (testFramework) => `
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <script type="module" src="${testFramework}"></script>
      </head>
      <body>
      </body>
    </html>
  `,
};
