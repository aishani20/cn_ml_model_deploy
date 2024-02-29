const { spawn } = require("child_process");
const path = require("path");
const filePath = path.join(__dirname, "/ml_model_script.py");

const pythonScript = filePath;
const runPredictScript = (inputJson,callback) => {
    let outputJson = null;
  // Spawn the Python child process
  const pythonProcess = spawn("python", [pythonScript, inputJson]);

  // Handle the output from the Python process
  pythonProcess.stdout.on("data", (data) => {
    const result = JSON.parse(data.toString());
    console.log(`Python script output: ${JSON.stringify(result)}`);
    callback(null,result);
  });

  // Handle errors, if any
  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python script error: ${data.toString()}`);
    callback(data.toString(),null);
  });

  // Listen for the Python process to exit
  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
  });

  console.log("This is output",outputJson);
  
};


module.exports = runPredictScript;