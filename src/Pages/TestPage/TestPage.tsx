import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Prev } from 'react-bootstrap/lib/Pagination'
import './TestPage.scss'

interface TestPageProps {}

//useState, useEffect, useRef
const TestPage = (props: TestPageProps) => {
  const [state, setState] = useState({  //При необходимости рассчета State функцией - ее (ф-цию) необходимо вызывать через callback
    title: "Заголовок",
    name: "Имя"
  })

  const refParam = useRef(1) //Ref-ы часто используются для создания фокусов на элементы

  useEffect(() => {
    console.log(refParam)
  }, [refParam])

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
    <Container fluid className="TestPage">
      <h1>TestPage</h1>
      <p>Title: {state.title}</p>
      <p>name: {state.name}</p>
      <Container fluid className="pt-3">
        <button className='btn btn-primary' onClick={setNewTitle}>setNewTitle</button>
        <button className='btn btn-dark' onClick={setNewName} style={{marginLeft: 5}}>setNewName</button>
      </Container>
      <Container fluid className="pt-3">
        <h3>useRef: {refParam.current}</h3>
      </Container>
    </Container>
  )
}

export default TestPage
