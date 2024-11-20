
let pitsaElement;

window.onload = function() {
    pitsaElement = document.getElementById("pitsa-animatsioon")
    console.log("test")
    drawPizza()
}


function drawPizza() {

    let pizzaCrustPath = "M 50 0 "
    pizzaCrustPath += "A 50 50 0 0 1 100 50 "
    const pizzaSlicePath = pizzaCrustPath + "L 50 50 "

    const pizzaSliceElement = document.createElement("path")
    pizzaSliceElement.setAttribute("d", pizzaCrustPath)
    pizzaSliceElement.setAttribute("fill", "#ffee00")
    pitsaElement.appendChild(pizzaSliceElement)

    const pizzaCrustElement = document.createElement("path")
    pizzaCrustElement.setAttribute("d", pizzaSlicePath)
    pizzaCrustElement.setAttribute("fill", "transparent")
    pizzaCrustElement.setAttribute("stroke", "#882200")
    pizzaCrustElement.setAttribute("fill-width", "2")
    pizzaCrustElement.setAttribute("stroke-linecap", "round")
    pitsaElement.appendChild(pizzaCrustElement)
}