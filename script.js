let deezerArray = [];
const localStorage = window.localStorage;
let localStorageKey = localStorage.length;

function getDataFromApi() {
    return $.ajax({
        url: `https://api.deezer.com/search?q=eminem&output=jsonp`,
        dataType: "jsonp",
    }).then((result) => {
        console.log("Résultat :", result.data);
        result.data.forEach(song => {
            deezerArray.push(song);

        });

    });
}

function searchUserInput() {
    const searchOption = $("#searchOptions").val();
    let userInput = (document.getElementById('userInput').value).toLowerCase();
    console.log(`https://api.deezer.com/search?q=${userInput}&order=${searchOption}&output=jsonp`);

    return $.ajax({
        url: `https://api.deezer.com/search?q=${userInput}&order=${searchOption}&output=jsonp`,
        dataType: "jsonp",
    }).then((result) => {
        if (result.data.length) {
            console.log("Résultat :", result.data);
            result.data.forEach((song, index) => {
                deezerArray.push(song);
                createAudio(index, song, 'audioList');
            });
        } else {
            $('body').append('<div id="test">Pas de résultat pour la recherche , veuillez réessayer</div>');
        }
        console.log('Array', deezerArray)
    }).catch(err => {
        console.log(err);
        $('body').append('<div id="test">Test</div>');
    });
}

function test() {
    let userInput = (document.getElementById('userInput').value).toLowerCase();
    console.log(userInput);
}

function createAudio(index, deezerItem, divName) {
    const audioDiv = document.createElement('div');
    audioDiv.id = `audio_${index}`;
    audioDiv.classList.add("card", "audio", "col-3", "mr-3");
    const audioImg = document.createElement('img');
    audioImg.src = deezerItem.album.cover_big;
    audioImg.classList.add("card-img-top");
    const audioTitle = document.createElement('h5');
    const title = document.createTextNode(deezerItem.title);
    audioTitle.appendChild(title);
    audioTitle.classList.add("card-title");
    const audioAlbum = document.createElement('p');
    const album = document.createTextNode(deezerItem.album.title);
    audioAlbum.appendChild(album);
    audioAlbum.classList.add("card-text");
    const audio = document.createElement('audio');
    audio.src = deezerItem.preview;
    audio.classList.add("audioStyle");
    audio.controls = true;
    const favButton = document.createElement('button');
    favButton.classList.add("btn", "btn-info");
    favButton.innerHTML = "Ajouter aux favoris";
    favButton.onclick = function () {
        addToFavorite(localStorageKey, deezerItem);
        localStorageKey += 1;
    };
    $(`#${divName}`).append(audioDiv);
    document.getElementById(`audio_${index}`).append(audioImg, audioTitle, audioAlbum, audio, favButton);
}

function pushDataInStorage() {
    console.log(`we're in`);
    searchUserInput().then(() => {
        deezerArray.forEach((item, index) => {
            localStorage.setItem(index, JSON.stringify(item));
        })
    })
}

function clearStorage() {
    localStorage.clear()
}

function getSingleItem(index) {
    console.log(localStorage.getItem(index));
}

function addToFavorite(index, item) {
    localStorage.setItem(index, JSON.stringify(item));
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}
function getFavListe(){
    const favList = {...localStorage};
    Object.keys(favList).map(function(key, index){
        createAudio(index,JSON.parse(favList[key]),'favList');
    })

}
function getRandomFav() {
    const randomFav = localStorage.getItem(Math.floor(Math.random() * ((localStorage.length - 1))));
    console.log(JSON.parse(randomFav));
    createAudio('0', JSON.parse(randomFav), 'audioRandom');
}

// getSingleItem('2');
function randomGenerator() {

}
