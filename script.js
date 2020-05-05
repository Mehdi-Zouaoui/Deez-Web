let deezerArray = [];
const localStorage = window.localStorage;


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
    let userInput = (document.getElementById('userInput').value).toLowerCase();
    return $.ajax({
        url: `https://api.deezer.com/search?q=${userInput}&output=jsonp`,
        dataType: "jsonp",
    }).then((result) => {
        console.log("Résultat :", result.data);
        result.data.forEach(song => {
            deezerArray.push(song);
            createAudio(song.preview);
        });

        console.log('Array' , deezerArray)
    });
}
function test() {
    let userInput = (document.getElementById('userInput').value).toLowerCase();
    console.log(userInput);
}
function createAudio(url){

    const audio = document.createElement('audio');
    audio.src = url;
    audio.classList.add("audioStyle");
    audio.controls = true;
    console.log(audio);
    document.body.appendChild(audio);
   $('#audioList').append(audio)

}

function pushDataInStorage(){
    console.log(`we're in`);
    searchUserInput().then(() => {
        deezerArray.forEach((item , index) => {
            localStorage.setItem(index , JSON.stringify(item));
        })
    })
}

function clearStorage () {
    localStorage.clear()
}

function getSingleItem(index){
    console.log(localStorage.getItem(index));
}
function addToFavorite() {
    
}
// getSingleItem('2');
