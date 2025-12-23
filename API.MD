```md
# API Documentation

## Base URL
```

[https://finstinctbackend1-e2atcehsfngmfcc2.eastus-01.azurewebsites.net](https://finstinctbackend1-e2atcehsfngmfcc2.eastus-01.azurewebsites.net)

````

---

## 1. Create Order
**POST** `/api/Order/addOrder`

### Request Body
```json
{
  "products": [
    {
      "productId": 0,
      "quantity": 0
    }
  ],
  "userId": 0
}
````

---

## 2. Get Order

**GET** `/api/Order/{id}`

---

## 3. Pay for Order

**POST** `/api/Order/order/{orderId}`

### Request Body

```json
{
  "userId": 0,
  "amount": 0,
  "successURL": "string",
  "cancelURL": "string"
}
```

---

## 4. Payment History

**GET** `/api/Payment/history/{userId}`

---

## 5. Get Orders

**GET** `/api/Order`

---

## 6. Make Payment

**POST** `/api/Payment`

### Request Body

```json
{
  "userId": 0,
  "amount": 0,
  "successURL": "string",
  "cancelURL": "string"
}
```

---

## 7. Get Products

**GET** `/api/Product`

---

## 8. Get Product

**GET** `/api/Product/getProduct/{id}`

---

## 9. Login

**POST** `/api/User/login`

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

---

## 10. Register

**POST** `/api/User/register`

### Request Body

```json
{
  "email": "user@example.com",
  "password": "string",
  "name": "string",
  "phone": "string"
}
```

---

## 11. Get Users

**GET** `/api/User`

### Response

```json
[
  {
    "id": 0,
    "email": "string",
    "name": "string",
    "phone": "string"
  }
]
```

```
```
