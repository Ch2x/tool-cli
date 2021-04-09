#!/usr/bin/env node

const program = require('commander');

const {
  generateTemplate
} = require('./../plop');

const version = require('../package.json').version;

program.version(version);

program.command('template').description('generate template').action(() => {
  generateTemplate()
})

program.parse(process.argv);