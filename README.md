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

###### Register

```GET /register```

| Path Params  | Type | Description |
| ------------- | ------------- | ------------- |
| email  | String  | email address of registering user  |
| password  | String  | password of registering user; later be hashed  |
| name  | String  | full name of registering user  |
