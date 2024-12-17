FROM python:3.10-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY docker_init.sh ./docker_init.sh
RUN chmod +x /usr/src/app/docker_init.sh

EXPOSE 8000

ENTRYPOINT ["/bin/sh", "/usr/src/app/docker_init.sh"]

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]