const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, 'public', 'scrolling', 'MSP02631.JPG');
const tempPath = path.join(__dirname, 'public', 'scrolling', 'MSP02631_rotated.JPG');

sharp(inputPath)
  .rotate(-90)
  .toFile(tempPath)
  .then(() => {
    fs.renameSync(tempPath, inputPath);
    console.log('Image rotated by -90 degrees and original overwritten.');
  })
  .catch(err => {
    console.error('Error rotating image:', err);
  });
