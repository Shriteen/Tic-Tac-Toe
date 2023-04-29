const cells=document.querySelectorAll('#grid>button');
const restart=document.querySelector('#restart');
const rows=[document.querySelectorAll('.r0'),document.querySelectorAll('.r1'),document.querySelectorAll('.r2')];
const columns=[document.querySelectorAll('.c0'),document.querySelectorAll('.c1'),document.querySelectorAll('.c2')];
const diagonals=[document.querySelectorAll('.dp'),document.querySelectorAll('.ds')];
const prompt=document.querySelector('#prompt');
const player1=document.querySelector('#p1name');
const player2=document.querySelector('#p2name');

let turn;

function reset(){
	turn=0;
	for(let i=0;i<cells.length;i++){
		cells[i].textContent=' ';
		cells[i].addEventListener('click',play);
	}
	draw();
}

function draw(){
	prompt.textContent='Turn of ' + ( (turn%2) ? player2.value : player1.value );
}

function isWinner(){
	let won=false;
	for(let i=0;i<rows.length;i++){
		if((rows[0][i].textContent==='X' || rows[0][i].textContent==='O') && 
			(rows[0][i].textContent===rows[1][i].textContent && rows[0][i].textContent===rows[2][i].textContent))
				won=true;
	}
	for(let i=0;i<columns.length;i++){
		if((columns[0][i].textContent==='X' || columns[0][i].textContent==='O') &&
			(columns[0][i].textContent===columns[1][i].textContent && columns[0][i].textContent===columns[2][i].textContent))
				won=true;
	}
	for(let i=0;i<diagonals.length;i++){
		if((diagonals[i][0].textContent==='X' || diagonals[i][0].textContent==='O') && 
			(diagonals[i][0].textContent===diagonals[i][1].textContent && diagonals[i][0].textContent===diagonals[i][2].textContent))
				won=true;
	}
	
	if(won){
		prompt.textContent=( (turn%2) ? player2.value : player1.value ) + ' Wins the game!!!';
		for(let i=0;i<cells.length;i++){
			cells[i].removeEventListener('click',play);
		}
	}
	
	return won;
}

function play()
{
	if(turn%2==0){
		this.textContent='X';
	}else{
		this.textContent='O';
	}
	this.removeEventListener('click',play);
	
	if(!isWinner()){
		turn++;
		if(turn>=9){
			prompt.textContent='Game Draw';
		}else{
			draw();
		}
	}	
}
restart.addEventListener('click',reset);
player1.addEventListener('change',draw);
player2.addEventListener('change',draw);

reset();
draw();
