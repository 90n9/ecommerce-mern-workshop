## Create server on docker compose

`docker-compose up`

## URL client

`http://localhost:3000`


## URL api

`http://localhost:8000`

## Create Seed Data

```
POST: http//localhost:8000/products/seed
data:{
  "amount": 10
}
```

## RUN Cypress for integration test

run in folder ./cypress-automation

```
#run this command to install dependencies
> npm install

#run this command to run cypress
> npm run cypress:open
```

then select order_spec in integration folder