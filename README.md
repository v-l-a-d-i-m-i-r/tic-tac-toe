# tic-tac-toe

## Setup
```
cp example.env .env

docker-compose up --build
```

## Ports
- `27017` MongoDB
- `9000` Client
- `3000` Server (HTTP and WS)

## Volumes
- `.data` MongoDB

## Swagger documentation
[http://localhost:3000/swagger](http://localhost:3000/swagger)

## How to play
1. Open first browser [http://localhost:9000/](http://localhost:9000/)
2. Click `Sign Up` link
3. Complete registration for 1st player
4. After forwarding to `Games` page create new game clicking `Create New Game`
5. Click button with game ID
6. Open second browser [http://localhost:9000/](http://localhost:9000/)
7. Click `Sign Up` link
8. Complete registration for 2nd player
9. Click button with game ID

## What to improve?
1. Auth. For testing purposes implemented with one JWT token with no expiration. The better approach is using `access` and `refresh` tokens with proper expiration time.
2. Validation. For now, only server side validation is implemented. I think this is requred but not enough. Client side validation should be implemented as well.
3. Shared entities. For now, models just copied from server to client. The better approach is moving shared entities to separate npm package and then using for both client and server apps.
4. Error handling. A server-side error is logged to standard output and returned to the client. Client-side error is shown in toast (just a protorype, needs to be improved according to UX stadards).
