# reapers-game-server

## Project setup
```
npm install
```

## Create .env
```
PORT=3000
DB_HOST=mongodb://127.0.0.1:27017/reapers-game 
JWT_SECRET= ... 
SUBMISSION_START=12
SUBMISSION_END=17

### Compiles and hot-reloads for development
```
npm run dev
```

# Routes

## ADMIN
### Register Player
```
POST localhost:3000/users/
```
Example:
```
{
    "username": "player1",
    "password": "maus1234"
}
```
### Start new Game
```
POST localhost:3000/scores/start
```
# Misc

### Create a Heroku remote
```
heroku apps:create <name>
```

### Deploying code
```
git push heroku master
```

### Misc
```
heroku logs -t
heroku apps:info
```
