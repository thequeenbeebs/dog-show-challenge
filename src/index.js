document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()

    document.getElementById('dog-form').addEventListener('submit', (event) => {
        event.preventDefault()
        updateDog(event)
        fetchDogs()
    })
})

function fetchDogs() {
    document.getElementById('table-body').innerHTML = ""
    fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => renderDog(dog)))
}

function renderDog(dog) {
    let dogContainer = document.getElementById('table-body')
    
    let dogRow = document.createElement('tr')

    let name = document.createElement('td')
        name.innerText = dog.name

    let breed = document.createElement('td')
        breed.innerText = dog.breed

    let sex = document.createElement('td')
        sex.innerText = dog.sex

    let edit = document.createElement('td')
        edit.innerHTML = "<button>Edit Dog</button>"
        edit.addEventListener('click', () => editDog(dog))

    dogRow.append(name, breed, sex, edit)
    dogContainer.append(dogRow)
}

function editDog(dog) {
    document.querySelector('input[name="name"]').value = dog.name
    document.querySelector('input[name="breed"]').value = dog.breed
    document.querySelector('input[name="sex"]').value = dog.sex
    document.querySelector('input[name="dogId"]').value = dog.id
}

function updateDog(event) {
    let updatedDog = {
        name: event.target.name.value,
        breed: event.target.breed.value,
        sex: event.target.sex.value
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(updatedDog)
    }

    fetch(`http://localhost:3000/dogs/${event.target.dogId.value}`, reqPack)
        .then(resp => resp.json())
        .then(dog => {
            console.log(dog)
            fetchDogs()
        })
}