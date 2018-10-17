# RabbitMQ in docker-compose

## Setup
This setup assumes you already have docker-compose and docker (using docker toolbox) installed.

```
cd rabbitmq-compose
docker-compose up
```

## Play
Open [http://localhost:15672/](http://localhost:15672) (or what ever IP you get when you run `docker-machine ip`)

and use the login

```
username: rabbitmq
password: rabbitmq
```

## License
MIT License
