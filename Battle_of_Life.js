const canvas = document.getElementById("Battle_field");  
const context = canvas.getContext("2d");

var length = 10, size = 520, block_number=52;
canvas.width = size;
canvas.height = size;
	
// draw square
function draw_square(x,y,f){
    context.beginPath();
	if(f==1){
		context.fillStyle = "blue";
        context.fillRect( x*10, y*10, length, length);
	}else if(f==2){
        context.fillStyle = "red";
        context.fillRect( x*10, y*10, length, length);
    }else{
        context.strokeRect( x*10, y*10, length, length);
	    context.strokeStyle = "#7a7a7a";
    }
    context.closePath();
}
// set bacground
function set_background(){
    for(var i=1;i<block_number-1;i++){
	    for(var j=1;j<block_number-1;j++){
		    draw_square(i,j,0);
	    }	
    }	
}

// set individuals
var arr = [], next = [];

for (var i = 0; i < block_number; i++) {
    arr[i] = [];
    next[i] = [];
}
for (var i = 0; i < block_number; i++) {
    for (var j = 0; j < block_number; j++) {
        arr[i].push(0);
        next[i].push(0);
    }
}
//set pattern 在這裡設定初始圖案!!!
function set_table(table_name){
    var string="";
    for(var i=1;i<block_number-1;i++){
        for(var j=1;j<(block_number-1)/2;j++){
            string=string+'<input type="checkbox" style="width:10px ; height:10px; margin:0px" id="'+table_name+i+','+j+'">';
        }
        string=string+"<br>";
    }
    document.getElementById(table_name).innerHTML=string;
}
set_table("blue_table");
set_table("red_table");

function set_pattern(table_name){
    if(table_name=="blue_table"){
        for(var i=1;i<block_number-1;i++){
            for(var j=1;j<(block_number-1)/2;j++){
                if(document.getElementById(table_name+i+','+j).checked == true){
                    arr[j][i]=1;
                    
                }
            }
        }
    }
    if(table_name=="red_table"){
        for(var i=1;i<block_number-1;i++){
            for(var j=1;j<(block_number-1)/2;j++){
                if(document.getElementById(table_name+i+','+j).checked == true){
                    arr[j+(block_number-2)/2][i]=2;
                }
            }
        }
    }
}
// run the game with those rules
/*
官方規則:
每個細胞有三種狀態 - 存活、死亡或決鬥，每個細胞與以自身為中心的周圍八格細胞產生互動
當前細胞為存活狀態時，當周圍的存活細胞低於2個時（不包含2個），該細胞變成死亡狀態。（模擬生命數量稀少）
當前細胞為存活狀態時，當周圍有2個或3個存活細胞時，該細胞保持原樣。
當前細胞為存活狀態時，當周圍有超過3個存活細胞時，該細胞變成死亡狀態。（模擬生命數量過多）
當前細胞為死亡狀態時，當周圍有3個存活細胞時，該細胞變成存活狀態。（模擬繁殖）

決鬥規則:
當前細胞為存活狀態時，當周圍有3個存活細胞時，產生決鬥。
當敵方數量較多時，該細胞被敵方細胞取代。反之則存活。
*/
function rules(){
    for(var i=1;i<block_number-1;i++){
        for(var j=1;j<block_number-1;j++){
            var red_neighbors=0, blue_neighbors=0;
            //blue
            if(arr[i-1][j]==1){blue_neighbors++;}
            if(arr[i-1][j+1]==1){blue_neighbors++;}
            if(arr[i-1][j-1]==1){blue_neighbors++;}
            if(arr[i+1][j]==1){blue_neighbors++;}
            if(arr[i+1][j+1]==1){blue_neighbors++;}
            if(arr[i+1][j-1]==1){blue_neighbors++;}
            if(arr[i][j+1]==1){blue_neighbors++;}
            if(arr[i][j-1]==1){blue_neighbors++;}
            //red
            if(arr[i-1][j]==2){red_neighbors++;}
            if(arr[i-1][j+1]==2){red_neighbors++;}
            if(arr[i-1][j-1]==2){red_neighbors++;}
            if(arr[i+1][j]==2){red_neighbors++;}
            if(arr[i+1][j+1]==2){red_neighbors++;}
            if(arr[i+1][j-1]==2){red_neighbors++;}
            if(arr[i][j+1]==2){red_neighbors++;}
            if(arr[i][j-1]==2){red_neighbors++;}
            switch(blue_neighbors+red_neighbors){
                case 2:
                    if(arr[i][j]==1){
                        next[i][j]=1;
                    }
                    if(arr[i][j]==2){
                        next[i][j]=2;
                    }
                break;
                case 3:
                    if(blue_neighbors>red_neighbors){
                        next[i][j]=1;
                    }
                    else if(blue_neighbors<red_neighbors){
                        next[i][j]=2;
                    }
                break;
                default:
                    next[i][j]=0;  
                break;
            }
        }
    }
}
function display_result(){
    for(var i=0;i<block_number;i++){
        for(var j=0;j<block_number;j++){
            if(next[i][j]==1){
                draw_square(i,j,1);
                console.log("1");
            }
            if(next[i][j]==2){
                draw_square(i,j,2);
                console.log("2");
            }
        }
    }
}
function reset_pattern(){
    for(var i=0;i<block_number;i++){
        for(var j=0;j<block_number;j++){
            arr[i][j]=next[i][j];
            next[i][j]=0;
        }
    }
}
set_pattern();
set_background();
function run_the_game(){
    context.clearRect(0,0,size,size);
    set_background();
    rules();
    display_result();
    reset_pattern();
}
function clear_array(){
    for(var i=0;i<block_number;i++){
        for(var j=0;j<block_number;j++){
            arr[i][j]=0;
            next[i][j]=0;
        }
    }
}
//clear checkbox
var clear=document.getElementById("clearbox");
clear.addEventListener("click",function clearbox(){
    for(var i=1;i<block_number-1;i++){
        for(var j=1;j<(block_number-1)/2;j++){
            document.getElementById("red_table"+i+","+j).checked = false;
            document.getElementById("blue_table"+i+","+j).checked = false;
        }
    }
})
// start gaming
var x=document.getElementById("play");
var running; 
x.addEventListener("click",
    function play(){
        if(x.value=="Play"){
            set_background();
            set_pattern("red_table");
            set_pattern("blue_table");
            x.value="Restart";
            running = setInterval(run_the_game, 120/document.getElementById("speed").value*10);
        }else{
            clearInterval(running);
            clear_array();
            set_pattern("red_table");
            set_pattern("blue_table");
            running = setInterval(run_the_game, 120/document.getElementById("speed").value*10);
        }
    })