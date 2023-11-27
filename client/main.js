console.log(`JS is connected!`)

const baseUrl = `http://localhost:8000`

const characterDisplay = document.querySelector(`#characterDisplay`)
const characterForm = document.querySelector(`form`)


const createCharacterCard = (characterObject) => {
    const newCharacterCard = document.createElement(`section`)

    newCharacterCard.innerHTML = `
        <img src=${characterObject.picture} alt='character picture'/>
        <p>${characterObject.name}</p>

        <section>
            <button>-</button>
            Popularity: ${characterObject.votes}
            <button>+</button>
        </section>

        <br/>
        <br/>
        
        <button onclick="deleteCharacter(${characterObject.id})" >Delete Me</button>
        
        <br/>
        <br/>
        `

    characterDisplay.appendChild(newCharacterCard)
}

const displayAllCharacters = (arr) => {
    for(let i=0; i<arr.length; i++){
        createCharacterCard(arr[i])
    }
}

const getAllCharacters = () => {
    axios.get(`${baseUrl}/characters`)
        .then((response) => {
            displayAllCharacters(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const handleSubmit = (e) => {
    e.preventDefault()

    characterDisplay.innerHTML= ``

    let characterName = document.querySelector(`#characterName`)
    let characterPicture = document.querySelector(`#characterPicture`)


    let bodyObj = {
        characterName: characterName.value,
        characterPic: characterPicture.value
    }

    axios.post(`${baseUrl}/character`, bodyObj)
        .then((response) => {
            displayAllCharacters(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteCharacter = (id) => {

    axios.delete(`${baseUrl}/character/${id}`)
        .then((res) => {
            characterDisplay.innerHTML = ``
            displayAllCharacters(res.data)
        })
}

characterForm.addEventListener(`submit`, handleSubmit)

getAllCharacters()