#!/bin/bash
while true; do
    flask db upgrade
    if [[ "$?" == "0" ]]; then
        break
    fi
    echo "Comando Upgrade falhou, tentando novamente em 5 segundos..."
    sleep 5
done

echo "Comando Upgrade executado com sucesso."
echo "Executando scripts..."
python inserirUsuario.py

exec gunicorn --worker-class gevent --timeout 0 -b 0.0.0.0:5000 --access-logfile - --error-logfile - 'app:create_app()'