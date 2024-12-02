const imageItalo = document.querySelector('#italypng');
const textContainerIta = document.getElementById('italytekst');
const imageUsa = document.querySelector('#usapng');
const textContainerUsa = document.getElementById('usatekst');


function startVibration() {
    textContainerIta.classList.add("vibrate");
    setTimeout(() => {
        textContainerIta.classList.remove("vibrate");
    }, 1000);
    textContainerUsa.classList.add("vibrate");
    setTimeout(() => {
        textContainerUsa.classList.remove("vibrate");
    }, 1000);
}


let vibrationInterval = setInterval(startVibration, 5000);


imageItalo.addEventListener('mouseover', () => {
    clearInterval(vibrationInterval);
    const newText = "Margherita pitsa sai oma nime legendi järgi 1889. aastal, kui Itaalia kuninganna Margherita Savoyst külastas Napoli linna. Kohalik pitsameister Raffaele Esposito kutsuti tegema kuningannale midagi erilist. Talle pakuti mitmeid pitsasid, kuid eriti paelus teda üks, millel olid kolme Itaalia lipu värvi koostisosad: punased tomatid, valge mozzarella ja rohelised basiilikulehed. See pitsakate sai nimeks Pizza Margherita kuninganna auks. Kuigi tänapäeval pole täielikult kinnitatud, kas see lugu täpselt nii aset leidis, sai see pitsa ikkagi Itaalia rahvusliku identiteedi sümboliks.";
    textContainerIta.textContent = newText;

});

imageItalo.addEventListener('mouseout', () => {
    textContainerIta.textContent = 'Liigu hiirega lipu peale, et lugeda ajaloo kohta...';
    vibrationInterval = setInterval(startVibration, 5000);
});

imageUsa.addEventListener('mouseover', () => {
    clearInterval(vibrationInterval);
    const newTextUsa = 'Kui Euroopas on see pizza tuntud Margherita pizza nime all, siis Põhja-Ameerikas on ta ka tuntud kui "plain pizza". Nagu nimigi ütleb on tegemist niiöelda tühja või lihtsa pitsaga, mis viitab, et pitsa peal on ainult tomatikaste ja juust.';
    textContainerUsa.textContent = newTextUsa;
});

imageUsa.addEventListener('mouseout', () => {
    textContainerUsa.textContent = 'Liigu hiirega lipu peale, et lugeda ajaloo kohta...';
    vibrationInterval = setInterval(startVibration, 5000);
});

