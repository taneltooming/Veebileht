
const sliceCount = 6

window.onload = function() {    
    drawPizza()
}


function drawPizza() {
    pitsaElement = document.getElementById("pitsa-animatsioon")

    for (let i = 0; i < 5; i++) {
        drawSlice(pitsaElement, i)
    }
}


function drawSlice(pitsaElement, index) {
    const sliceDiv = document.createElementNS("http://www.w3.org/2000/svg", "g")
    drawBase(sliceDiv, index)
    pitsaElement.appendChild(sliceDiv)
}


function drawBase(sliceDiv, index) {
    const angle1 = index / sliceCount * 2 * Math.PI
    const angle2 = (index + 1) / sliceCount * 2 * Math.PI

    const pos1 = [50 + 50 * Math.sin(angle1), 50 + 50 * Math.cos(angle1)]
    const pos2 = [50 + 50 * Math.sin(angle2), 50 + 50 * Math.cos(angle2)]

    let pizzaCrustPath = `M ${pos1[0]} ${pos1[1]} `
    pizzaCrustPath += `A 50 50 0 0 0 ${pos2[0]} ${pos2[1]} `
    const pizzaSlicePath = pizzaCrustPath + "L 50 50 "

    const pizzaSliceElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pizzaSliceElement.setAttribute("d", pizzaSlicePath)
    pizzaSliceElement.setAttribute("fill", "yellow")
    pizzaSliceElement.setAttribute("stroke", "yellow")
    pizzaSliceElement.setAttribute("stroke-width", "0.4")
    sliceDiv.appendChild(pizzaSliceElement)

    const pizzaCrustElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pizzaCrustElement.setAttribute("d", pizzaCrustPath)
    pizzaCrustElement.setAttribute("fill", "transparent")
    pizzaCrustElement.setAttribute("stroke", "#885522")
    pizzaCrustElement.setAttribute("stroke-width", "3")
    pizzaCrustElement.setAttribute("stroke-linecap", "round")
    sliceDiv.appendChild(pizzaCrustElement)
}


function findRandomSpot(index) {
    const angle1 = index / sliceCount * 2 * Math.PI
    const angle2 = (index + 1) / sliceCount * 2 * Math.PI
    const angle = min + Math.random() * (max - min)

    const d = Math.sqrt(Math.random()) * 45

    
}


function drawTopNotchToppings(slicediv, index) {

}