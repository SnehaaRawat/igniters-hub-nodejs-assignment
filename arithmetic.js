const fs = require("fs");
const path = require("path");
const { evaluate } = require("mathjs");

const inputPath = path.join(__dirname, "input.txt");
const outputPath = path.join(__dirname, "output.txt");

function solveExpression(line) {
  // Remove an optional equals sign at the end.
  const expression = line.replace(/=\s*$/, "").trim();

  if (!expression) return "";

  // Only allow the characters specified in the assignment.
  if (!/^[0-9+\-*/^().\[\]{}\s]+$/.test(expression)) {
    throw new Error("Contains unsupported characters");
  }

  
  const normalized = expression.replace(/[\[\]{}]/g, (ch) =>
    ch === "[" || ch === "{" ? "(" : ")"
  );

  const result = evaluate(normalized);

  if (typeof result !== "number" || !Number.isFinite(result)) {
    throw new Error("Expression did not produce a finite number");
  }

  return `${line.trim()} ${result}`;
}

try {
  const input = fs.readFileSync(inputPath, "utf8");
  const lines = input.split(/\r?\n/).filter((line) => line.trim() !== "");

  const output = lines.map((line, index) => {
    try {
      return solveExpression(line);
    } catch (error) {
      return `${line.trim()} ERROR: ${error.message}`;
    }
  });

  fs.writeFileSync(outputPath, output.join("\n") + (output.length ? "\n" : ""));
  console.log(`Processed ${lines.length} expression(s).`);
  console.log(`Results saved to: ${outputPath}`);
} catch (error) {
  console.error("Could not process the input file:", error.message);
  process.exitCode = 1;
}
