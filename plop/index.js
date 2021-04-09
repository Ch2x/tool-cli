const path = require('path');
const nodePlop = require('node-plop');
const ora = require('ora');
const chalk = require('chalk');

const args = process.argv.slice(2);
const argv = require('minimist')(args);

const out = require('./console-out');

const progressSpinner = ora();

function generateTemplate() {
  const plopfilePath = path.join(__dirname, './plopfile.js');
  const plop = nodePlop(plopfilePath, {
    destBasePath: path.resolve(process.cwd()),
    force: false
  });
  const generators = plop.getGeneratorList();
  // const generatorNames = generators.map(v => v.name);
  let generatorName = '';
  // look up a generator and run it with calculated bypass data
  const runGeneratorByName = name => {
    const generator = plop.getGenerator(name);
    const bypassData = [];
    doThePlop(generator, bypassData);
  };

  // hmmmm, couldn't identify a generator in the user's input
  if (!generators.length) {
    // no generators?! there's clearly something wrong here
    console.error(chalk.red('[PLOP] ') + 'No generator found in plopfile');
    process.exit(1);
  } else if (!generatorName && generators.length > 1) {
    // more than one generator? we'll have to ask the user which
    // one they want to run.
    out.chooseOptionFromList(generators, plop.getWelcomeMessage())
      .then(runGeneratorByName)
      .catch((err) => {
        console.error(chalk.red('[PLOP] ') + 'Something went wrong with selecting a generator', err);
      });
  }
}

////
// everybody to the plop!
////
function doThePlop(generator, bypassArr) {
  generator.runPrompts(bypassArr)
    .then(answers => {
      const noMap = (argv['show-type-names'] || argv.t);
      const onComment = (msg) => {
        progressSpinner.info(msg);
        progressSpinner.start();
      };
      const onSuccess = (change) => {
        let line = '';
        if (change.type) {
          line += ` ${out.typeMap(change.type, noMap)}`;
        }
        if (change.path) {
          line += ` ${change.path}`;
        }
        progressSpinner.succeed(line);
        progressSpinner.start();
      };
      const onFailure = (fail) => {
        let line = '';
        if (fail.type) {
          line += ` ${out.typeMap(fail.type, noMap)}`;
        }
        if (fail.path) {
          line += ` ${fail.path}`;
        }
        const errMsg = fail.error || fail.message;
        if (errMsg) {
          line += ` ${errMsg}`
        };
        progressSpinner.fail(line);
        progressSpinner.start();
      };
      progressSpinner.start();
      return generator.runActions(answers, {
          onSuccess,
          onFailure,
          onComment
        })
        .then(() => progressSpinner.stop());
    })
    .catch(function (err) {
      console.error(chalk.red('[ERROR]'), err.message);
      process.exit(1);
    });
}

module.exports = {
  generateTemplate
};