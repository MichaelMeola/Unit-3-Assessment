// 1. Import packages and files
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import handlerFunctions from './controller.js'

// 2. Setup my express instance
const app = express()

// 3. Setup Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.static(`client`))
app.use(session({
    secret: `shhhhhhhh`,
    saveUninitialized: true,
    resave: false
}))

// 4. Routes go here

const {allCharacters, oneCharacter, addCharacter, deleteCharacter} = handlerFunctions

app.get('/characters', allCharacters)

app.get(`/oneCharacter/:index`, oneCharacter)

app.post(`/character`, addCharacter)

app.delete(`/character/:id`, deleteCharacter)

// 5. Start up server with app.listen

app.listen(8000, () => console.log(`Server running on http://localhost:8000`))