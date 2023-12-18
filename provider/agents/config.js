const { init } = require("bot-ws-plugin-openai");

const employeesAddonConfig = {
  model: "gpt-3.5",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
};
const employeesAddon = init(employeesAddonConfig);

module.exports = { employeesAddon, employeesAddonConfig };
