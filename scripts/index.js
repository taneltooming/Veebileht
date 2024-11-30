
let pitsaElement
const pitsaFloatElements = []
const pitsaLinks = {
    2: {name: "RETSEPT", href: "retsept.html"},
    1: {name: "AJALUGU", href: "ajalugu2.html"},
}

const eatingAudio = [
    new Audio("assets/sounds/Eat1.ogg"),
    new Audio("assets/sounds/Eat2.ogg"),
    new Audio("assets/sounds/Eat3.ogg"),
    new Audio("assets/sounds/Burp.ogg"),
]

const sliceCount = 6
const flatness = 0.5
const anglePerSecond = 10
let prevTime = 0
let currentRotation = 0

window.onload = function() {
    pitsaElement = document.getElementById("pitsa-animatsioon")

    audioPreload()
    createFloatLayers()
    drawPizza()
    requestAnimationFrame(animationFrame)
}

function audioPreload() {
    for (audio of eatingAudio) {
        audio.volume = 0
        audio.play()
        audio.pause()
        audio.volume = 1
    }
}

function animationFrame(currentTime) {
    deltaTime = (currentTime - prevTime) / 1000
    prevTime = currentTime

    currentRotation = currentRotation + anglePerSecond * deltaTime

    for (element of pitsaFloatElements.concat([pitsaElement])) {
        element.style.transform = (`scale(1, ${flatness}) rotate(${currentRotation}deg)`)
    }

    const sortedFloatElements = pitsaFloatElements.slice().sort((a, b) => {
        let aTop = getComputedStyle(a).top
        let bTop = getComputedStyle(b).top
        return bTop.substring(0, bTop.length - 2) - aTop.substring(0, aTop.length - 2)
    })

    for (i in sortedFloatElements) {
        sortedFloatElements[i].style.zIndex = i + 1
    }

    requestAnimationFrame(animationFrame)
}

function createFloatLayers() {
    for (let i = 0; i < sliceCount; i++) {
        const pitsaFloatElement = pitsaElement.cloneNode(true)
        pitsaFloatElement.id = `pitsa-float-${i}`
        pitsaElement.after(pitsaFloatElement)
        pitsaFloatElements.push(pitsaFloatElement)
    }
}

function drawPizza() {
    for (let i = 0; i < 6; i++) {
        createBase(i)
    }
    for (let i = 0; i < 6; i++) {
        createTopNotchToppings(i)
    }
    for (let i = 0; i < 6; i++) {
        createCollider(i)
    }
}

function createCollider(index) {
    const colliderGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    colliderGroup.id = `collider-${index}`

    drawCollider(colliderGroup, index)

    pitsaElement.appendChild(colliderGroup)

    colliderGroup.addEventListener("mouseover", (e) => {
        const floatElement = pitsaFloatElements[index]
        floatElement.style.setProperty("--start-top", getComputedStyle(floatElement).top)
        floatElement.classList.remove("unfloating")
        floatElement.classList.add("floating")
    })
    
    colliderGroup.addEventListener("mouseout", (e) => {
        const floatElement = pitsaFloatElements[index]
        floatElement.style.setProperty("--start-top", getComputedStyle(floatElement).top)
        floatElement.classList.remove("floating")
        floatElement.classList.add("unfloating")
    })
    
    colliderGroup.addEventListener("click", e => {
        const floatElement = pitsaFloatElements[index]
        floatElement.style.setProperty("--start-top", getComputedStyle(floatElement).top)
        floatElement.classList.add("eating")

        colliderGroup.remove()

        setTimeout(() => {
            const soundIndex = randomInt(3)
            eatingAudio[soundIndex].play();
            eatingAudio[soundIndex] = new Audio(eatingAudio[soundIndex].src)
            
            if (pitsaLinks[index] !== undefined) {
                setTimeout(() => eatingAudio[3].play(), 80);
                setTimeout(() => window.location.href = pitsaLinks[index].href, 400);
            }
        }, 400);
    })
}

function createBase(index) {
    const baseGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    baseGroup.id = `base-${index}`

    drawBase(baseGroup, index)
    drawCrust(baseGroup, index)
    
    pitsaFloatElements[index].appendChild(baseGroup)
}

function createTopNotchToppings(index) {
    const toppingsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    toppingsGroup.id = `toppings-${index}`

    drawTopNotchToppings(toppingsGroup, index)

    pitsaFloatElements[index].appendChild(toppingsGroup)
}

function getSlicePath(index) {
    const angle1 = index / sliceCount * 2 * Math.PI
    const angle2 = (index + 1) / sliceCount * 2 * Math.PI

    const pos1 = [50 + 50 * Math.sin(angle1), 50 + 50 * Math.cos(angle1)]
    const pos2 = [50 + 50 * Math.sin(angle2), 50 + 50 * Math.cos(angle2)]

    let pizzaCrustPath = `M ${pos1[0]} ${pos1[1]} `
    pizzaCrustPath += `A 50 50 0 0 0 ${pos2[0]} ${pos2[1]} `
    return pizzaCrustPath + "L 50 50 "
}

function drawCollider(colliderGroup, index) {
    const colliderPath = getSlicePath(index)

    const pizzaColliderElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pizzaColliderElement.setAttribute("d", colliderPath)
    pizzaColliderElement.setAttribute("fill", "transparent")

    colliderGroup.appendChild(pizzaColliderElement)
}

function drawBase(baseGroup, index) {
    const pizzaSlicePath = getSlicePath(index)

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

function drawText(sliceDiv, index, stroke) {
    if (pitsaLinks[index] === undefined) return

    const topping = document.createElementNS("http://www.w3.org/2000/svg", "text")
    topping.innerHTML = pitsaLinks[index].name
    topping.classList.add("topping-text")

    topping.setAttribute("x", "11%")
    topping.setAttribute("y", "3%")
    topping.setAttribute("font-size", "68%")
    if (stroke) {
        topping.setAttribute("stroke", "#ffeeaa")
        topping.setAttribute("stroke-width", 1.5)
    }

    addToppingAt(sliceDiv, index, topping, -60, 0, 0)
}

function drawTopNotchToppings(sliceDiv, index) {
    drawCheese(sliceDiv, index, randomRange(20, 40), randomRange(10, 20))
    drawCheese(sliceDiv, index, randomRange(20, 40), randomRange(20, 30))
    drawCheese(sliceDiv, index, randomRange(10, 20), randomRange(30, 35))
    drawCheese(sliceDiv, index, randomRange(40, 50), randomRange(36, 39))
    drawCheese(sliceDiv, index, randomRange(10, 20), randomRange(38, 42))

    drawLeaf(sliceDiv, index, randomRange(0, 30), randomRange(30, 35))
    drawLeaf(sliceDiv, index, randomRange(30, 60), randomRange(5, 45))
    drawLeaf(sliceDiv, index, randomRange(0, 60), randomRange(5, 45))

    drawText(sliceDiv, index, true)
    drawText(sliceDiv, index, false)
}

function randomRange(a, b) {
    return a + Math.random() * (b - a)
}

function randomInt(n) {
    return Math.floor(Math.random() * n)
}
