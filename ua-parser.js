const fs = require('fs');
const os = require('os')
const UAParser = require('ua-parser-js');

const csvSeparator = '^';
const csvHeader = [
  'user_agent',
  'operating_system_name',
  'operating_system_version_one',
  'software_name',
  'software_version_one'
].join(csvSeparator);


function saveAndParse(options) {
  const {input, output} = options;
  fs.writeFileSync(output, csvHeader)
  fs.readFile(input, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return
    }
    const table = data.split(os.EOL).slice(1);
    const newTable = table.map(parseUA).join(os.EOL)
    fs.writeFileSync(output, newTable, {flag: 'a'})
  });
}

function parseUA(line) {
  if (!line) return '';
  const uaObj = new UAParser(line);
  const ua = uaObj.getResult();
  return [
    line,
    ua.os.name,
    ua.os.version,
    ua.browser.name,
    ua.browser.version
  ].join(csvSeparator);
}

module.exports = {saveAndParse};
