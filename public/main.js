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

function guessFlip(guess) {
    fetch('http://localhost:5000/app/flip/call')
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        console.log(result);

        document.getElementById("guessImage").setAttribute("src","../assets/img/"+result.call+".png")
        document.getElementById("resultImage").setAttribute("src" = "./assets/img/"+result.call+".png")
        document.getElementById("guessResult")
    }) 
}
// // Event listener for whatever is being clicked 
// document.addEventListener("click", activeNow);
// // Replace text in anything with "active" id
//        function activeNow() {
//            const active_now = document.activeElement
//            document.getElementById("active").innerHTML = active_now;
//            console.log(active_now)
//        }
// // Button coin flip element
//         const coin = document.getElementById("coin")
// // Add event listener for coin button
//   coin.addEventListener("click", flipCoin)
//   function flipCoin() {
//             fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
//       .then(function(response) {
//         return response.json();
//       })
//     .then(function(result) {
//       console.log(result);
//       document.getElementById("result").innerHTML = result.flip;
//       document.getElementById("quarter").setAttribute("src", result.flip+".jpg");
//       coin.disabled = true
//           })
//     let flip = "FLIPPED"
//     document.getElementById("coin").innerHTML = flip;
//     console.log("Coin has been flipped. Result: "+ flip)
//       }
// Flip multiple coins and show coin images in table as well as summary results
// Our flip many coins form

// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
