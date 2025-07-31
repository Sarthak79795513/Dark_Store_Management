from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, 'quantity_prediction_model.pkl')
scaler_path = os.path.join(BASE_DIR, 'scaler.pkl')
label_encoder_path = os.path.join(BASE_DIR, 'label_encoder.pkl')

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)
label_encoder = joblib.load(label_encoder_path)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Validate required fields
        if 'price' not in data or 'category' not in data:
            return jsonify({"error": "Missing required fields: 'price' and 'category'"}), 400

        price = data['price']
        category = data['category']

        # Validate data types
        if not (isinstance(price, (int, float))):
            return jsonify({"error": "'price' must be a number."}), 400
        if not isinstance(category, str):
            return jsonify({"error": "'category' must be a string."}), 400

        # Encode category
        try:
            category_encoded = label_encoder.transform([category])[0]
        except ValueError:
            return jsonify({"error": f"Unknown category '{category}'"}), 400

        # Prepare input feature array for scaler and model
        X = np.array([[price, category_encoded]])
        X_scaled = scaler.transform(X)

        # Predict
        prediction = model.predict(X_scaled)

        # Return single prediction as float
        return jsonify({"predicted_quantity": float(prediction[0])})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
