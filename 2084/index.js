var game={
	data:[],//存储所有单元格数据的二维数组
	RN:4, //总行数
	CN:4, //总列数
	score:0,//保存当前分数
	state:1,//保存游戏状态：运行中,游戏结束
	RUNNING:1,//运行中
	GAMEOVER:0,//游戏结束
	PLAYING:2,//动画播放中
	getGridHTML:function(){//获得所有背景格的html代码
		for(var r=0,arr=[];r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				arr.push(""+r+c);
			}
		}
		return '<div id="g'
			+arr.join('" class="grid"></div><div id="g')
			+'" class="grid"></div>';
	},
	getCellHTML:function(){//获得所有前景格的html代码
		for(var r=0,arr=[];r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				arr.push(""+r+c);
			}
		}
		return '<div id="c'
			+arr.join('" class="cell"></div><div id="c')
			+'" class="cell"></div>';
	},
	start:function(){
		var panel=document.getElementById("gridPanel");
		panel.innerHTML=
			 this.getGridHTML()+this.getCellHTML();
		//将panel的高度
		panel.style.height=this.RN*116+16+"px";
		//将panel的宽度
		panel.style.width=this.CN*116+16+"px";
		this.data=[];//清空旧数组
		for(var r=0;r<this.RN;r++){
			this.data.push([]);
			for(var c=0;c<this.CN;c++){
				this.data[r].push(0);
			}
		}
		this.score=0;//开始游戏时，分数重置为0
		this.state=this.RUNNING;//重置游戏状态为运行中
		document.getElementById("gameOver")
				.style.display="none";
		this.randomNum(); this.randomNum();
		this.updateView();
	},
	randomNum:function(){
		if(!this.isFull()){
		for(;;){
			var r=Math.floor(Math.random()*this.RN);
			var c=Math.floor(Math.random()*this.CN);
			if(this.data[r][c]==0){
				this.data[r][c]=Math.random()>0.5?4:2;
				break;
			}
		}
		}
	},
	isFull:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0){
					return false;
				}
			}
		}
		return true;
	},
	moveLeft:function(){//左移所有行
		var before=this.data.toString();
		for(var r=0;r<this.RN;r++){
			this.moveLeftInRow(r);
		}
		var after=this.data.toString();
		if(before!=after){
			animation.start();
		//randomNum和updateView，移至animation的move方法中
		}
	},
	moveLeftInRow:function(r){//左移一行,传入要移动的行号
		for(var c=0;c<this.CN-1;c++){
			var nextc=this.getNextInRow(r,c);

			if(nextc==-1){
				break;
			}else{
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[r][nextc];
					this.data[r][nextc]=0;
					var div=
					document.getElementById("c"+r+nextc);
					animation.addTask(div,r,nextc,r,c);
					c--;//保证下次依然检查当前元素	
				}else if(this.data[r][c]
						==this.data[r][nextc]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[r][nextc]=0;
					var div=
					document.getElementById("c"+r+nextc);
					animation.addTask(div,r,nextc,r,c);
				}
			}
		}
	},
	getNextInRow:function(r,c){//找r行c列位置之后，不为0的下一个位置
		for(var nextc=c+1;nextc<this.CN;nextc++){
			if(this.data[r][nextc]!=0){
				return nextc;
			}
		}
		return -1;
	},
	moveRight:function(){
		var before=this.data.toString();
		for(var r=0;r<this.RN;r++){
			this.moveRightInRow(r);
		}
		var after=this.data.toString();
		if(before!=after){
			animation.start();
		}
	},
	moveRightInRow:function(r){
		for(var c=this.CN-1;c>0;c--){
			var prevc=this.getPrevInRow(r,c);
			if(prevc==-1){
				break;  
			}else{
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[r][prevc];
					this.data[r][prevc]=0;
					var div=
					document.getElementById("c"+r+prevc);
					animation.addTask(div,r,prevc,r,c);
					c++;
				}else if(this.data[r][c]
					==this.data[r][prevc]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[r][prevc]=0;
					var div=
					document.getElementById("c"+r+prevc);
					animation.addTask(div,r,prevc,r,c);
				}
			}
		}
	},
	getPrevInRow:function(r,c){
		for(var prevc=c-1;prevc>=0;prevc--){
			if(this.data[r][prevc]!=0){
				return prevc;
			}
		}
		return -1;
	},
	moveUp:function(){//上移所有列
		var before=this.data.toString();
		for(var c=0;c<this.CN;c++){
			this.moveUpInCol(c);
		}
		var after=this.data.toString();
		if(before!=after){
			animation.start();
		}
	},
	moveUpInCol:function(c){
		for(var r=0;r<this.RN-1;r++){
			var nextr=this.getNextInCol(r,c);
			if(nextr==-1){
				break;
			}else{
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[nextr][c];
					this.data[nextr][c]=0;
					var div=
					document.getElementById("c"+nextr+c);
					animation.addTask(div,nextr,c,r,c);
					r--;
				}else if(this.data[r][c]
					==this.data[nextr][c]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[nextr][c]=0;
					var div=
					document.getElementById("c"+nextr+c);
					animation.addTask(div,nextr,c,r,c);
				}
			}
		}
	},
	getNextInCol:function(r,c){
		for(var nextr=r+1;nextr<this.RN;nextr++){
			if(this.data[nextr][c]!=0){
				return nextr;
			}
		}
		return -1;
	},
	moveDown:function(){
		var before=this.data.toString();
		for(var c=0;c<this.CN;c++){
			this.moveDownInCol(c);
		}
		var after=this.data.toString();
		if(before!=after){
			animation.start();
		}
	},
	moveDownInCol:function(c){
		for(var r=this.RN-1;r>0;r--){
			var prevr=this.getPrevInCol(r,c);
			if(prevr==-1){break;}
			else{
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[prevr][c];
					this.data[prevr][c]=0;
					var div=
					document.getElementById("c"+prevr+c);
					animation.addTask(div,prevr,c,r,c);
					r++
				}else if(this.data[r][c]
						==this.data[prevr][c]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[prevr][c]=0;
					var div=
					document.getElementById("c"+prevr+c);
					animation.addTask(div,prevr,c,r,c);
				}
			}
		}
	},
	getPrevInCol:function(r,c){
		for(var prevr=r-1;prevr>=0;prevr--){
			if(this.data[prevr][c]!=0){
				return prevr;
			}
		}
		return -1;
	},
	updateView:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
			    var divObj=document.getElementById("c"+r+c);
				if(this.data[r][c]==0){
					divObj.innerHTML="";
					divObj.className="cell";
				}else{
					divObj.innerHTML=this.data[r][c];
					divObj.className="cell n"+this.data[r][c];
				}
			}
		}
		var span=document.getElementById("score");
		span.innerHTML=this.score;
		if(this.isGameOver()){
			this.state=this.GAMEOVER;
			document.getElementById("finalScore")
				    .innerHTML=this.score;
			document.getElementById("gameOver")
				    .style.display="block";
		}
	},
	isGameOver:function(){//判断游戏的状态	
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0){
					return false;
				}else if(c<this.CN-1&&
					this.data[r][c]==this.data[r][c+1]){
					return false;
				}else if(r<this.RN-1&&
					this.data[r][c]==this.data[r+1][c]){
					return false;
				}
			}
		}
		return true;
	}
}
window.onload=function(){
	game.start();
	document.onkeydown=function(){
		if(game.state==game.RUNNING){
			var e=window.event||arguments[0];
			var code=e.keyCode;
			if(code==37){
				game.moveLeft();
			}else if(code==39){
				game.moveRight();
			}else if(code==38){
				game.moveUp();
			}else if(code==40){
				game.moveDown();
			}
		}
	}
}