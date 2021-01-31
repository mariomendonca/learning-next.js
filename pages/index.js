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
import Input from '../src/Components/Input'
import Button from '../src/Components/Button'
import QuizContainer from '../src/Components/QuizContainer'
import Link from '../src/Components/Link'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  return (
     <QuizBackground backgroundImage={db.bg}>
       <Head>
        <title>AluraQuiz - Modelo Base</title>
       </Head>
       <QuizContainer>
        <QuizLogo/>
        <Widget>
          <Widget.Header>
            <h1>Coders Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault()
              router.push(`/quiz?name=${name}`)
            }}>
              <Input 
                name='nomeDoUsuario'
                placeholder='Diz ai seu nome!'
                onChange={(e) => {
                  setName(e.target.value)
                }}
                />
              <Button 
                type='submit'
                disabled={name.length === 0}
                >
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quiz da galera</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.')

                return (
                <li key={linkExterno}>
                  <Widget.Topic 
                    as={Link}
                    href={`/quiz/${projectName}___${githubUser}`}>
                    {githubUser}/{projectName}
                  </Widget.Topic>
                </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
       </QuizContainer>
       <GitHubCorner projectUrl='https://github.com/mariomendonca'/>
     </QuizBackground>
  )
}
