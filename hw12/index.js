const fs = require('fs');

const poemFileName = "./poem.txt";
const yearFileName  = "./year.txt";

console.log("Hello NodeJs!");

fs.readFile(poemFileName, "UTF-8", (err, data) => {
	console.log(data);
});

console.log(2023 - fs.readFileSync(yearFileName, "UTF-8"));

