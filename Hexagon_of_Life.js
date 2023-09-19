const canvas = document.getElementById("canvas_Hex");  
const context = canvas.getContext("2d");
context.beginPath();
context.lineWidth = 2;
var length = 6, vertices = 6, size = 600, block_number=50;
canvas.width = size;
canvas.height = size;
	
// 畫六角形 x,y,z->position f->fill
function draw_hexagon(x,y,f,color){
	function getDegree(vertices) {
		return 360 / vertices * (i + 0.5) + 90;
	}

	function getRadian(degree) {
	    return degree * Math.PI / 180;
	};
    context.beginPath();
    for (var i = 0; i <= vertices; i++) {
    	// 計算偏轉
    	var degree = getDegree(vertices, i),
    		radian = getRadian(degree);
       if(x%2==0){
			move=length*Math.tan(Math.PI/3)/2;
		}else{
			move=0;
		} 
		var position_x = Math.cos(radian)*length + size/2 + x*length*1.5;
		var move
		
        var position_y = Math.sin(radian)*length + size/2 - y*length*Math.tan(Math.PI/3) +move;
        context.lineTo(position_x, position_y);
    }
	context.fillStyle = color;
	context.strokeStyle = color;
	if(f==1){
		context.fill();
	}
    
    context.stroke();
    context.closePath();
}
// set bacground
for(var i=0;i<50;i++){
	for(var j=0;j<50;j++){
		draw_hexagon(i-25,j-25,0,"#7a7a7a");
	}	
}	
// set individuals
var arr = [];

for (var i = 0; i < block_number; i++) {
    arr[i] = [];
}
for (var i = 0; i < block_number; i++) {
    for (var j = 0; j < block_number; j++) {
        arr[i].push(0);
    }
}
