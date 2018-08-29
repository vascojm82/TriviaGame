$(document).ready(function() {
  var startBtn = $(".start"),
      restartBtn = $(".restart"),
      container = $('.container'),
      mainContainer = $(".main-container"),
      winnerContainer = $('.winner-container'),
      loserContainer = $('.loser-container'),
      resultContainer = $('.result-container'),
      correct_ans = $('.correct'),
      wrong_ans = $('.wrong'),
      timer = $('.timer'),
      question = $('.question'),
      firstAnswer = $('.first'),
      secondAnswer = $('.second'),
      thirdAnswer = $('.third'),
      fourthAnswer = $('.fourth'),
      unanswered_q = $('.unanswered'),
      userChoice,
      start = 60,
      question,
      correctAnswer,
      q_aObj,
      right = 0,
      wrong = 0,
      unanswered =0,
      maxTime = false,
      $this = this;

  var backgroundMusicObject = soundManager.createSound({
      url: "assets/ken.mp3",
      autoLoad: true,
      autoPlay: true,
      loops: 100
  });

  backgroundMusicObject.stop();

  var pickSoundObject = soundManager.createSound({
      url: "assets/hover.wav",
      autoLoad: true,
      autoPlay: true
  });

  pickSoundObject.stop();

  var selectSoundObject = soundManager.createSound({
      url: "assets/Accept.mp3",
      autoLoad: true,
      autoPlay: true
  });

  selectSoundObject.stop();

  var correctMusicObject = soundManager.createSound({
      url: "assets/correct.wav",
      autoLoad: true,
      autoPlay: true
  });

  correctMusicObject.stop();

  var wrongMusicObject = soundManager.createSound({
      url: "assets/wrong.mp3",
      autoLoad: true,
      autoPlay: true
  });

  wrongMusicObject.stop();

  function calcRemainingTime(){
    return start / 1000;
  }

  function instantInterval( fn, delay ) {
    fn();
    setInterval( fn, delay );
  }

  function setTimer(){
    timer.text("Time Remaining: " + start + " Seconds");

    if(start < 1){
      maxTime = true;
      return maxTime
    }else{
      maxTime = false;
    }
    start--;

    return maxTime;
  }

  function printQ_A(){
    var inquire = -1;

    while(inquire === -1){
      inquire = triviaQuestions.randomQ_A();
    }

    if(!inquire){
      return false;               //All 10 questions exhausted
    }

    question.html(triviaQuestions[inquire].question);
    firstAnswer.html(triviaQuestions[inquire].answers['a1']);
    firstAnswer.attr("value", triviaQuestions[inquire].answers['a1']);
    secondAnswer.html(triviaQuestions[inquire].answers['a2']);
    secondAnswer.attr("value", triviaQuestions[inquire].answers['a2']);
    thirdAnswer.html(triviaQuestions[inquire].answers['a3']);
    thirdAnswer.attr("value", triviaQuestions[inquire].answers['a3']);
    fourthAnswer.html(triviaQuestions[inquire].answers['a4']);
    fourthAnswer.attr("value", triviaQuestions[inquire].answers['a4']);

    return {
      questionIndex: inquire,
      correctAnswerIndex: triviaQuestions[inquire].answers.correctAnswer
    }
  }

  function getAnswer(){
    correctAnswer = triviaQuestions[q_aObj.questionIndex].answers[q_aObj.correctAnswerIndex];     //Full right answer
  }

  function processData(userChoice, correctAnswer){
    var temp;
    if(userChoice === correctAnswer){
      mainContainer.css("display","none");
      loserContainer.css("display", "none");
      winnerContainer.css("display", "block");
      correctMusicObject.stop();
      correctMusicObject.play();
      setTimeout(function(){
        winnerContainer.css("display", "none");
        start = 60;
        temp = setTimeout(function(){
          maxTime = setTimer();
          if(maxTime){
            clearTimeout(temp);
          }
        }, 300)
        if(q_aObj === false){     //Game Ends
          endGame();
        }else{
          mainContainer.css("display","block");
        }
      }
      , 2000);
      right++;
      correct_ans.text(right);
      unanswered_q.text(unanswered);
    }else{
      mainContainer.css("display","none");
      winnerContainer.css("display", "none");
      loserContainer.css("display", "block");
      wrongMusicObject.stop();
      wrongMusicObject.play();
      setTimeout(function(){
        loserContainer.css("display", "none");
        start = 60;
        temp = setTimeout(function(){
          maxTime = setTimer();
          if(maxTime){
            clearTimeout(temp);
          }
        }, 300)
        if(q_aObj === false){     //Game Ends
          endGame();
        }else{
          mainContainer.css("display","block");
        }
      }
      , 2000)
      wrong++;
      wrong_ans.text(wrong);
      unanswered_q.text(unanswered);
    }
  }

  function endGame(){
    mainContainer.css("display","none");
    winnerContainer.css("display", "none");
    loserContainer.css("display", "none");
    resultContainer.css("display", "block");
  }

  //Start background music
  var repeatOnTimeOut = function() {
    var difference = right + wrong;
    if((difference + unanswered) <= 9)
      unanswered++;
    else{
      unanswered_q.text(unanswered);
      endGame();
    }

    q_aObj = printQ_A();      //Returns Q&A object
    maxTime = false;
    start = 60;
  };

  //Event handler for background music
  function watch(repeatOnTimeOut) {
    function callback() {
      if (maxTime === true) {
        repeatOnTimeOut();
      }
    }
    return callback;
  }

  setInterval(watch(repeatOnTimeOut), 200);

  startBtn.click(function(){
    startBtn.css("display","none");
    container.css("height", "auto");
    mainContainer.css("display","block");

    backgroundMusicObject.setVolume(30);
    backgroundMusicObject.stop();
    backgroundMusicObject.play();

    instantInterval(function(){
      maxTime = setTimer();
    }, 1000)

    q_aObj = printQ_A();      //Returns Q&A object
    selectSoundObject.stop();
    selectSoundObject.play();
  })

  restartBtn.mouseenter(function(){
    pickSoundObject.stop();
    pickSoundObject.play();
  });

  restartBtn.click(function(){
    selectSoundObject.stop();
    selectSoundObject.play();
    setTimeout(function(){
      window.location.reload(true);
    }, 1500)
  });

  $(".possible-answers li").mouseenter(function() {
    pickSoundObject.stop();
    pickSoundObject.play();
  });

  firstAnswer.click(() => {
    userChoice = firstAnswer.attr("value");
    getAnswer();              //Retrieve correct answer
    processData(userChoice, correctAnswer);
    q_aObj = printQ_A();      //Returns Q&A object
  })
  secondAnswer.click(() => {
    userChoice = secondAnswer.attr("value");
    getAnswer();
    processData(userChoice, correctAnswer);
    q_aObj = printQ_A();      //Returns Q&A object
  })
  thirdAnswer.click(() => {
    userChoice = thirdAnswer.attr("value");
    getAnswer();
    processData(userChoice, correctAnswer);
    q_aObj = printQ_A();      //Returns Q&A object
  })
  fourthAnswer.click(() => {
    userChoice = fourthAnswer.attr("value");
    getAnswer();
    processData(userChoice, correctAnswer);
    q_aObj = printQ_A();      //Returns Q&A object
  })
})
