Запускаем из корня

Здесь название образа dima/client, 0.0.11 версия(тег)
```shell
docker build -f ./kube/DockerfileClient -t dima/client:0.0.11 .
```

```shell
docker build -f ./kube/DockerFileBackApi -t dima/product:0.0.11 .
```

```shell
docker build -f ./kube/DockerfileBackML -t dima/ml:0.0.3 .
```

### Развернуть все на докере
```shell
docker-compose -f ./docker-compose.yaml up -d  
```

## ВАЖНО: внутри есть сеть, поэтому все localhost должны быть вида psql.productovichka-main_app_network . Где первое это название контейнера из dockerCompose, а второе созданная сеть

Не забываем в .env клиента прописать http://api.productovichka_app_network:8000
