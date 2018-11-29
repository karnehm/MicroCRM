const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/Kunde-Anlegen/runtime.js',
    './dist/Kunde-Anlegen/polyfills.js',
    './dist/Kunde-Anlegen/scripts.js',
    './dist/Kunde-Anlegen/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/app-create-form.js');

})();
