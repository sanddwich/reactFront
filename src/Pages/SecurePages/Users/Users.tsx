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

  useEffect(() => {
    users.getUsers()
  }, [])

  return (
    <Container fluid className="Users p-0">
      {loader ? (
        <Container fluid className="Users__loader d-lg-flex justify-content-center align-items-center">
          <LoaderCircle />
        </Container>
      ) : (
        <>
          <h1>Users</h1>
          {users.users.map((user, index) => {
            return (
              <Container fluid key={index} className="Users__user">
                <div className="Users__block">{user.username}</div>
                <div className="Users__block">{user.email}</div>
                <div className="Users__block">{user.active}</div>
            </Container>
            )
          })}
        </>
      )}
    </Container>
  )
}

export default Users
