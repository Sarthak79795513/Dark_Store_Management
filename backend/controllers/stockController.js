const { spawn } = require('child_process');
const path = require('path');

const predictStock = (req, res) => {
  const { price, category } = req.body;

  // Validate input
  if (typeof price !== 'number' || typeof category !== 'string') {
    return res.status(400).json({ error: 'Invalid input types: price must be a number and category must be a string.' });
  }

  // Path to the Python script
  const scriptPath = path.join(__dirname, '../ml/app.py');

  // Spawn a new Python process
  const pythonProcess = spawn('python3', [scriptPath, price, category]);

  let result = '';
  let error = '';

  // Collect data from stdout
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  // Collect data from stderr
  pythonProcess.stderr.on('data', (data) => {
    error += data.toString();
  });

  // Handle process exit
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      try {
        const prediction = JSON.parse(result);
        res.json({ predicted_quantity: prediction });
      } catch (parseError) {
        res.status(500).json({ error: 'Failed to parse prediction output.', details: parseError.message });
      }
    } else {
      res.status(500).json({ error: 'Python script error.', details: error });
    }
  });

  // Handle process errors
  pythonProcess.on('error', (err) => {
    res.status(500).json({ error: 'Failed to start Python script.', details: err.message });
  });
};

module.exports = { predictStock };
