const score = document.querySelector('.score');
// const highScores = document.querySelector('.highScores');
const highScore = document.querySelector('.highScore')
const gameArea = document.querySelector('.gameArea');
const result = document.getElementById("result");
const dscore = document.querySelector('.dScore');
const container = document.querySelector('.container');



// var audio = new Audio('main.mp3');
// var audiol=new Audio('hornL.mp3');
// var audio2 = new Audio('crashman1.mp3');
// var audio3= new Audio('MouseClick1.mp3');

// window.onload = function()
// {
//     let scoreFromBrowser = localStorage.getItem('.highScore');
//     if (scoreFromBrowser != undefined) highScore = scoreFromBrowser;
//     document.querySelector('.highScore').innerHTML = "High Score: " + (player.highScore);
// }


function delay() {
    let loading = document.getElementById("loading");
    let startDiv = document.getElementById("start");
    let about = document.getElementById("about");
    let bg = document.getElementById("bg");
    let hScore = document.getElementById("hScore");

    bg.style.display = "block";
    loading.style.display = "none";
    startDiv.style.display = "block";
    hScore.style.display = "block";
    about.style.display = "block";     
}

function startGame() {    
    let startDiv = document.getElementById("start");
    let about = document.getElementById("about");
    let bg = document.getElementById("bg");
    let hScore = document.getElementById("hScore");
       
    bg.style.display = "none";
    startDiv.style.display = "none";
    hScore.style.display = "none";
    about.style.display = "none";
    gameArea.style.display = "block";
    result.style.display = "none";
    score.style.display = "block";
    start()    

}

function about() {
    let startDiv = document.getElementById("start");
    let about = document.getElementById("about");
    let bg = document.getElementById("bg");
    let hScore = document.getElementById("hScore");
    let aboutText = document.getElementById("aboutText")

    bg.style.display = "none";
    startDiv.style.display = "none";
    about.style.display = "none";
    hScore.style.display = "none";
    aboutText.style.display = "block";
    
}


function highS() {
    let startDiv = document.getElementById("start");
    let about = document.getElementById("about");
    let bg = document.getElementById("bg");
    let hScore = document.getElementById("hScore");
    let aboutText = document.getElementById("aboutText")

    bg.style.display = "none";
    startDiv.style.display = "none";
    about.style.display = "none";
    hScore.style.display = "none";
    // highScores.style.display = "block";
    score.style.display = "none";
    // highScore.style.display = "block";

    // highScores.innerText = 'High Score: ' + ( player.highScore);

}



function menu(){
    let startDiv = document.getElementById("start");
    let about = document.getElementById("about");
    let bg = document.getElementById("bg");
    let hScore = document.getElementById("hScore");
    let aboutText = document.getElementById("aboutText")

    bg.style.display = "block";
    startDiv.style.display = "block";
    about.style.display = "block";
    hScore.style.display = "block";
    result.style.display = "none";
    aboutText.style.display = "none";
    // highScores.style.display = "none";
    

}

function add(){
    let restart = document.getElementById("restart");
    let menu = document.getElementById("menu");
    let addDetails = document.getElementById("addDetails");

    restart.style.display = "none";
    menu.style.display = "none";
    addDetails.style.display = "none";
    container.style.display = "block";

}



let player = {
    speed: 5,
    score: 0,
    highScore: 0
    
};



let keys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}



function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })


}

function isCollid(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))

}

function endGame() {
    player.start = false;
    // audio.pause();
    // audio2.play();
    // audio2.volume=1;
   
    function stop(){
        // if( player.score>player.highScore){
        //     player.highScore=player.score;
        //     highScore.innerText = 'High Score: ' + ( player.highScore);
            
        //     }

    gameArea.style.display = "none";
    result.style.display = "block";
    dscore.innerHTML = 'Score: ' + player.score;
    score.style.display = "none";
    highScore.style.display = "block";
    // highScores.style.display = "none";
   }
    setTimeout(stop,1000);
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {

        if (isCollid(car, item)) {
            endGame();
        }
        if (item.y >= 750) {
            item.y = -500;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }


        item.y += player.speed;
        item.style.top = item.y + "px";
    })


}

function gamePlay() {
     
    // audio.play();
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    //console.log(road);
    if (player.start) {

        moveLines();
        moveEnemy(car);
        if (keys.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed;
            // audio3.play();
        }
        if (keys.ArrowDown && player.y < (road.bottom - 100)) {
            player.y += player.speed;
            //  audio3.play();

        }
        if (keys.ArrowLeft && player.x > 5) {
            player.x -= player.speed;
            //  audiol.play();
        }
        if (keys.ArrowRight && player.x < (road.width - 69)) {
            player.x += player.speed;
            //  audiol.play();
 
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerHTML = 'Score: ' +player.score;
    }
}

function random() {
    function c() {
        let hext = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hext)).substr(-2);
    }

    return "#" + c() + c() + c();
}

function start() {
    
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    
      
    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);

    } 

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText="i am a car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 5; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 2) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = random();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
       

        gameArea.appendChild(enemyCar);

    }
}

