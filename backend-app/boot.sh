#!/bin/bash

exec gunicorn --worker-class gevent --timeout 0 -b 0.0.0.0:5000 --access-logfile - --error-logfile - 'app:create_app()'
