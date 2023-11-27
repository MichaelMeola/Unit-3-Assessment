// importing the characters from the json file
import characters from './db.json' assert {type: 'json'}

let globalId = 4

//These are all of my functions that will be imported to use on my index.js
const handlerFunctions = {

    allCharacters: (req, res) => {
        res.send(characters)
    },

    oneCharacter: (req, res) => {
        res.send(characters[req.params.index])
    },

    addCharacter: (req, res) => {
        const {characterName, characterPic} = req.body

        let newObj = {
            id: globalId,
            name: characterName,
            picture: characterPic,
            votes: 0 
        }

        characters.push(newObj)

        globalId++

        res.send(characters)
    },

    deleteCharacter: (req,res) => {
        for(let i=0; i<characters.length; i++){
            if (characters[i].id === +req.params.id){
                characters.splice(i,1)
                break
            }
        }
        res.send(characters)
    }

}

export default handlerFunctions