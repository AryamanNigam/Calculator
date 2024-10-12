const sc = document.querySelector("#screen");
sc.innerText = "";

const numberButtons = document.querySelectorAll(".numbers");
const clear = document.getElementById("clear");
const operateButtons = document.querySelectorAll(".operations");
const back = document.getElementById("back");

back.addEventListener("click", e =>{
    sc.innerText = sc.innerText.slice(0, -1);
})

clear.addEventListener("click", e=> {
    sc.innerText = "";
})

numberButtons.forEach(button => {
    button.addEventListener('click', e =>{
        const number = e.target.innerText;
        sc.innerText += number;
    })
})


operateButtons.forEach(button => {
    button.addEventListener('click', e =>{
        let op = e.target.innerText;
        sc.innerText += op;
    } )
})


