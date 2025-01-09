# Productovichka back
Есть 2 основные версии API - v2 и v3. Отличаются они лишь методом общения между сервисами: v2 общаются по REST, v3 общается через Kafka.

Клиент общается с сервером через Product service

# Ручки:
| Метод  | Ручка                |  Описание                             |
| :----: | -------------------: | ------------------------------------: |
|  POST  | /add                 | Добавление нового товара              |
|  GET   | /product             | Получение списка продуктов по запросу |
| DELETE | /delete/{product_id} | Удаление товара по его id             |

## /add:

_Method URL:_ `/add`

_HTTP Method:_ **[POST]**

#### Request Body

| Name          |  Type  | Required |
| ------------- | :----: | -------: |
| `name`        | String |      Yes |
| `description` | String |      Yes |
| `price`       | Float  |      Yes |
| `type`        | String |      Yes |

## /product:

_Method URL:_ `/product`

_HTTP Method:_ **[GET]**

#### Query Params

| Name     |  Type  | Required |
| -------- | :----: | -------: |
| `query`  | String |       No |
| `limit`  | Int    |       No |
| `offset` | Int    |       No |

#### Response
```json
[
  {
  "id": Int
  "name": String
  "description": String
  "price":Float
  "type": String
  "score": Float
  },
]
```
## /delete/{product_id}:

_Method URL:_ `/delete/{product_id}`

_HTTP Method:_ **[DELETE]**

#### Path Params

| Name          |  Type  | Required |
| ------------- | :----: | -------: |
| `product_id`  | Int    |      Yes |
