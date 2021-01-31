import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno}>
      <QuizScreen 
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}  
      />
    </ThemeProvider>
      );
    }
    // <pre style={{color:'black'}}>
    //   {JSON.stringify(dbExterno.questions, null, 4)}
    // </pre> 

export async function getServerSideProps(context) {
  console.log('info ', context.query.id)
  const [projectName, githubUser] = context.query.id.split('___')
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((res) => {
      if(res.ok) {
        return res.json()
      } 
      throw new Error('falha em pegar dados')
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.error(err)
    })

  console.log(dbExterno)
  return {
    props: {
      dbExterno,
    },
  }
}