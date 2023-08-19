const fs = require('fs');
const os = require('os');
const path = require('path');

exports.saveBufferToFile = async (buffer) => {
  const tempPath = path.join(os.tmpdir(), Math.random().toString(36).substring(7));
  await fs.promises.writeFile(tempPath, buffer);
  return tempPath;
};
