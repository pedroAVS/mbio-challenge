const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Which browser would you like to use (chrome or firefox)? ', (answer) => {
  const configPath = path.join(__dirname, '..', '..', '/configs/wdio.conf.ts');
  const config = fs.readFileSync(configPath, 'utf8');
  const modifiedConfig = config.replace(/browserName: '.*'/, `browserName: '${answer}'`);
  fs.writeFileSync(configPath, modifiedConfig);
  rl.close();
});