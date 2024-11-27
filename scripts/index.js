
let pitsaElement;

window.onload = function() {
    pitsaElement = document.getElementById("pitsa-animatsioon")
    console.log("test")
    drawPizza()
}


function drawPizza() {
    for (let i = 0; i < 6; i++) {
        drawSlice(i)
    }
}


function drawSlice(index) {
    const angle1 = index * 60 / 180 * Math.PI
    const angle2 = (index + 1) * 60 / 180 * Math.PI

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
    pitsaElement.appendChild(pizzaSliceElement)

    const pizzaCrustElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pizzaCrustElement.setAttribute("d", pizzaCrustPath)
    pizzaCrustElement.setAttribute("fill", "transparent")
    pizzaCrustElement.setAttribute("stroke", "#885522")
    pizzaCrustElement.setAttribute("stroke-width", "3")
    pizzaCrustElement.setAttribute("stroke-linecap", "round")
    pitsaElement.appendChild(pizzaCrustElement)
}