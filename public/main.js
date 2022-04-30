// Focus div based on nav button click
function detectButton(strName) {
    var active = Array.from(document.getElementsByClassName("active")) // get collection of active divs
    active.forEach(function (currentdiv) {
        currentdiv.setAttribute("class", "hidden");
    })

    document.getElementById(strName).setAttribute("class", "active")
}
// Flip one coin and show coin image to match result when button clicked

// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
