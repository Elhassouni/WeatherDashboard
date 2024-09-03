import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY') or 'your-openweather-api-key'