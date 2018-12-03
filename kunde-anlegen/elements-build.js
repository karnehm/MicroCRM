const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/Kunde-Anlegen/runtime.js',
    './dist/Kunde-Anlegen/polyfills.js',
    './dist/Kunde-Anlegen/scripts.js',
    './dist/Kunde-Anlegen/main.js'
  ];

  await concat(files, 'dist/customer-edit.js');
  fs.writeFile("dist/index.html", '<html><head><title>Customer Edit</title></head><body><customer-edit></customer-edit><script src="customer-edit.js" type="application/javascript"></script></body></html>', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });


})();
