import styled from 'styled-components'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import db from '../db.json'
import Widget from '../src/Components/Widget'
import QuizBackground from '../src/Components/QuizBackground'
import QuizLogo from '../src/Components/QuizLogo'
import Footer from '../src/Components/Footer'
import GitHubCorner from '../src/Components/GitHubCorner'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  return (
     <QuizBackground backgroundImage={db.bg}>
       <Head>
        <title>AluraQuiz - Modelo Base</title>
       </Head>
       <QuizLogo/>
       <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The legends of zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault()
              router.push(`/quiz?name=${name}`)
            }}>
              <input 
                placeholder='Diz ai seu nome!'
                onChange={(e) => {
                  setName(e.target.value)
                }}
                />
              <button 
                type='submit'
                disabled={name.length === 0}
                >
                Jogar
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quiz da galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>lorem ipsum</p>
          </Widget.Content>
        </Widget>
        <Footer />
       </QuizContainer>
       <GitHubCorner projectUrl='https://github.com/mariomendonca'/>
     </QuizBackground>
  )
}
