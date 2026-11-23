const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter a sentence: ", (sentence) => {
  const trimmed = sentence.trim();
  const words = trimmed ? trimmed.split(/\s+/) : [];

  console.log("Word count:", words.length);
  console.log("Words in reverse order:", words.slice().reverse().join(" "));
  console.log("Hyphenated sentence:", trimmed.replace(/\s+/g, "-"));

  rl.close();
});
