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


----
Все что выше про docker, docker compose

Для сети в kube используется service. Поэтому url такой же как и сам сервис. К примеру postgres-service:5432

Как проверить под
kubectl port-forward api-deployment-c84fff7fb-64mvd 8000:8000


Для loadBalancer нужен ingress.
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.2.0/aio/deploy/recommended.yaml