// Focus div based on nav button click
function detectButton(strName) {
    var active = Array.from(document.getElementsByClassName("active")) // get collection of active divs
    active.forEach(function (currentdiv) {
        currentdiv.setAttribute("class", "hidden");
    })

    document.getElementById(strName).setAttribute("class", "active")
}
// Flip one coin and show coin image to match result when button clicked
function singleFlip() {
    const singleCoin = document.getElementById("single")
    singleCoin.addEventListener("click", flipCoin)
    function flipCoin() {
        const url = document.baseURI+"/app/flip/"
        fetch(url, {mode: 'cors'}).then(function(response) {
            return response.json();
        })
        .then(function(something) {
            console.log(something)
            document.getElementById("result").innerHTML=something.flip
            document.getElementById("quarter").setAttribute("src", "../assets/img"+something.flip+".png")
            singleCoin.disbled = true
        })
    }
}

function flipCoins() {
    fetch('http://localhost:5000/app/flip/coins', {mode: 'post'})
    .then(function(response) {
        return response.json
    }).then(function(result) {
        console.log(result)

        document.getElementById("headsResult").innerHTML = result.heads
        document.getElementById("tailsResult").innerHTML = result.tails

        document.getElementById("result").innerHTML = result.flip
        document.getElementById("quarter").setAttribute("src", "../assets/img/" + result.flip +".png")

        for (var i=0; i< result.raw.length; i++) {
            var coin = document.createElement("img")
            coin.setAttribute("src", "../assets/img/" + result.raw[i] + ".png")
            coin.setAttribute("class", "smallcoin")
        }
    })
}


// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
