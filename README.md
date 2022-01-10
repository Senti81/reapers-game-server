# rest-api-template

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
    "name": "Alice",
    "email": "alice@game.de",
    "password": "maus1234"
}
```
### Start new Game
```
POST localhost:3000/scores/start
```
### Show all tasks
```
GET localhost:3000/tasks
```

## USER
### Submit solution
```
POST localhost:3000/tasks/{day}
```
Example:
```
POST localhost:3000/tasks/1
{
    "player": "Alice",
    "solution": "A"
}
```
### Show points
```
GET localhost:3000/scores/
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