const form = document.getElementById('prediction-form');
const resultDiv = document.getElementById('prediction-result');

async function loadModel() {
    // Load the model from a URL or from a local file
    const model = await tf.loadLayersModel('calorie_predictor.ipynb');
    console.log('Model loaded!');
    return model;
  }

  async function makePrediction(model, input) {
    // Convert the input to a tensor
    const inputTensor = tf.tensor2d(input, [1, input.length]);
  
    // Make a prediction using the model
    const prediction = model.predict(inputTensor);
  
    // Convert the prediction to a number
    const predictedValue = prediction.dataSync()[0];
  
    console.log('Predicted value:', predictedValue);
    return predictedValue;
  }
  
  loadModel().then(model => {
    const input = [1, 2, 3, 4, 5];
    makePrediction(model, input).then(predictedValue => {
      console.log('Predicted value:', predictedValue);
    });
  });

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {
    Age: parseFloat(formData.get('age')),
    Weight: parseFloat(formData.get('weight')),
    Height: parseFloat(formData.get('height')),
    Gender: parseFloat(formData.get('gender')),
    Duration: parseFloat(formData.get('duration')),
  };

  try {
    const prediction = await model.predict(data);
    resultDiv.textContent = `Predicted Calories: ${prediction}`;
  } catch (error) {
    console.error(error);
    resultDiv.textContent = 'Error: Unable to make a prediction';
  }
});