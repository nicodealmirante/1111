const ncp = require('ncp').ncp;
const fs = require('fs');  
const path = require('path');


const sourceImagePath = 'index.cjs';


const destinationFolderPath = './node_modules/@bot-whatsapp/provider/lib/meta';


const destinationFolderExists = fs.existsSync(destinationFolderPath);
if (!destinationFolderExists) {
  fs.mkdirSync(destinationFolderPath, { recursive: true });
}


ncp(sourceImagePath, path.join(destinationFolderPath, path.basename(sourceImagePath)), function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Imagen copiada exitosamente!');
});
