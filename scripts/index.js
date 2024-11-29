
const sliceCount = 6
const pizzaBases = []
const pizzaToppings = []

const anglePerSecond = 6
let prevTime = 0

window.onload = function() {    
    drawPizza()
    requestAnimationFrame(animationFrame)
}

function animationFrame(currentTime) {
    deltaTime = (currentTime - prevTime) / 1000
    prevTime = currentTime

    pitsa = document.getElementById("pitsa-animatsioon")
    pitsa.style.transform = (`scale(1, 0.65) rotate(${currentTime}deg)`)

    console.log(deltaTime)

    requestAnimationFrame(animationFrame)
}

function drawPizza() {
    pitsaElement = document.getElementById("pitsa-animatsioon")

    for (let i = 0; i < 6; i++) {
        createBase(pitsaElement, i)
    }
    for (let i = 0; i < 6; i++) {
        createTopNotchToppings(pitsaElement, i)
    }
}

function createBase(pitsaElement, index) {
    const baseGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    drawBase(baseGroup, index)
    drawCrust(baseGroup, index)
    pitsaElement.appendChild(baseGroup)
    pizzaBases.push(baseGroup)
}

function createTopNotchToppings(pitsaElement, index) {
    const toppingsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    drawTopNotchToppings(toppingsGroup, index)
    pitsaElement.appendChild(toppingsGroup)
    pizzaToppings.push(toppingsGroup)

    toppingsGroup.id = "topping-" + index
    toppingsGroup.addEventListener("mouseover", (e) => {
        toppingsGroup.setAttribute("transform", "translate(0, -60)")
    })
    toppingsGroup.addEventListener("mouseout", (e) => {
        toppingsGroup.setAttribute("transform", "translate(0, 0)")
    })
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
    pizzaSliceElement.setAttribute("fill", "#ff2200")
    pizzaSliceElement.setAttribute("stroke", "red")
    pizzaSliceElement.setAttribute("stroke-width", "0.4")
    baseGroup.appendChild(pizzaSliceElement)
}

function drawCrust(baseGroup, index) {
    const crust = document.createElementNS("http://www.w3.org/2000/svg", "image")
    const size = 108
    crust.setAttribute("x", -size/2)
    crust.setAttribute("y", -size/2)
    crust.setAttribute("height", size)
    crust.setAttribute("width", size)
    crust.setAttribute("href", `assets/crust.svg`)
    addToppingAt(baseGroup, index, crust, -30, 0)
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

function addToppingAt(group, index, topping, angleInDegrees, distance, rotation) {
    rotationAngle = - angleInDegrees - 360 / sliceCount * index
    if (rotation) rotationAngle = rotation
    const posAngle = angleInDegrees / 180 * Math.PI + index / sliceCount * 2 * Math.PI
    const x = 50 + distance * Math.sin(posAngle)
    const y = 50 + distance * Math.cos(posAngle)

    topping.setAttribute("transform", `translate(${x},${y}) rotate(${rotationAngle}) `)

    group.appendChild(topping)
}

function drawCheese(sliceDiv, index, angle, distance) {
    const topping = document.createElementNS("http://www.w3.org/2000/svg", "image")
    topping.setAttribute("x", -10)
    topping.setAttribute("y", -10)
    topping.setAttribute("height", 20)
    topping.setAttribute("width", 20)
    topping.setAttribute("href", `assets/cheese${randomInt(2)}.svg`)

    addToppingAt(sliceDiv, index, topping, angle, distance)
}

function drawLeaf(sliceDiv, index, angle, distance) {
    const topping = document.createElementNS("http://www.w3.org/2000/svg", "image")
    size = randomRange(14, 9)
    topping.setAttribute("x", -size/2)
    topping.setAttribute("y", -size/2)
    topping.setAttribute("height", size)
    topping.setAttribute("width", size)
    topping.setAttribute("href", `assets/leaf.svg`)

    //const distance = Math.sqrt(Math.random(48)) * 48
    //const angle = 360 / sliceCount * Math.random()
    addToppingAt(sliceDiv, index, topping, angle, distance, randomRange(0, 360))
}

function drawTopNotchToppings(sliceDiv, index) {
    drawCheese(sliceDiv, index, randomRange(20, 40), randomRange(5, 20))
    drawCheese(sliceDiv, index, randomRange(20, 40), randomRange(20, 30))
    drawCheese(sliceDiv, index, randomRange(10, 20), randomRange(30, 35))
    drawCheese(sliceDiv, index, randomRange(40, 50), randomRange(36, 39))
    drawCheese(sliceDiv, index, randomRange(10, 20), randomRange(38, 42))

    drawLeaf(sliceDiv, index, randomRange(0, 30), randomRange(30, 35))
    drawLeaf(sliceDiv, index, randomRange(30, 60), randomRange(5, 45))
    drawLeaf(sliceDiv, index, randomRange(0, 60), randomRange(5, 45))
}

function randomRange(a, b) {
    return a + Math.random() * (b - a)
}

function randomInt(n) {
    return Math.floor(Math.random() * n)
}
