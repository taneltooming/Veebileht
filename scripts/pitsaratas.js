const pizzaWheel = document.createElement('div');
pizzaWheel.id = 'pizzaWheel';
pizzaWheel.innerHTML = '🍕';
document.body.appendChild(pizzaWheel);

const style = document.createElement('style');
style.textContent = `
    #pizzaWheel {
        position: fixed;
        top: 10px;
        right: 10px;
        font-size: 50px;
        cursor: pointer;
        transition: transform 1s ease-in-out;
    }
`;
document.head.appendChild(style);

let isSpinning = false;

pizzaWheel.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    pizzaWheel.style.transform = 'rotate(720deg)';
    setTimeout(() => {
        pizzaWheel.style.transform = 'rotate(0deg)';
        isSpinning = false;
    }, 1000);
});