var game = {
	data:[],
	rN:4,
	cN:4,
	score:0,
	state:1,
	running:1,
	start:function(){
		var panel = document.getElementById('gridPanel');
		panel.innerHTML = this.getGridHtml()+this.getCellHtml();
		panel.style.width = this.cN*116+16+'px';
		panel.style.height = this.rN*116+16+'px';
		this.data = [];
		for (var i = 0; i < this.rN; i++) {
			this.data.push([]);
			for (var j = 0; j < this.cN; j++) {
				this.data[i].push(0)
			}
		}
		this.score = 0;
		this.state = this.running;
		document.getElementById('gameOver').style.display='none';
		this.randomNum();this.randomNum();
		this.updateView();				
	},
	updateView:function(){
		for (var i = 0; i < this.rN; i++) {
			for (var j = 0; j < this.cN; j++) {
				var divObj = document.getElementById('c'+i+j);
				if(this.data[i][j]==0){
					divObj.innerHTML = '';
					divObj.className = 'cell';
				}else{
					console.log(this.data[i][j])
					divObj.innerHTML = this.data[i][j];
					divObj.className = 'cell n'+ this.data[i][j];
				}
			}
		}
		var span = document.getElementById('score');
		span.innerHTML = this.score;
	},
	moveLeft:function(){
		for (var r = 0; r < rN; r++) {
			this.moveLeftInRow(r);	
		}
	},
	moveLeftInRow:function(r){
		
	},
	randomNum:function(){
		if(!this.isFull()){
			for(;;){
				var r = Math.floor(Math.random()*this.rN);
				var c = Math.floor(Math.random()*this.cN);
				if(this.data[r][c]==0){
					this.data[r][c] = Math.random()>0.5?4:2;
					console.log(this.data[r][c])
					break;
				}
			}
		}
	},
	isFull:function(){
		for (var i = 0; i < this.rN; i++) {
			for (var j = 0; j < this.cN; j++) {
				if(this.data[i][j]==0){
					return false;
				}
			}
		}
		return true;
	},
	getGridHtml:function(){
		for (var i = 0,arr=[]; i < this.rN; i++) {
			for (var j = 0; j <	this.cN; j++) {
				arr.push(''+i+j);
			}
		}
		return '<div id="g' 
				+arr.join('" class="grid"></div><div id="g')
				+'" class="grid"></div>';
	},
	getCellHtml:function(){
		for (var i = 0,arr=[]; i < this.rN; i++) {
			for (var j = 0; j < this.cN; j++) {
				arr.push(''+i+j);
			}
		}
		return '<div id="c'
		 	   +arr.join('" class="cell"></div><div id="c')
		 	   +'" class="cell"></div>';
	}
};
window.onload = function(){
	var r = game.start();
	document.onkeydown = function(){
		var ev = window.ev||arguments[0];
		switch(ev.keyCode){
			case 37:
				game.moveLeft();
			break;
		}
	};
};