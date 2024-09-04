# WeatherApp raiseordie.tech

<p align="center">
<img src="/frontend/weatherApp-Reactjs/src/images/Screenshot.png" width="100%">
</p>

## Description
WeatherApp is a web application that provides weather information based on the user's current location or a searched city. The backend is built using Flask to serve a REST API, and the frontend is developed using React. Axios is used for making HTTP requests, Gunicorn serves the Flask application, and Nginx is used as a reverse proxy.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Installation
use requirements.txt when you clone the repo in order to get all dependancies.

### Prerequisites
- Python 3.x
- Node.js and npm
- Gunicorn
- Nginx

### Backend Setup (Flask)
1. Clone the repository:
    ```bash
    git clone https://github.com/Elhassouni/WeatherDashboard.git
    cd weatherapp
    ```

2. Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask server:
    ```bash
    flask run
    ```

### Frontend Setup (React)
1. Navigate to the frontend directory:
    ```bash
    cd frontend/weatherApp-Reactjs
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

### Deploying with Gunicorn and Nginx
1. Install Gunicorn:
    ```bash
    pip install gunicorn
    ```

2. Run the Flask app with Gunicorn:
    ```bash
    gunicorn -w 4 -b 127.0.0.1:8000 wsgi:app
    ```

3. Configure Nginx:
    - Open the Nginx configuration file:
        ```bash
        sudo nano /etc/nginx/sites-available/weatherapp
        ```

    - Add the following configuration:
        ```nginx
        server {
            listen 80;
            server_name raiseordie.tech;

            location / {
                proxy_pass http://127.0.0.1:8000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
            }

            location /static/ {
                alias /path/to/your/project/static/;
            }
        }
        ```

    - Enable the configuration and restart Nginx:
        ```bash
        sudo ln -s /etc/nginx/sites-available/weatherapp /etc/nginx/sites-enabled
        sudo systemctl restart nginx
        ```

## Usage
1. Open your web browser and navigate to `http://raiseordie.tech`.
2. You should see the WeatherApp homepage.
3. Use the search bar to find weather information for a specific city or allow location access to get weather information for your current location.

## Project Structure


## API Endpoints
- `GET /api/weather?city={city_name}`: Get weather information for a specific city.
- `GET /api/weather/current`: Get weather information for the current location.
