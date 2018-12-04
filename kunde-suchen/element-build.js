// Source: https://www.ngdevelop.tech/angular-elements/

const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/Kunde-Suche/polyfills.js',
    './dist/Kunde-Suche/runtime.js',

//    './dist/Kunde-Suche/scripts.js',
    './dist/Kunde-Suche/main.js',
  ]

  await concat(files, 'dist/customer-search.js');
  fs.writeFile("dist/index.html", '<html><head><title>Customer Edit</title></head><body><customer-search></customer-search><script src="customer-search.js" type="application/javascript"></script></body></html>', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

})()
