import { useEffect, useState } from 'react'

import db from '../db.json'
import Widget from '../src/Components/Widget'
import QuizBackground from '../src/Components/QuizBackground'
import QuizLogo from '../src/Components/QuizLogo'
import GitHubCorner from '../src/Components/GitHubCorner'
import Button from '../src/Components/Button'
import QuizContainer from '../src/Components/QuizContainer'

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, 
  totalQuestions, 
  questionIndex,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`
  return (
    <Widget>
    <Widget.Header>
      <h3>Perguntas {questionIndex + 1} de {totalQuestions}</h3>
    </Widget.Header>
    <img 
      alt='descricao'
      style={{
        width: '100%',
        height: '150px',
        objectFit: 'cover'
      }}
      src={question.image}
    />
    <Widget.Content>
      <h2>{question.title}</h2>
      <p>{question.description}</p>

      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}>
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`
          return (
            <Widget.Topic
              as='label'
              htmlFor={alternativeId}
            >
              <input 
              style={{
                display: 'none'
              }}
              id={alternativeId}
              name={questionId}
              type='radio'
              />
              { alternative}
            </Widget.Topic>
          )
        })}
      <Button type='submit'>
        Confirmar</Button>
      </form>
    </Widget.Content>
  </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [currentQuestions, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestions
  const totalQuestions = db.questions.length
  const question = db.questions[questionIndex]

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1* 1000)
  }, [])

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
       <QuizContainer>
        <QuizLogo/>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
          questionIndex={questionIndex}
          question={question}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmit}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <div>Voce acertou</div>}
       </QuizContainer>
       <GitHubCorner projectUrl='https://github.com/mariomendonca'/>
     </QuizBackground>
  )
}