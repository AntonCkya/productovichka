Крч Дима

Гайдлайн как запустить (пока что)

1) Запуск БД в корне проекта
```
docker-compose -f docker-compose.yaml up -d --remove-orphans
```

2) Запуск ML сервиса (из папки ml_model)
```
python main.py
```

4) Запуск миграций (из папки products)
```
alembic upgrade head
```

4) Запуск product сервиса (из папки products)
```
python main.py
```

На 8000 порту крутится product, на 8001 ml

Делаешь запрос на localhost:8000/docs там дока, дальше сам поймешь 

Если у тебя тоже 500 и asyncpg.exceptions.ConnectionDoesNotExistError: connection was closed in the middle of operation то плохо, набыдлокодил значит.