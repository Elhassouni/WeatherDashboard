from flask import Blueprint, request, jsonify, current_app
import requests

main = Blueprint('main', __name__)

@main.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    api_key = current_app.config['OPENWEATHER_API_KEY']
    
    if city:
        # Fetch coordinates for the city from OpenWeather Geocoding API
        geo_url = 'http://api.openweathermap.org/geo/1.0/direct'
        geo_params = {
            'q': city,
            'limit': 1,
            'appid': api_key
        }
        
        geo_response = requests.get(geo_url, params=geo_params)
        if geo_response.status_code != 200 or not geo_response.json():
            return jsonify({'error': 'City not found'}), 404
        
        geo_data = geo_response.json()[0]
        lat = geo_data['lat']
        lon = geo_data['lon']
    else:
        # Default to predefined coordinates if no city is provided
        lat = request.args.get('lat', '25.67')  # Default latitude
        lon = request.args.get('lon', '7.22')  # Default longitude
    
    # Fetch weather data from OpenWeather Weather API
    weather_url = 'https://api.openweathermap.org/data/2.5/weather'
    weather_params = {
        'lat': lat,
        'lon': lon,
        'units': 'metric',
        'appid': api_key
    }
    
    weather_response = requests.get(weather_url, params=weather_params)
    
    if weather_response.status_code == 200:
        return jsonify(weather_response.json())
    else:
        return jsonify({'error': 'Unable to fetch weather data'}), 404