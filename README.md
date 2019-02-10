# Parkzone Backend

## Getting Started
1. clone repository ```git clone https://github.com/jasonhjkim/parkzone-backend```
2. change directory ```cd ./parkzone-bacend```
3. download dependencies ```npm instal``
4. start server by ```node app.js```

### Dependencies
- express
- morgan
- passport
- passport-local
- passport-jwt
- jwt-simple
- bcryp-nodejs
- cors
- body-parser

## API

#### Register

```GET /register```

| Path Params  | Type | Description |
| ------------- | ------------- | ------------- |
| email  | String  | email address of registering user  |
| password  | String  | password of registering user; later be hashed  |
| name  | String  | full name of registering user  |

:white_check_mark: **200: OK**
```json
{
  "__v": 0,
  "_id": "5c5f69849b7b60d3b5bb50a4",
  "email": "test@gmail.com",
  "password": "$2a$10$HLYb679noopIJa1GLpA5meOxntTBbZVUnW/KIA.xOaZwL5YVH8zpi",
  "name": "Test Test",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzVmNjk4NDliN2I2MGQzYjViYjUwYTQiLCJpYXQiOjE1NDk3NTc2Njk5NjV9.ko4oJ_3rrqNcMD90Kyy_ZiAZo4ROkCLPveEUeuOjK60"

 }
```
:red_circle: **404: Not Found**
```json
{
  "err": "some error message"
}
```
