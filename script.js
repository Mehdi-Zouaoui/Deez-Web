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


function pushDataInStorage(){
    getDataFromApi().then(() => {
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
pushDataInStorage();
getSingleItem('2');
