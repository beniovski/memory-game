const game = { 
    
     block : 20,
     blockInRow : 5,
     moves : 0,
     selectedBlock : null,
     selectedBlockTab : [],
     shuffleBlock : [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9],
     gameBoardElement : null ,
     
    startButton : function() {
        const button = document.querySelector('.game-start');
        button.addEventListener('click',this.startGame);
        
    },
    
    startGame : function() {
      /*  this.moves = 0;
        this.selectedBlock = 0;[]
        this.selectedBlockTab = [];      
        this.shuffle;   
        this.renderBlock; */
        
         window.location.reload();
    },
     
    shuffle : function() {
       
        let counter = this.shuffleBlock.length;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);           
            counter--;
            // And swap the last element with it
            let temp = this.shuffleBlock[counter];
            this.shuffleBlock[counter] = this.shuffleBlock[index];
            this.shuffleBlock[index] = temp;
        }
    },  
    
    renderBlock : function() {
        this.startButton();
        this.gameBoardElement = document.querySelector('.game-board');        
        for(let i=0; i<this.shuffleBlock.length; i++)
        {
            const oneBlock = document.createElement('div');
            oneBlock.classList.add('game-tile');
            oneBlock.value = this.shuffleBlock[i];   
            oneBlock.style.left = 10+(110*(i%this.blockInRow))+ 'px';
            oneBlock.style.top = 10+(110*(Math.floor(i/this.blockInRow)))+ 'px';            
            oneBlock.addEventListener("click",this.blockClick.bind(this));            
            this.gameBoardElement.appendChild(oneBlock);      
        }        
    }, 
    
    blockClick : function(block) {       
       
        const pictureValue = block.target.value;
        
        if(this.selectedBlockTab.length===0) {
            this.selectedBlock = pictureValue; 
            block.target.style.background = "url('images/"+pictureValue+".jpg')";    
            block.target.classList.add('pointerDisabling');
            this.selectedBlockTab.push(block);             
        }  
        
        else if(this.selectedBlock !== pictureValue&&this.selectedBlockTab.length<2) {
            this.selectedBlock = pictureValue;    
            block.target.style.background = "url('images/"+pictureValue+".jpg')";    
            block.target.classList.add('posnterDisabling');
            this.selectedBlockTab.push(block);    
            setTimeout(this.blockReset.bind(this),1000); 
            this.moves ++;
                
        }
        else if(this.selectedBlock === pictureValue&&this.selectedBlockTab.length<2) {
            block.target.style.background = "url('images/"+pictureValue+".jpg')";
            block.target.classList.add('pointerDisabling');
            this.selectedBlockTab.push(block);
            setTimeout(this.blockHit.bind(this),500); 
            this.moves ++;
        }  
        this.updateGameScore();
    },  
    
    updateGameScore : function() {
        
        const element = document.querySelector('.game-score');
        element.innerHTML = this.moves;
        
    },
    
    blockReset : function() {      
        
        this.selectedBlockTab.forEach(function(element){
            element.target.style.background = "";  
            element.target.classList.remove('pointerDisabling');
        });      
        this.selectedBlockTab = [];
        this.selectedBlock = null;
    },
    
    blockHit : function() {
       this.selectedBlockTab.forEach(function(element){
            element.target.remove();
        });      
        this.selectedBlockTab = [];
        this.selectedBlock = null; 
    }


};
game.startButton();
game.shuffle();
game.renderBlock();


