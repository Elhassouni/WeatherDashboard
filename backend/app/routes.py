from flask import Blueprint, request, jsonify, current_app
import requests

main = Blueprint('main', __name__)

@main.route('/api/weather', methods=['GET'])
def get_weather():
    lat = request.args.get('lat', '31.7917')  # Default to a specific latitude
    lon = request.args.get('lon', '-7.0926')  # Default to a specific longitude
    api_key = current_app.config['OPENWEATHER_API_KEY']
    base_url = 'https://api.openweathermap.org/data/3.0/onecall'
    
    params = {
        'lat': lat,
        'lon': lon,
        'units': 'metric',
        'appid': api_key
    }
    
    response = requests.get(base_url, params=params)
    
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Error fetching weather data'}), response.status_code