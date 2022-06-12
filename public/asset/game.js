//Pick Choices
class Choices{
  constructor(playerChoice){
    this.playerChoice = playerChoice;
    this.comChoice = this.drawComChoices();
  }
  drawComChoices(){
    const comChoices = ['rock', 'paper', 'scissors']
    const random = Math.floor(Math.random() * 3);
    return comChoices[random];
  }
  getPlayerChoice(){
    return this.playerChoice
  }
  getComChoice(){
    return this.comChoice;
  }
}

//Show Result
class Result{
  static whoWin(player,com){
    switch(`${player} ${com}`){
      case "rock scissors":
      case "paper rock":
      case "scissors paper":
        return 'player';
      break;
      case "rock paper":
      case "paper scissors":
      case "scissors rock":
        return 'com';
      break;
      case "rock rock":
      case "paper paper":
      case "scissors scissors":
        return 'draw';
      break;
    }
  }
}

//Game Score Status
class Status{
  constructor(player, com){
    this.status = {
      player: player,
      com: com
  }
}

//Refresh Game
refreshStatus(result){
  if(result === 'player'){
    this.status.player++
  }else if(result === 'com'){
    this.status.com++
  }else{
    console.log(result);
  }
}

//Reset Status
getStatus = () => this.status;
  resetStatus(){
    this.status.player = 0;
    this.status.com = 0;
    return `Player Score: ${this.status.player} VS COM Score: ${this.status.com}`;
  }
}

//Game Start
class Game{
  constructor(){
    this.playerImg = document.querySelectorAll('#player img');
    this.comImg = document.querySelectorAll('#computer img');
    this.playerImg.forEach(choices => choices.addEventListener('click', this.start.bind(this)));
    this.status = new Status(0, 0);
    this.span = document.querySelector('.info-board span');
    this.onTerminal.call(this, this.status.getStatus());
    this.reset = document.querySelector('.reset');
    this.reset.addEventListener('click', this.resetBoard);
  };

  //The Users choice
  start(e){
    this.choice = new Choices(e.target.alt);
    const pChoice = this.choice.getPlayerChoice(); 
    const comChoice = this.choice.getComChoice(); 
    console.log(`Player Choice: ${pChoice} || COM Choice: ${comChoice}`);
    let removePick = c => c.classList.remove('pick');
    if(comChoice === pChoice){
      let draw = (pick) => pick.alt === pChoice && pick.alt === comChoice;
      let sibling = (pick) => pick.alt !== pChoice && pick.alt !== comChoice;
      [...this.playerImg].find(draw).classList.add('pick'); 
      [...this.comImg].find(draw).classList.add('pick');
      [...this.playerImg].filter(sibling).forEach(removePick); 
      [...this.comImg].filter(sibling).forEach(removePick); 
    }else{
      [...this.playerImg].find(pick => pick.alt === pChoice).classList.add('pick'); 
      [...this.playerImg].filter(pick => pick.alt !== pChoice).forEach(removePick); 
      [...this.comImg].find(pick => pick.alt === comChoice).classList.add('pick'); 
      [...this.comImg].filter(pick => pick.alt !== comChoice).forEach(removePick); 
    }
    this.status.refreshStatus(Result.whoWin(pChoice, comChoice));
    this.onTerminal.call(this, this.status.getStatus());
    this.winBoard(Result.whoWin(pChoice, comChoice));

  }

  //Scores on Console
  onTerminal(score){
    console.log(`Player Score: ${score.player} VS Computer Score: ${score.com}`);
    console.log('-------------------------------------------------------------');
  }

  //Winner Status 
  winBoard(winner){
    this.span.classList.remove('vs');
    this.span.classList.add('board', 'result');
    this.span.style.backgroundColor = '#4C9654';
    if(winner === 'player'){
      this.span.style.padding = '1em 0.5em'
      this.span.innerText = 'PLAYER WIN';
    }else if(winner === 'com'){
      this.span.style.padding = '1em 2em'
      this.span.innerText = 'COMP WIN';
    }else if(winner === 'draw'){
      this.span.style.backgroundColor = '#035B0C';
      this.span.style.padding = '1.5em 0.5em'
      this.span.innerText = 'DRAW';
    }
  }

  resetBoard = () =>{
    console.log('RESET')
    const span = document.querySelector('.info-board span');
    span.classList.remove('board', 'result');
    span.style.backgroundColor = 'transparent';
    span.style.padding = 0;
    span.classList.add('vs');
    span.innerText = 'VS';
    const images = document.querySelectorAll('.game img');
    for(let img of images){
      document.querySelector(`#computer .${img.alt}`).classList.remove('pick');
      document.querySelector(`.${img.alt}`).classList.remove('pick');
    }
    this.status.resetStatus();
  }
}

const newGame = new Game();
