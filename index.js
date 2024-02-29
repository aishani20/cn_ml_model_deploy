const express = require("express");
const app = express();

app.use(express.json());

const runPredictScript = require("./prediction_ml_model/model_access_script");

app.get('/', (req, res) => {
    res.send('Hello World!')
  });


app.post('/predict', async (req, res) => {
  try {
    const data = req.body;
    const inputJson = JSON.stringify(data);
    await runPredictScript(inputJson,(error,result) => {
        if(error){
            console.error(error);
            console.log("Error in running the predict script");
        }
        else{
            console.log(result);
            res.send({
                status: "true",
                message: "Prediction completed successfully",
                result: result
            })
        }
    });
    
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
