FROM python:3.9-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends wget && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /backend-app
COPY . /backend-app

RUN pip install --no-cache-dir -r requirements.txt &&\
    chmod a+x boot.sh

EXPOSE 5000
CMD ["./boot.sh"]
