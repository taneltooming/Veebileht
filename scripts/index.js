
const sliceCount = 6
const pizzaBases = []
const pizzaToppings = []

window.onload = function() {    
    drawPizza()
}


function randomRange(a, b) {
    return a + Math.random() * (b - a)
}


function drawPizza() {
    pitsaElement = document.getElementById("pitsa-animatsioon")

    for (let i = 0; i < 5; i++) {
        createBase(pitsaElement, i)
    }
    for (let i = 0; i < 5; i++) {
        createTopNotchToppings(pitsaElement, i)
    }
}


function createBase(pitsaElement, index) {
    const baseGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    drawBase(baseGroup, index)
    pitsaElement.appendChild(baseGroup)
    pizzaBases.push(baseGroup)
}


function drawBase(baseGroup, index) {
    const angle1 = index / sliceCount * 2 * Math.PI
    const angle2 = (index + 1) / sliceCount * 2 * Math.PI

    const pos1 = [50 + 50 * Math.sin(angle1), 50 + 50 * Math.cos(angle1)]
    const pos2 = [50 + 50 * Math.sin(angle2), 50 + 50 * Math.cos(angle2)]

    let pizzaCrustPath = `M ${pos1[0]} ${pos1[1]} `
    pizzaCrustPath += `A 50 50 0 0 0 ${pos2[0]} ${pos2[1]} `
    const pizzaSlicePath = pizzaCrustPath + "L 50 50 "

    const pizzaSliceElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pizzaSliceElement.setAttribute("d", pizzaSlicePath)
    pizzaSliceElement.setAttribute("fill", "#ff5500")
    pizzaSliceElement.setAttribute("stroke", "red")
    pizzaSliceElement.setAttribute("stroke-width", "0.4")
    baseGroup.appendChild(pizzaSliceElement)

    const pizzaCrustElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pizzaCrustElement.setAttribute("d", pizzaCrustPath)
    pizzaCrustElement.setAttribute("fill", "transparent")
    pizzaCrustElement.setAttribute("stroke", "#aa6622")
    pizzaCrustElement.setAttribute("stroke-width", "5")
    pizzaCrustElement.setAttribute("stroke-linecap", "round")
    baseGroup.appendChild(pizzaCrustElement)
}


function randomPosAtSlice(index) {
    const angle1 = index / sliceCount * 2 * Math.PI + 0.1
    const angle2 = (index + 1) / sliceCount * 2 * Math.PI - 0.1
    const angle = randomRange(angle1, angle2)

    const d = Math.sqrt(Math.random()) * 45

    x = 50 + d * Math.sin(angle)
    y = 50 + d * Math.cos(angle)
    
    return [x, y]
}

function addToppingAt(group, index, topping, angleInDegrees, distance) {
    const toppingGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")

    rotationAngle = - angleInDegrees - 360 / sliceCount * index
    const posAngle = angleInDegrees / 180 * Math.PI + index / sliceCount * 2 * Math.PI
    const x = 50 + distance * Math.sin(posAngle)
    const y = 50 + distance * Math.cos(posAngle)

    topping.setAttribute("transform", `translate(${x},${y}) rotate(${rotationAngle}) `)

    group.appendChild(toppingGroup)
    toppingGroup.appendChild(topping)
}

function createTopNotchToppings(pitsaElement, index) {
    const toppingsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    drawTopNotchToppings(toppingsGroup, index)
    pitsaElement.appendChild(toppingsGroup)
    pizzaToppings.push(toppingsGroup)
}


function drawTopNotchToppings(sliceDiv, index) {
    let topping = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    topping.setAttribute("x", -6)
    topping.setAttribute("y", -6)
    topping.setAttribute("width", 14)
    topping.setAttribute("height", 14)
    topping.setAttribute("fill", "#ffee33")
    topping.setAttribute("rx", 4)
    addToppingAt(sliceDiv, index, topping, randomRange(10, 20), randomRange(31, 36))

    topping = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    topping.setAttribute("x", -6)
    topping.setAttribute("y", -6)
    topping.setAttribute("width", 14)
    topping.setAttribute("height", 14)
    topping.setAttribute("fill", "#ffee33")
    topping.setAttribute("rx", 4)
    addToppingAt(sliceDiv, index, topping, randomRange(50, 50), randomRange(34, 39))

    topping = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    topping.setAttribute("x", -6)
    topping.setAttribute("y", -6)
    topping.setAttribute("width", 14)
    topping.setAttribute("height", 14)
    topping.setAttribute("fill", "#ffee33")
    topping.setAttribute("rx", 4)
    addToppingAt(sliceDiv, index, topping, randomRange(20, 40), randomRange(13, 20))
}