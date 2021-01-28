import { useEffect, useState } from 'react'

import db from '../db.json'
import Widget from '../src/Components/Widget'
import QuizBackground from '../src/Components/QuizBackground'
import QuizLogo from '../src/Components/QuizLogo'
import GitHubCorner from '../src/Components/GitHubCorner'
import Button from '../src/Components/Button'
import QuizContainer from '../src/Components/QuizContainer'
import AlternativesForm from '../src/Components/AlternativesForm'

function ResultWidget({results}) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultados
      </Widget.Header>

      <Widget.Content>
        {/* da pra fazer usando filter */}
        <p>voce acertou {results.reduce((somatoriaAtual, resultAtual) => {
          const isAcerto = resultAtual === true
          if (isAcerto){
            return somatoriaAtual + 1
          }

          return somatoriaAtual
        }, 0)} 
        Perguntas
        </p>
        
        <ul>
          {results.map((result, index) => (
            <li>
              #{index + 1} Resultado: {result === true ? 'acertou' : 'errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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
  addResults
}) {
  const [selectedAlternative, setSelectedAlternative] = useState()
  const isCorrect = selectedAlternative == question.answer
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false)
  const questionId = `question__${questionIndex}`
  const hasAlternativeSelected = selectedAlternative !== undefined

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

      <AlternativesForm 
        onSubmit={(e) => {
        e.preventDefault()
        setIsQuestionSubmited(true)
        setTimeout(() => {
          addResults(isCorrect)
          onSubmit()
          setIsQuestionSubmited(false)
        }, 3 * 1000);
      }}>
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`
          const alternativeStatus = isCorrect ? 'SUCCESS' : "ERROR"
          const isSelected = selectedAlternative === alternativeIndex
          return (
            <Widget.Topic
              as='label'
              key={alternativeId}
              htmlFor={alternativeId}
              data-selected={isSelected}
              data-status={isQuestionSubmited && alternativeStatus}
            >
              <input 
              style={{
                display: 'none'
              }}
              id={alternativeId}
              name={questionId}
              onChange={() => setSelectedAlternative(alternativeIndex)}
              type='radio'
              />
              {alternative}
            </Widget.Topic>
          )
        })}
      <Button 
        disabled={!hasAlternativeSelected}
        type='submit'>
        Confirmar
      </Button>
      {isQuestionSubmited && isCorrect && <p>voce acertou</p>}
      {isQuestionSubmited && !isCorrect && <p>voce errou</p>}
      </AlternativesForm>
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
  const [results, setResults] = useState([])
  const totalQuestions = db.questions.length
  const question = db.questions[questionIndex]

  function addResults(result) {
    setResults([
      ...results,
      result
    ])
  }

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
          addResults={addResults}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
       </QuizContainer>
       <GitHubCorner projectUrl='https://github.com/mariomendonca'/>
     </QuizBackground>
  )
}