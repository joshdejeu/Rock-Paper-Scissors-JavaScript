var btn_play = document.getElementById('btnplay');
var game_active = false;
var user_object;

// Menu text and gradients
var dark_gradient = document.getElementById('dark');
var title = document.getElementById('gameTitle');
var desc = document.getElementById('gameDesc');
var images = document.getElementById('user_choice');

// Graph 
var uRock = 50;
var uPaper = 50;
var uScissors = 50;


btn_play.addEventListener('click',function(){
    if(user_object!=undefined){
        // do code here
    }else{
        errorSelect();
        return;
    }

    if(game_active==true){
        game_active=false;
    }
    else{
        startGame();
    }
});

function startGame(){
    // spawns objects and make menu disappear
    game_active=true;
    btn_play.style.visibility = 'hidden';
    title.style.visibility='hidden';
    desc.style.visibility='hidden';
    images.style.visibility='hidden';
    // spawnRock(uRock);
    // spawnPaper(uPaper);
    // spawnScissors(uScissors);
    spawnRock(uRock);
    spawnPaper(uPaper);
    spawnScissors(uScissors);
    // r.style.visibility='hidden';
    // p.style.visibility='hidden';
    // s.style.visibility='hidden';
    countDown();
    updateGraph(uRock, uPaper, uScissors);
}

function countDown(){
    var count = document.createElement('div');
    count.id = "countDown";
    document.body.append(count);
    countDownText(count);
}

function countDownText(cnt){
    //makes function run first time without the delay
    var counter = 3;
    cnt.innerHTML=counter;
    var myInterval = setInterval(function(){
        counter--;
        cnt.innerHTML=counter;
        if(counter==0){clearInterval(myInterval);cnt.style.visibility='hidden';}
    },1000);
}

function spawnRock(amt){
    for(i=0; i<amt; i++){
        var rock = document.createElement('img');
        rock.id = "rock"+i;
        rock.className="rock";
        document.body.append(rock);
        var pageWidth = document.body.scrollWidth;
        var pageHeight = document.body.scrollHeight;
        var randomWidth = Math.floor(Math.random() * pageWidth);
        var randomHeight = Math.floor(Math.random() * pageHeight);
        rock.style.top = randomHeight;
        rock.style.left = randomWidth;
        rock.src = "images/rock.png";
        rock.addEventListener('mouseenter',(e) => {collision(rock,e)});
        setInterval(moveAround,1500,rock)
    }
}

function spawnPaper(amt){
       for(i=0; i<amt; i++){
        var paper = document.createElement('img');
        paper.id = "paper"+i;
        paper.className="paper";
        document.body.append(paper);
        var pageWidth = document.body.scrollWidth;
        var pageHeight = document.body.scrollHeight;
        var randomWidth = Math.floor(Math.random() * pageWidth);
        var randomHeight = Math.floor(Math.random() * pageHeight);
        paper.style.top = randomHeight;
        paper.style.left = randomWidth;
        paper.src = "images/paper.png";
        // paper.innerHTML=`${randomHeight}, ${randomWidth}`;
        paper.addEventListener('mouseenter',(e) => {collision(paper,e);});
        setInterval(moveAround,2000,paper)
    } 
}

function spawnScissors(amt){
    for(i=0; i<amt; i++){
        var scissors = document.createElement('img');
        scissors.id = "scissors"+i;
        scissors.className="scissors";
        document.body.append(scissors);
        var pageWidth = document.body.scrollWidth;
        var pageHeight = document.body.scrollHeight;
        var randomWidth = Math.floor(Math.random() * pageWidth);
        var randomHeight = Math.floor(Math.random() * pageHeight);
        scissors.style.top = randomHeight;
        scissors.style.left = randomWidth;
        scissors.src = "images/scissors.png";
        // scissors.innerHTML=`${randomHeight}, ${randomWidth}`;
        scissors.addEventListener('mouseenter',(e) => {collision(scissors,e)});
        setInterval(moveAround,3000,scissors)
    }
}

function collision(collided,e){
    // Changes images of objects on collision
    var col = e.path[0]; //from event get the layers of elements
    var id = col.id.replace(/[0-9]/g, ''); //strip the numeric id from the end of the string
    var nc = document.getElementById('newCursor');

    if(user_object=="rock"&&id=="scissors"){col.src="images/rock.png";col.className="rock";uRock++;uScissors--;}
    if(user_object=="rock"&&id=="paper"){nc.src="images/paper.png";user_object="paper";}
    
    if(user_object=="paper"&&id=="rock"){col.src="images/paper.png";col.className="paper";uPaper++;uRock--;}
    if(user_object=="paper"&&id=="scissors"){nc.src="images/scissors.png";user_object="scissors";}
    
    if(user_object=="scissors"&&id=="paper"){col.src="images/scissors.png";col.className="scissors";uScissors++;uPaper--;}
    if(user_object=="scissors"&&id=="rock"){nc.src="images/rock.png";user_object="rock";}

    updateGraph(uRock, uPaper, uScissors);
}
function errorSelect(){
    alert("You must select an object to play as before running the game.")
}

var new_cursor = document.getElementById('newCursor');
function selected(obj){
    // update the page cursor to be what the user clicked
    user_object=obj.id.replace("select_",'');;
    document.body.style.cursor = 'none';
    new_cursor.src = obj.src;
}

document.addEventListener('mousemove', function(e) {
    let left = e.clientX;
    let top = e.clientY;
    new_cursor.style.left = left+ 'px';
    new_cursor.style.top = top+ 'px';
});

function moveAround(obj){
    updateGraph(uRock, uPaper, uScissors);
    var pgWid = document.body.scrollWidth;
    var pgHei = document.body.scrollHeight;
    var ranWid = Math.floor(Math.random() * pgWid);
    var ranHei = Math.floor(Math.random() * pgHei);
    obj.style.left = ranWid;
    obj.style.top = ranHei;
}



window.addEventListener('load',function(){
    updateGraph(uRock, uPaper, uScissors);
    var ico = 1;
    setInterval(function(){
        if(ico==1){
            document.getElementById('favicon').setAttribute("href", "images/rock.png");
            document.getElementById('title').innerHTML="Rock";
            ico=2;
        }
        else if(ico==2){
            document.getElementById('favicon').setAttribute("href", "images/paper.png");
            document.getElementById('title').innerHTML="Paper";
            ico=3;
        }
        else{
            document.getElementById('favicon').setAttribute("href", "images/scissors.png");
            document.getElementById('title').innerHTML="Scissors";
            ico=1;
        }
    }, 500);
});

function updateGraph(r,p,s){
    // Updates grapph colors
    var gRock = document.getElementById('graph_rock');
    var gPaper = document.getElementById('graph_paper');
    var gScissors = document.getElementById('graph_scissors');
    if(r==0){gRock.innerHTML="";}else{gRock.innerHTML=r;}
    if(p==0){gPaper.innerHTML="";}else{gPaper.innerHTML=p;}
    if(s==0){gScissors.innerHTML="";}else{gScissors.innerHTML=s;}
    gRock.style.height = r*300;
    gPaper.style.height = p*300;
    gScissors.style.height = s*300;
}

function removeRock(){
    const rocks = document.querySelectorAll('.rock');
    rocks.forEach(rock => {
        rock.remove();
    });
    uRock=0;
}
function removePaper(){
    const papers = document.querySelectorAll('.paper');
    papers.forEach(paper => {
        paper.remove();
    });
    uPaper=0;
}
function removeScissors(){
    const scissors = document.querySelectorAll('.scissors');
    scissors.forEach(scissor => {
        scissor.remove();
    });
    uScissors=0;
}