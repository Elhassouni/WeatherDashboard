from flask import Blueprint, request, jsonify, current_app
import requests

main = Blueprint('main', __name__)

@main.route('/api/weather', methods=['GET'])
def get_weather():
    lat = request.args.get('lat', '25.67')  # Default to Delhi latitude
    lon = request.args.get('lon', '7.22')  # Default to Delhi longitude
    api_key = current_app.config['OPENWEATHER_API_KEY']
    base_url = 'https://api.openweathermap.org/data/2.5/weather'
    
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
        return jsonify({'error': 'Unable to fetch weather data'}), 404