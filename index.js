const cli = require('cac')()
const pkg = require('./package.json');
const {saveAndParse} = require('./ua-parser');

cli
  .command('parse [file]', 'File with User Agent strings')
  .option(
    '--output <file>',
    'Output to this file',
    {default: './result.csv'}
  )
  .action((file, options) => {
    if (!file) {
      console.error('[Error] You have to specify file with UA strings');
      return
    }
    saveAndParse({input: file, output: options.output});
  })

cli.help()
cli.version(pkg.version)

cli.parse()
