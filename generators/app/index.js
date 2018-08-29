'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {

    const prompts = [
      {
        type: 'input',
        name: 'npmName',
        message: '输入 npm 包的名称...'
      },
      {
        type: 'input',
        name: 'description',
        message: '输入 npm 包的描述...'
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {


    var pkg = this.fs.readJSON(this.templatePath('package.json'), {});
    pkg.name = this.props.npmName
    pkg.description = this.props.description
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);


  }
};
