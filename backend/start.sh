#!/bin/bash
source venv/bin/activate
exec gunicorn -w 4 -b 127.0.0.1:8000 wsgi:app
