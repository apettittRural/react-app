import React, {useState, useEffect} from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import firebase from './firebase.js';
import logo from './logo.svg';
import './App.css';

// STAR MATCH - V4

const StarsDisplay = props => (
	<>
    {utils.range(1, props.count).map(starId =>
      <div key={starId} className="star" />
    )}
  </>
);

const PlayNumber = props => (
  <>
    <button 
      className="number"
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => props.onClick(props.number, props.status)}
    >
      {props.number}
    </button>

    <KeyboardEventHandler
    handleKeys={[props.number+""]}
    onKeyEvent={(key, e) => props.onClick(props.number, props.status)} />
  </>
);

const PlayAgain = props => (
  <div className ='game-done'>
    <div className="message" style ={{color: props.gameStatus == 'lost' ? 'red' : 'green'}}>
      {props.gameStatus == 'lost' ? 'Game Over' : 'Nice'}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
)

const useGameState = () => {
  	const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const [username, setUsername] = useState('');

  const [secondsLeft, setSecondsLeft] = useState(10.01);

  const [toggle, setToggle] = useState(false);
  const [theSplice, setTheSplice] = useState(0);
  
  useEffect(() => {
    if(secondsLeft > 0 && availableNums.length > 0){
    const timerId = setTimeout(() => {
      const roundedNum = secondsLeft - .01;
      setSecondsLeft(Math.round(100*roundedNum)/100);
    }, 10)
    return () => clearTimeout(timerId)
  }
  else{
    const secondsRef = firebase.database().ref('users/'+username+'/');
    


    var secondsObj = {
      seconds: secondsLeft,
    }
    var topObj = {
      User: username,
      seconds: secondsLeft,
    }

    secondsRef.once("value").then(function(snapshot){
      var data = snapshot.val();
      if(data == null){
        secondsRef.set(secondsObj);
      }
      else if(data.seconds < secondsLeft){
        secondsRef.set(secondsObj);
      }
    });

    const top10Ref = firebase.database().ref('Top10/');

      top10Ref.once("value").then(function(snapshot){
        
        var data = snapshot.val();
        
        var result = [];
      var keys = Object.keys(data);
      keys.forEach(function(key){
        result.push(data[key]);
       });
       
       for(var i = 0; i < 10; i++)
       {
         console.log(result[i]);
         if(result[i].seconds < secondsLeft){
           if(toggle === false){
             setTheSplice(i);
             setToggle(true);
           }
         }
         
       }
       if(toggle){
         result.splice(theSplice, 0, topObj)
       }

       for(var i = 0; i < 10; i++)
       {
        const top10Children = firebase.database().ref('Top10/Top'+i);
        top10Children.set(result[i]);

        };

      });
      
      

      
    // }

  }
  });
  
  const setGameState = (newCandidateNums, username) => {
      setUsername(username)

      if(utils.sum(newCandidateNums) !== stars){
      setCandidateNums(newCandidateNums);
    }
    else{
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([])
    }
  }

  
  return{stars, availableNums, candidateNums, secondsLeft, setGameState}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

const Game = (props) => {

  const{
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  }
   = useGameState();

  const [bestTime, setBestTime] = useState(0);
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length == 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active'

  const secondsRef = firebase.database().ref('users/'+props.username+'/');

  secondsRef.once("value").then(function(snapshot){
    var data = snapshot.val();
    if(data != null){
      setBestTime(data.seconds);
    }
  });

  const numberStatus = (number) => {
  	if (!availableNums.includes(number)) {
    	return 'used';
    }
    if (candidateNums.includes(number)) {
    	return candidatesAreWrong ? 'wrong': 'candidate';
    }
    return 'available';
  };
  
  
  const onNumberClick = (number, currentStatus) => {
    if(gameStatus !== 'active' || currentStatus == 'used'){
      return;
    }
    const newCandidateNums = 
          currentStatus === 'available'
          ? candidateNums.concat(number)
          :candidateNums.filter(cn => cn !== number);
    
  setGameState(newCandidateNums, props.username);
  }

    return (

      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div>{props.username} your best time is {bestTime}</div>
        <div className="body">
          <div className="left">
            {gameStatus !== 'active' ? 
              (<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>) 
            : (<StarsDisplay count={stars}/>)}
          </div>
          <div className="right">
            {utils.range(1, 9).map(number =>
              <PlayNumber 
                key={number} 
                status={numberStatus(number)}
                number={number}
                onClick = {onNumberClick}
              />
            )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
        <KeyboardEventHandler
      handleKeys={['enter']}
      onKeyEvent={(key, e) => props.startNewGame() } />
      </div>
    );
  

};
//////////////////////////////////////////////////////////////////////////////////////////////////////

const TheStart = (props) =>{

  const [username, setUsername] = useState('');

  const updateUsername = (e) =>{
    setUsername(e.target.value);
    };

  const doSubmit = (e) => {
    if(e.keyCode === 13){
      props.updateUsername(username);
    }
  }

  return(
    <>
    <div className="center">
      <div className="row">
      <div className="col-lg-4">&nbsp;</div>
        <div className="col-lg-4 code center">
          <div className="largerText">Enter A Name And Press Enter To Start</div>
          <input className="width100" onChange={updateUsername} onKeyUp={doSubmit}>
          </input>
        </div>
        <div className="col-lg-4">&nbsp;</div>
      </div>
    </div>
  <KeyboardEventHandler
    handleKeys={['enter']}
    // onKeyEvent={(key, e) => props.startNewGame()}
    onKeyEvent={(key, e) => props.updateUsername(username)}
     />
  </>
  );
};


//////////////////////////////////////////////////////////////////////////////////////////////////////


const TheLeaderboard = (props) => {
return (
  <>
    {
      <>
      <div className="cell">
        <div className="floatLeft">{props.username}</div>
        <div className="floatRight">{props.seconds}</div>
      </div>
      <br/>
      </>
    }
  </>
)
}


const StarMatch = () => {

  const updateUsername = (theUsername) =>{
    console.log(username);
    setUsername(theUsername);
    startNewGame();
  }

const startNewGame = () => {
  if(toggle === 0){
    setToggle(toggle + 1);
  }
  setGameId(gameId + 1)
}

// var request = new XMLHttpRequest()

// var test = {
//   "jsonrpc": "2.0",
//   "method": "generateIntegerSequences",
//   "params": {
//       "apiKey": "0a76050f-bcf7-49e2-a234-d2b232f9c15f",
//       "n": 2,
//       "length": [5, 1],
//       "min": [1, 1],
//       "max": [69, 26],
//       "replacement": [false, false],
//       "base": [10, 10]
//   },
//   "id": 45673
// }

// request.open('POST', "https://api.random.org/json-rpc/2/invoke", true)

// request.onload = function () {
//   console.log(this.response);
//   var data = JSON.parse(this.response)
//   // console.log("true"+data)
  
//   }


// request.send()


  const [gameId, setGameId] = useState(1);
  const [toggle, setToggle] = useState(0);
  const [username, setUsername] = useState("");
  const [top10, setTop10] = useState([]);
  const [display, setDisplay] = useState(false);

  const top10Ref = firebase.database().ref('Top10/');

  if(display != true){
  top10Ref.once("value").then(function(snapshot){
        
    var data = snapshot.val();
    var result = [];
    var keys = Object.keys(data);
    keys.forEach(function(key){
    result.push(data[key]);
   });
   setTop10(result);
   setDisplay(true);
  })
}

  console.log(Math.random+""+top10);

  if(toggle === 0){
    return (
      <>
        <TheStart updateUsername={updateUsername}/>
        
        <div className="wrap paddingTop">
        <div className="content mediumText">
        <h3>The Leaderboard</h3>
        {
          display == true ? top10.map(c => <TheLeaderboard key={c.User} username={c.User} seconds={c.seconds}/>) : ""}
        </div>
        </div>
      </>
    )
  }
  else{
    return (
      <>
      
        <Game key={gameId} startNewGame={startNewGame} toggle={toggle} username={username}/>
      </>
    )
  }
}


// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(max * Math.random()),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length)];
  },
};


export default function App() {
  return (
    <StarMatch />
  );
}

