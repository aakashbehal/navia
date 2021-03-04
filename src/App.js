import React, { useState } from 'react'
import './App.css';

import quizData from './data/quiz.json'
import Start from './components/Start'
import Question from './components/Question'
import End from './components/End'

const App = () => {
  const [step, setStep] = useState(1)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answers, setAnswers] = useState([])

  const quizStateHandler = () => {
    setStep(2)
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([])
    setStep(2)
  }

  const stepHandler = () => {
    if (step === 1) {
      return (
        <Start onQuizStart={quizStateHandler} />
      )
    }
    if (step === 2) {
      return (
        <Question
          data={quizData.data[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.data.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />
      )
    }
    if (step === 3) {
      return (
        <End
          results={answers}
          data={quizData.data}
          onReset={resetClickHandler}
          onAnswersCheck={() => { }}
        />
      )
    }
  }

  return (
    <div className="App">
      {stepHandler()}
    </div>
  );
}

export default App;
