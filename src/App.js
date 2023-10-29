import './App.css';
import { useEffect, useState } from 'react';
import {Dimmer, Loader } from 'semantic-ui-react';
import {db} from './firebase';
import { onValue, ref } from 'firebase/database';
import Question from './Question';
import Result from './Result';

function App() {
  const [questions, setQuestions] = useState([]);
  const [isQuiz, setIsQuiz] = useState(true);
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [sheet, setSheet] = useState([]);
  
  useEffect(() => {
    setSheet(Array.from({length: questions.length}, () => false));
  }, [questions]) 
  useEffect(() => {
    const query = ref(db, '/quiz');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setQuestions(data);
      }
    });
  }, []);

  
  useEffect(() => {
    const index = localStorage.getItem('question_index');
    if(index){
      setIndex(Number(index));
    }
  }, [])

  if(questions.length === 0){
    return <Dimmer active>
      <Loader></Loader>
    </Dimmer>
  }
  const onQuizReset = () => {
    setIndex(0);
    localStorage.setItem('question_index', 0);
    setIsQuiz(true);
  }

  const onQuizEnd = (count) => {
    localStorage.setItem('question_index', 0);
    setIsQuiz(false);
    setCount(count)
  }

  const onBackQuiz = (index) => {
    localStorage.setItem('question_index', index);
    setIndex(index);
    setIsQuiz(true);
  } 

  console.log(index);
  return (
    isQuiz ? 
    (<Question 
      questions={questions} 
      currentQuestion={questions[index]} 
      onQuizEnd={onQuizEnd} 
      index={index} 
      setIndex={setIndex}
      sheet={sheet}
      setSheet={setSheet}
      >
      </Question>) : 
    <Result onBackQuiz={onBackQuiz} count={count} sheet={sheet} onQuizReset={onQuizReset} questions={questions} length={questions.length}/>
  )
}

export default App;
