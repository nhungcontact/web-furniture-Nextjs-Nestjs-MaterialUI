// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

module.exports = {
  input: [
    "src/components/**/*.tsx",
    // Use ! to filter out files or directories
    "!src/components/**/*.stories.tsx",
  ],
  output: "./",
  options: {
    debug: false,
    removeUnusedKeys: true,
    func: false,
    trans: false,
    lngs: ["en", "vi", "ko"],
    defaultLng: "en",
    defaultNs: "shared",
    defaultValue: function (lng, ns, key) {
      return key;
    },
    removeUnusedKeys: false,
    resource: {
      loadPath: "src/app/locales/{{lng}}.json",
      savePath: "src/app/locales/{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false, // namespace separator
    keySeparator: ".", // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let ns = file.path.match(/.+\/(\S+)\.\w+/)[1];

    console.log(`Scan file [${ns}] @ ${file.path}`);

    parser.parseFuncFromString(
      content,
      {
        list: ["t"],
        extensions: [".tsx"],
      },
      (key, options) => {
        parser.set(`${ns}.${key}`, options);
      },
    );

    done();
  },
};
