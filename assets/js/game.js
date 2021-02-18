    
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");



class Score {
 
score= 0

scoreDisplay(){
ctx.font="30px Comic Sans MS";
ctx.fillStyle = "White";
ctx.textAlign = "center";
ctx.fillText("Score :" +this.score, canvas.width/2, 50);

   }
}

class Ball {

x =canvas.width/2
 y =canvas.height-30

 ballRadius =20

  drawBall(){
ctx.beginPath();
ctx.arc(this.x, this.y,this.ballRadius , 0, Math.PI*2, false);
ctx.fillStyle = "black";
ctx.fill();
ctx.closePath();

}


}
class Player {
    
    paddleY = 0


    paddleHeight = 100
    paddleWidth = 20

    drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, this.paddleY, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

}
class PlayerAI {

    paddleAIY = 0

    drawAIPaddle(){
    ctx.beginPath();
    ctx.rect(980, this.paddleAIY, player.paddleWidth, player.paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
}
class LevelDisplay {

    level = 1

    levelDisplay(){

ctx.font="30px Comic Sans MS";
ctx.fillStyle = "White";
ctx.textAlign = "center";
ctx.fillText("Level :" + this.level,canvas.width/4, 50 );

   }
}

class DB {

    highscore =localStorage.getItem('Highscore')
    check(){
        if (this.highscore === null){
            this.highscore = 0
        }
    }

}
class Highscore {
    
highScoreDisplay(){
ctx.font="30px Comic Sans MS";
ctx.fillStyle = "White";
ctx.textAlign = "center";
ctx.fillText("Highscore :" + db.highscore, 850, 50);

   }
}
class game{



 dx = 2;
 dy = -2;
 speed =15;

 topPressed = false;
 bottomPressed = false;

 



 draw = this.draw.bind(this);
 keyDownHandler = this.keyDownHandler.bind(this);
 keyUpHandler = this.keyUpHandler.bind(this);
 

 
 startFun(){
    
    
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);

    
    
      
    var interval = setInterval(this.draw,this.speed);
    }






 keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        this.topPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        this.bottomPressed = true;
    }
}

 keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        this.topPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        this.bottomPressed = false;
    }
}


 
  
  
 draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    player.drawPaddle();
    playerAI.drawAIPaddle();
    score.scoreDisplay();
    highscore.highScoreDisplay();
    levelDisplay.levelDisplay();
    playerAI.paddleAIY = ball.y+this.dy-50;
    
    if(ball.x + this.dx > canvas.width- ball.ballRadius || ball.x + this.dx < ball.ballRadius) {
        this.dx = -this.dx;
    }else if(ball.x + this.dx - ball.ballRadius === 0) {
        if(ball.y > player.paddleY && ball.y < player.paddleY + player.paddleHeight) {
        this.dx = -this.dx;
        score.score +=1;
        
        if(score.score >=0 && score.score <=2){
            levelDisplay.level =1;

        }else if(score.score >=3 &&  score.score <=10){
            levelDisplay.level = 2;
            this.speed = 10

        }
        else if(score.score >=11 && score.score <=15){
            levelDisplay.level = 3;
            this.speed = 5

        }
        else if(score.score >=20){
            levelDisplay.level = 4;
            this.speed = 1


        }
        clearInterval(this.interval);
        this.interval = setInterval(this.draw,this.speed);
    }
    else {  
    if(score.score >= parseInt(db.highscore)){
        localStorage.setItem('Highscore',score.score);
    }
        alert("GAME OVER \n YOUR SCORE IS "+ score.score);
        document.location.reload();
        clearInterval(this.interval);

    }
}
    if(ball.y + this.dy > canvas.height-ball.ballRadius || ball.y + this.dy < ball.ballRadius) {
        this.dy = -this.dy;
    }

    if(this.topPressed) {
        player.paddleY += 4;
        if (player.paddleY + player.paddleHeight > canvas.height){
            player.paddleY = canvas.height - player.paddleHeight;
        }
    }
    else if(this.bottomPressed) {
        player.paddleY -= 4;
        if (player.paddleY < 0){
            player.paddleY = 0;
        }
    }
    
    ball.x += this.dx;
    ball.y += this.dy;
} 
    

}
let ball = new Ball()
let player = new Player()
let playerAI = new PlayerAI()
let db = new DB()
let highscore = new Highscore()

let score = new Score()
let levelDisplay = new LevelDisplay()


let g = new game();
g.startFun()








