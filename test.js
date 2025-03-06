const {renderBlocks: parseBlocks} = require("./index");
const sampleData = require("./content.json");
console.log(parseBlocks(sampleData));