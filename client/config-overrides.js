const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@screens": "src/screens",
    "@models": "src/models",
    "@data": "src/data",
    "@core": "src/core"
  })(config);

  return config;
};
