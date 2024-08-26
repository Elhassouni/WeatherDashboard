from flask import Flask, jsonify, request
import requests
/**
 *
 *  Flask application for weather data.
 *
 *  Description: This application provides a simple API to fetch weather information
 *  from OpenWeatherMap based on the city and units specified by the user.
 *  Fetching location of the user but not yet implemanted
 *
 *
 */



app = Flask(__name__, static_folder='static')

# OpenWeatherMap API key
API_KEY = 'b10dd50b08697be8a1d58ac06d544e72'
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

@app.route('/')
def serve():
    return app.send_static_file('index.html')

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    units = request.args.get('units', default='metric', type=str)  # metric for Celsius, imperial for Fahrenheit

    if not city:
        return jsonify({'error': 'City name is required'}), 400

    # Construct the API request URL
    url = f"{BASE_URL}?q={city}&units={units}&appid={API_KEY}"

    # Make the API request
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        weather_data = {
            'city': data['name'],
            'temperature': data['main']['temp'],
            'conditions': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon']
        }
        return jsonify(weather_data)
    else:
        return jsonify({'error': 'Unable to retrieve weather data'}), response.status_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

