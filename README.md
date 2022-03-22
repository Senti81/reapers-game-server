# reapers-game-server

## Project setup
```
npm install
```

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