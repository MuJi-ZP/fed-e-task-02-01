const generator = require("yeoman-generator");
module.exports = class extends generator {
  promptting() {
    return this.prompt([
      {
        type: "input",
        name: "folderName",
        message: "folder name",
        default: this.appname
      },
      {
        type: "input",
        name: "title",
        message: "htmlTitle",
        default: this.appname
      },
      {
        type: "input",
        name: "flag",
        message: "testFlag",
        default: this.appname
      }
    ]).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    const tmpl = this.templatePath("test.html");
    const context = this.answers;
    const inputPath = this.destinationPath(
      `./${context.folderName}/input.html`
    );
    this.fs.copyTpl(tmpl, inputPath, context);
  }
};
