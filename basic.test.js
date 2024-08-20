import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

test('Should work with arrays', async () => {
  const generateIcons = (num) => {
    const ary = [];

    for (let i = 0; i < num; i++) {
      ary.push(html`<simple-icon></simple-icon>`);
    }

    return ary;
  };

  const opts = {
    modules: ['./src/components/simple-icon.js'],
    hydrate: true,
    base: import.meta.url,
  }

  // Works
  const icon = await ssrFixture(html`<simple-icon></simple-icon>`, opts)
  assert.exists(icon);

  // Fails
  var icons = await ssrFixture(html`<div>${generateIcons(30)}</div>`, opts);

  // Also fails
  var icons = await ssrFixture(generateIcons(30), opts);

  assert.exists(icons);
});
