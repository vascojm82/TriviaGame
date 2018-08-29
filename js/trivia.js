var triviaQuestions = {
      q1: {
          'question': 'On the movie "Gladiator", what was the name of the character played by Russel Crowe ?',
          'answers': {
            a1: 'Jack Sparrow',
            a2: 'John Wick',
            a3: 'Jason Bourne',
            a4: 'Maximus Decimus Meridius',
            correctAnswer: 'a4'
          }
      },
      q2: {
          question: 'Which one of these movies was starred by Bruce Lee ?',
          answers: {
            a1: 'John Wick',
            a2: 'Enter the Dragon',
            a3: 'Logan',
            a4: 'The Lion King',
            correctAnswer: 'a2'
          }
        },
        q3: {
          question: 'What was the name of the second movie in the Jason Bourne franchise ?',
          answers: {
            a1: 'The Bourne Identity',
            a2: 'The Bourne Legacy',
            a3: 'Jason Bourne',
            a4: 'The Bourne Supremacy',
            correctAnswer: 'a4'
          }
        },
        q4: {
          question: 'In the movie "Gone in Sixty Seconds", what was the name of the 1971 Ford Mustang that Memphis Raines steals last ?',
          answers: {
            a1: 'Eleanor',
            a2: 'Bullit',
            a3: 'Saleen',
            a4:'Rousch',
            correctAnswer: 'a1'
          }
        },
        q5: {
          question: 'In the movie "Resident Evil", the character "Alice" is played by which actress ?',
          answers: {
            a1: 'Ali Larter',
            a2: 'Heike Makatsch',
            a3: 'Milla Jovovich',
            a4: 'Penelope Cruz',
            correctAnswer: 'a3'
          }
        },
        q6: {
          question: 'On the movie "Top Gun",' + " What was the callsign for Tom Cruise's character ?",
          answers: {
            a1: 'Goose',
            a2: 'IceMan',
            a3: 'Maverick',
            a4: 'Hollywood',
            correctAnswer: 'a3'
          }
        },
        q7: {
          question: "Which European team is the only team to have won 13 UEFA Champion's League trophies ?",
          answers: {
            a1: 'AC Milan',
            a2: 'Manchester United',
            a3: 'Real Madrid',
            a4: 'Barcelona',
            correctAnswer: 'a3'
          }
        },
        q8: {
          question: "Who was Real Madrid's head coach during the 2016-2017 season ?",
          answers: {
            a1: 'Carlo Ancelotti',
            a2: 'Fabio Capello',
            a3: 'Vicente Del Bosque',
            a4: 'Zinedine Zidane',
            correctAnswer: 'a4'
          }
        },
        q9: {
          question: "On which day did Apple's Steve Jobs introduced the very first iPhone model ?",
          answers: {
            a1: 'June 29, 2007',
            a2: 'February 18, 2005',
            a3: 'July 4, 2010',
            a4: 'December 12, 2002',
            correctAnswer: 'a1'
          }
        },
        q10: {
          question: 'Which other remaining company holds a license for the "x86" processor architecture and competes fiercely with Intel corp. ?',
          answers: {
            a1: 'Texas Instruments',
            a2: 'Cyrix',
            a3: 'AMD (Advanced Micro Devices)',
            a4: 'Motorola',
            correctAnswer: 'a3'
          }
        },
        randomChosen: new Array(),
        randomQ_A: () => {
          var randomChoice = 'q' + ((Math.floor(Math.random() * 10)) + 1);

          for(i=0; i<=triviaQuestions.randomChosen.length; i++){
            if(triviaQuestions.randomChosen.indexOf(randomChoice) < 0 ){   //If chosen Q&A is not in the array (not repeated)
              triviaQuestions.randomChosen.push(randomChoice);             //Add it to the array
              if(triviaQuestions.firstRound){                              //Skip counting the first randomly generated index
                triviaQuestions.counter++;                                 //Cannot send more than 10 questions
              }
              triviaQuestions.firstRound = true;                           //First randomly generated index flag
              return randomChoice;                                         //return newly generated random index
            }else{
              if(triviaQuestions.counter >= 9){                           //If maximum 10 questions reached
                return false;
              }

              return -1;                                                   //If repeated return fail
            }

          }
        }
    };

    triviaQuestions.counter = 0;
    triviaQuestions.firstRound = false;
