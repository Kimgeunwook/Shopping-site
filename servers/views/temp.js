let minusbutton = document.getElementById("minus");
let plusbutton = document.getElementById("plus");

minusbutton.addEventListener('click', () => {
    let quantityInput = document.getElementById("quantitiyInput");
    quantityInput.value = parseInt(quantityInput.value) -1;
    if(quantityInput.value <= 0) 
    {
        quantityInput.value = 1;
    }
})
plusbutton.addEventListener('click', () => {
    let quantityInput = document.getElementById("quantitiyInput");
    quantityInput.value = parseInt(quantityInput.value) + 1;
})