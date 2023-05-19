let kittens = []

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "happy",
    affection: 8
  }
  let index = kittens.find(kitten => kitten.name == form.name.value)
  if (index || kitten.name == "") {
    document.getElementById("name").placeholder="Use a different Name"
  } else {
    kittens.push(kitten)
    document.getElementById("name").placeholder="Name"
    saveKittens()
  }
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to local storage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from local storage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
    <div class="card p-2 text-center w-30 m-1 m-1">
      <div class="kitten ${kitten.mood}">
        <img src="moody-logo.png" height="150" alt="Moody Kittens">
      </div>
      <div class="mt-2">
        <b class="text-center">${kitten.name}</b>
        <p>
          <span>Mood: ${kitten.mood}</span>
          <br>
          <span>Affections: ${kitten.affection}</span>
        </p>
        <button onclick="pet('${kitten.id}')">Pet</button>
        <button onclick="catnip('${kitten.id}')">Feed Catnip</button>
        <br>
        <i class="action fa fa-trash text-danger" onclick="clearKittens('${kitten.id}')"></i>
      </div>
      </div>
    `
  })
  kittenListElement.innerHTML = kittensTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1) {
    throw new Error("invalid Kitten Id")
  }
  return index
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = kittens[findKittenById(id)]
  let randNum = Math.random()
  if (randNum > .5 && kitten.affection < 10) {
    kitten.affection++
  } else if (kitten.affection > 0) {
    kitten.affection--
  }
  setKittenMood(kitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  findKittenById(id)
  let kitten = kittens[findKittenById(id)]
  kitten.affection = 5
  setKittenMood(kitten)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 7) {
    kitten.mood = "happy"
  } else if (kitten.affection >= 4) {
    kitten.mood = "tolerant"
  } else if (kitten.affection >= 1) {
    kitten.mood = "angry"
  } else {
    kitten.mood = "gone"
  }
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id){
  kittens.splice(findKittenById(id), 1)
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
drawKittens();