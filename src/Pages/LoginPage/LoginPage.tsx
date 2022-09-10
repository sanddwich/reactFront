import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { ArrowDownCircle } from 'react-bootstrap-icons'
import { Location, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './LoginPage.scss'
import FormDataInterface from '../../Redux/interfaces/AdditionalInterfaces/FormDataInterface'
import useAuth from '../../Hooks/useAuth'
import LoaderCircle from '../../SharedComponents/LoaderCircle/LoaderCircle'

interface LoginPageProps {}

const LoginPage = (prps: LoginPageProps) => {
  const { state } = useLocation()
  const auth = useAuth()
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const minLength: number = 3

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormDataInterface>({})

  const resetFields = (): void => {
    resetField('username')
    resetField('password')
  }

  const buttonClickHandler = async (data: FormDataInterface): Promise<any> => {
    setLoader((prev) => !prev)
    const authSuccess: boolean = await auth.authorize(data)
    setLoader((prev) => !prev)

    let link = '/admin'
    authSuccess && navigate(link)
  }

  // console.log("From: " + from)

  return (
    <Container fluid className="LoginPage p-0">
      {loader ? (
        <LoaderCircle />
      ) : (
        <>
          <h1>LoginPage</h1>
          <div className="LoginPage_formCont">
            <Form>
              <Form.Group className="LoginPage__group mb-3" controlId="formBasicEmail">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите логин"
                  {...register('username', {
                    required: { value: true, message: 'Обязательное поле для заполнения' },
                    minLength: {
                      value: minLength,
                      message: 'Недостаточное кол-во символов. Минимальное: ' + minLength,
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9-_]+$/i,
                      message: 'Недопустимые символы. Доступн только латинские',
                    },
                  })}
                />
                {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="LoginPage__group mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Введите пароль"
                  {...register('password', {
                    required: { value: true, message: 'Обязательное поле для заполнения' },
                    minLength: {
                      value: minLength,
                      message: 'Недостаточное кол-во символов. Минимальное: ' + minLength,
                    },
                  })}
                />
                {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
              </Form.Group>
              <Button
                variant="primary LoginPage__submit"
                type="button"
                onClick={handleSubmit((data) => buttonClickHandler(data))}
              >
                Войти
              </Button>
            </Form>
          </div>
        </>
      )}
    </Container>
  )
}

export default LoginPage
