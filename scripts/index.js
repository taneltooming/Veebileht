/*
Selle JavaScripti faili kirjutas Kaur Huko Käämbre :D
*/

let pizzaElement
const pizzaFloatElements = []
const pizzaLinks = {
    2: {name: "RETSEPT", href: "retsept.html"},
    1: {name: "AJALUGU", href: "ajalugu.html"},
}

const sliceCount = 6
const flatness = 0.5
const rotateSpeed = 10
let prevAnimationTime = 0
let currentRotation = 0

window.onload = function() {
    pizzaElement = document.getElementById("pizza-animatsioon")

    createFloatLayers()
    drawPizza()
    requestAnimationFrame(animationFrame)
}

function animationFrame(currentAnimationTime) {
    deltaTime = (currentAnimationTime - prevAnimationTime) / 1000
    prevAnimationTime = currentAnimationTime

    currentRotation = currentRotation + rotateSpeed * deltaTime

    for (element of pizzaFloatElements.concat([pizzaElement])) {
        element.style.transform = (`scale(1, ${flatness}) rotate(${currentRotation}deg)`)
    }

    const sortedFloatElements = pizzaFloatElements.slice().sort((a, b) => {
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
        const pizzaFloatElement = pizzaElement.cloneNode(true)
        pizzaFloatElement.id = `pizza-float-${i}`
        pizzaElement.after(pizzaFloatElement)
        pizzaFloatElements.push(pizzaFloatElement)
    }
}

function drawPizza() {
    for (let i = 0; i < 6; i++) {
        createPizzaBase(i)
    }
    for (let i = 0; i < 6; i++) {
        createPizzaToppings(i)
    }
    for (let i = 0; i < 6; i++) {
        createPizzaCollider(i)
    }
}

function createPizzaCollider(index) {
    const colliderGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    colliderGroup.id = `collider-${index}`

    drawEventCollider(colliderGroup, index)

    pizzaElement.appendChild(colliderGroup)

    colliderGroup.addEventListener("mouseover", (e) => pizzaFloatAnimate(index))
    colliderGroup.addEventListener("mouseout", (e) => pizzaUnfloatAnimate(index))    
    colliderGroup.addEventListener("click", e => onPizzaSliceClick(colliderGroup, index))
}

function pizzaFloatAnimate(index) {
    const floatElement = pizzaFloatElements[index]
    floatElement.style.setProperty("--start-top", getComputedStyle(floatElement).top)
    floatElement.classList.remove("unfloating")
    floatElement.classList.add("floating")
}

function pizzaUnfloatAnimate(index) {
    const floatElement = pizzaFloatElements[index]
    floatElement.style.setProperty("--start-top", getComputedStyle(floatElement).top)
    floatElement.classList.remove("floating")
    floatElement.classList.add("unfloating")
}

function pizzaEatAnimate(index) {
    const floatElement = pizzaFloatElements[index]
    floatElement.style.setProperty("--start-top", getComputedStyle(floatElement).top)
    floatElement.classList.add("eating")

}

function onPizzaSliceClick(colliderGroup, index) {
    pizzaEatAnimate(index)

    colliderGroup.remove()

    const eatingSound = new Audio(`assets/sounds/Eat${randomInt(3)+1}.ogg`)
    eatingSound.play();
        
    if (pizzaLinks[index] !== undefined) {
        setTimeout(() => {
            const burpSound = new Audio(`assets/sounds/Burp.ogg`)
            burpSound.play()
        }, 80);
        
        setTimeout(() => window.location.href = pizzaLinks[index].href, 800);
    }
}

function createPizzaBase(index) {
    const baseGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    baseGroup.id = `base-${index}`

    drawBase(baseGroup, index)
    drawCrust(baseGroup, index)
    
    pizzaFloatElements[index].appendChild(baseGroup)
}

function createPizzaToppings(index) {
    const toppingsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    toppingsGroup.id = `toppings-${index}`

    drawPizzaToppings(toppingsGroup, index)

    pizzaFloatElements[index].appendChild(toppingsGroup)
}

function getSliceSvgPath(index) {
    const angle1 = index / sliceCount * 2 * Math.PI
    const angle2 = (index + 1) / sliceCount * 2 * Math.PI

    const pos1 = [50 + 50 * Math.sin(angle1), 50 + 50 * Math.cos(angle1)]
    const pos2 = [50 + 50 * Math.sin(angle2), 50 + 50 * Math.cos(angle2)]

    let pizzaCrustPath = `M ${pos1[0]} ${pos1[1]} `
    pizzaCrustPath += `A 50 50 0 0 0 ${pos2[0]} ${pos2[1]} `
    return pizzaCrustPath + "L 50 50 "
}

function drawEventCollider(colliderGroup, index) {
    const colliderPath = getSliceSvgPath(index)

    const pizzaColliderElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pizzaColliderElement.setAttribute("d", colliderPath)
    pizzaColliderElement.setAttribute("fill", "transparent")

    colliderGroup.appendChild(pizzaColliderElement)
}

function drawBase(baseGroup, index) {
    const pizzaSlicePath = getSliceSvgPath(index)

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
    size = randomRange(14, 7)
    topping.setAttribute("x", -size/2)
    topping.setAttribute("y", -size/2)
    topping.setAttribute("height", size)
    topping.setAttribute("width", size)
    topping.setAttribute("href", `assets/leaf${randomInt(2)}.svg`)

    addToppingAt(sliceDiv, index, topping, angle, distance, randomRange(0, 360))
}

function drawText(sliceDiv, index, stroke) {
    if (pizzaLinks[index] === undefined) return

    const topping = document.createElementNS("http://www.w3.org/2000/svg", "text")
    topping.innerHTML = pizzaLinks[index].name
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

function drawPizzaToppings(sliceDiv, index) {
    drawCheese(sliceDiv, index, randomRange(20, 40), randomRange(10, 20))
    drawCheese(sliceDiv, index, randomRange(10, 25), randomRange(22, 30))
    drawCheese(sliceDiv, index, randomRange(35, 50), randomRange(30, 36))
    drawCheese(sliceDiv, index, randomRange(9, 15), randomRange(34, 40))
    drawCheese(sliceDiv, index, randomRange(15, 45), randomRange(36, 41))
    drawCheese(sliceDiv, index, randomRange(45, 51), randomRange(38, 42))

    drawLeaf(sliceDiv, index, randomRange(3, 57), randomRange(5, 25))
    drawLeaf(sliceDiv, index, randomRange(3, 30), randomRange(25, 38))
    drawLeaf(sliceDiv, index, randomRange(30, 57), randomRange(25, 38))
    drawLeaf(sliceDiv, index, randomRange(3, 30), randomRange(38, 45))
    drawLeaf(sliceDiv, index, randomRange(30, 57), randomRange(38, 45))

    drawText(sliceDiv, index, true)
    drawText(sliceDiv, index, false)
}

function randomRange(a, b) {
    return a + Math.random() * (b - a)
}

function randomInt(n) {
    return Math.floor(Math.random() * n)
}
