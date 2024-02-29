const express = require("express");
const app = express();

app.use(express.json());

const runPredictScript = require("./prediction_ml_model/model_access_script");

app.post("/predict", (req, res) => {
  try {
    const inputJson = req.body;
    runPredictScript(JSON.stringify(inputJson));

    return res.status(200).json({
        success:true,
        message:"Prediction completed successfully"
    })
  } catch (e) {
    console.error(e);
    console.log("Error in the predict route");
  }
});
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port",PORT);
});
