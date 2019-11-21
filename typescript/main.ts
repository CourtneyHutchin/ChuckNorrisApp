
/**
 * Represents a single joke about
 * Chuck Norris from icndb.com
 */
class ChuckNorrisJoke {
    /**
     * The unique ID of the joke
     */
    id: number;
    /**
     * The text of the joke
     */
    joke: string;
    /**
     * The categories the joke falls under.
     * Some jokes are not categorized
     */
    categories: string[];
}

window.onload = function () {
    let jokeBtn = document.getElementById("get-joke");
    jokeBtn.onclick = fetchJoke;

    populateCategories();
}

function fetchJoke() {
    let jokeBtn = <HTMLButtonElement>this;
    jokeBtn.disabled = true;

    let loaderImg = document.getElementById("loader");
    loaderImg.classList.add("loader");

    let request = new XMLHttpRequest();
    request.onreadystatechange = handleJokeResponse;


    // Set URL to send request to
    request.open("GET", "https://api.icndb.com/jokes/random");
    // Initiate request
    request.send();
}

function handleJokeResponse() {
    let request = <XMLHttpRequest>this;


    // readyState 4 means reques is finished
    // status 200 means "OK" / success
    if (request.readyState == 4 && request.status == 200) {
        // Hold the JSON response from the server
        let responseData = JSON.parse(request.responseText);
        let myJoke = <ChuckNorrisJoke>responseData.value;
        displayJoke(myJoke);
        // alert(myJoke.joke);
        // console.log(myJoke);
    }
    else if (request.readyState == 4 && request.status != 200) {
        alert("Please try again later. Something wrong happened.");
    }
}

function displayJoke(j: ChuckNorrisJoke): void {
    let jokeTextPara = document.getElementById("joke-text");
    jokeTextPara.innerHTML = j.joke

    let jokeIdPar = document.getElementById("joke-id");
    jokeIdPar.innerHTML = "Id: " + j.id.toString();

    let categoryList = document.getElementById("categories");
    // Clear out categories from any previous joke
    categoryList.innerHTML = "";

    let allCategories = j.categories;
    allCategories.sort();
    for (let i = 0; i < allCategories.length; i++) {
        let item = document.createElement("li");
        item.innerHTML = allCategories[i];
        // Creating HTML - <li>Nerdy</li>
        categoryList.appendChild(item);
    }

    let catDisplay = document.getElementById("category-display");

    if (allCategories.length == 0) {
        catDisplay.style.display = "none";
    }
    else {
        catDisplay.style.display = "block";
    }

    let loaderImg = document.getElementById("loader");
    loaderImg.classList.remove("loader");

    // Re-enable joke button 2 seconds after it is displayed
    setTimeout(function () {
        let jokeBtn = <HTMLButtonElement>document.getElementById("get-joke");
        jokeBtn.disabled = false;
    }, 2000);
}


/**
 * Display categories in a dropdown list
 */
function populateCategories() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.icndb.com/categories");

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let categories: string[] = JSON.parse(this.responseText);
            console.log(categories);
        }
    }

    request.send();
}
