// Générer un chiffre en aléatoire
// L'utilisateur fera des propositions
// Continuer tant qu'il n'a pas la bonne proposition
import { Confetti } from "./lib/confetti.js"

let NumberToFind = 0;
const resultDiv = document.getElementById("resultDiv");
const reboursDiv = document.getElementById("CompteARebours");
const GamePropalDiv = document.getElementById("GamePropalDiv");
let TempsRestant = 0;
let compteurInterval = null;


document.getElementById("beginGame").addEventListener("click",function(){
    launchGame();
});

document.getElementById("CheckPropalButton").addEventListener("click",function(){
    checkPropal();
});

document.getElementById("userPropalInput")
    .addEventListener("keyup",function(event){
        if(event.key == 'Enter'){
            checkPropal();
        }
    });

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function checkPropal(){
    let numberPropal = document.getElementById("userPropalInput").value;
    if (NumberToFind > numberPropal){
        resultDiv.innerHTML = "c'est plus ! ";
        
    }
    else if (NumberToFind < numberPropal){
        resultDiv.innerHTML = "c'est moins ! ";
    }
    else if (NumberToFind == numberPropal){
        resultDiv.innerHTML = "c'est gagné ! ";
        Confetti.launchAnimationConfeti();
        let audio = new Audio("Son/Bip_bip.mp3");
        audio.play();
        endGame();
    } 
};


function launchGame(){

    // Lancer la partie
    // Récupérer un chiffre aléatoire 
    NumberToFind = getRandomInt(1000);
    TempsRestant = 30;
    GamePropalDiv.style.display = "block";
    if(compteurInterval!= null){
        clearInterval(compteurInterval);
    }
        compteurInterval = setInterval(()=> {
            reboursDiv.innerText = TempsRestant;
            TempsRestant--;

            if(TempsRestant >= 20){
                reboursDiv.classList.remove("warning");
                reboursDiv.classList.remove("danger");
                reboursDiv.classList.add("cool");
            }
            else if(TempsRestant > 10){
                reboursDiv.classList.remove("cool");
                reboursDiv.classList.remove("danger");
                reboursDiv.classList.add("warning");
            }
            else if(TempsRestant >= 0){
                reboursDiv.classList.remove("cool");
                reboursDiv.classList.remove("warning");
                reboursDiv.classList.add("danger");
            }
            else if (TempsRestant < 0){
                clearInterval(compteurInterval);
                //Partie terminée
                let audio = new Audio("Son/OSS117.mp3");
        audio.play();
                endGame(false);
            }
        }, 1000);
}

function endGame(gagne) {
    if(gagne){
        Confetti.launchAnimationConfeti();
        let audio = new Audio("Son/Bip_bip.mp3");
        audio.play();
        setTimeout(()=>{
            Confetti.stopAnimationConfeti();
        }, 5000);
    }
    else {
        
    }
    GamePropalDiv.style.display = "none";
    clearInterval(compteurInterval);
    setTimeout(()=>{
        Confetti.stopAnimationConfeti();
    }, 5000);
};