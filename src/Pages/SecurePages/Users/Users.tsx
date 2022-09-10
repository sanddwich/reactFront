import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import useUsers from '../../../Hooks/useUsers'
import UserIface from '../../../Redux/interfaces/AdditionalInterfaces/UserIface'
import LoaderCircle from '../../../SharedComponents/LoaderCircle/LoaderCircle'
import './Users.scss'

interface UsersProps {}

const Users = (props: UsersProps) => {
  const [loader, setLoader] = useState<boolean>(true)
  const users = useUsers()

  const getUsers = async (): Promise<any> => {
    await users.getUsers()
    setLoader(false)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Container fluid className="Users">
      {loader ? (
        <Container fluid className="Users__loader d-lg-flex justify-content-center align-items-center">
          <LoaderCircle />
        </Container>
      ) : (
        <>
          <h1>Users</h1>
          {users.fetchUserDataError.isError ? (
            <h1 className="text-danger">{users.fetchUserDataError.errorText}</h1>
          ) : (
            <Container fluid className="p-0">
              {users.users.map((user, index) => {
                return (
                  <Container fluid key={index} className="Users__user d-flex flex-wrap">
                    <div className="Users__block"><b>Логин: </b>{user.username}</div>
                    <div className="Users__block"><b>Email: </b>{user.email}</div>
                    <div className="Users__block"><b>Активность: </b>{user.active ? "Да" : "Нет"}</div>
                  </Container>
                )
              })}
            </Container>
          )}
        </>
      )}
    </Container>
  )
}

export default Users
