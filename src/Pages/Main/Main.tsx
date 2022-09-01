import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Prev } from 'react-bootstrap/lib/Pagination'
import './Main.scss'

interface MainProps {}

const Main = (props: MainProps) => {
  const [state, setState] = useState({  //При необходимости рассчета State функцией - ее (ф-цию) необходимо вызывать через callback
    title: "Заголовок",
    name: "Имя"
  })

  const setNewTitle = () => {
    setState(prev => {
      return {
        ...prev,
        title: "Новый заголовок " + Math.random()
      }
    })
  }

  useEffect(() => {
    console.log(state)
  }, [state.title])

  const setNewName = () => {
    setState(prev => {
      return {
        ...prev,
        name: "Новое имя " + Math.random()
      }
    })
  } 

  useEffect(() => {
    console.log(state)
  }, [state.name])

  return (
    <Container fluid className="Main">
      <h1>Main</h1>      
    </Container>
  )
}

export default Main
