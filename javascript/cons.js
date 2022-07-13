var console_toggle = false;
var console_img = document.getElementById('consoleapp');
var console_app = document.getElementById('console_top');
var console_exit = document.getElementById('console_header_exit');
var conosle_text = document.getElementById('console_text');

// Console image
console_img.addEventListener('click', function(){
    if(console_toggle==false){
        //on
        console_app.style.visibility = "visible";
        console_toggle=true;
    }else{
        console_toggle=false;
        //off
        console_app.style.visibility = "hidden";
    }
});


// Exit button on console app
console_exit.addEventListener('click',function(){
    if(console_toggle==false){
        //on
        console_app.style.visibility = "visible";
        console_toggle=true;
    }else{
        console_toggle=false;
        //off
        console_app.style.visibility = "hidden";
        console.log('ran')
    }
});

conosle_text.addEventListener('keypress', (e) => {
    if(e.key=="Enter"){
        nextLine(console_text.value);
    }
});

function nextLine(oldtext){
    // conosle_text.remove();
    var oldline = document.createElement('div');
    oldline.className = "console_reply";
    oldline.innerHTML = oldtext;
    document.getElementById('console_top').append(newline);
    console.log(oldline.innerHTML);

    var newline = document.createElement('input');
    newline.id="console_text";
    newline.type="text";
    newline.value="C:\\Users\\You>";
    document.getElementById('console_top').append(newline);
    conosle_text = newline;
}