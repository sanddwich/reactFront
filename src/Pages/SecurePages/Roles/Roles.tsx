import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import useAccessRoles from '../../../Hooks/useAccessRoles'
import LoaderCircle from '../../../SharedComponents/LoaderCircle/LoaderCircle'
import './Roles.scss'

interface RolesProps {}

const Roles = (prps: RolesProps) => {
  const [loader, setLoader] = useState<boolean>(true)
  const accessRoles = useAccessRoles()

  const getUsers = async (): Promise<any> => {
    await accessRoles.getAccessRoles()
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
          <h1>AccessRoles</h1>
          {accessRoles.fetchAccessRolesDataError.isError ? (
            <h1 className="text-danger">{accessRoles.fetchAccessRolesDataError.errorText}</h1>
          ) : (
            <Container fluid className="p-0">
              {accessRoles.accessRoles.map((accessRole, index) => {
                return (
                  <Container fluid key={index} className="Users__user d-flex flex-wrap">
                    <div className="Users__block">
                      <b>Роль: </b>
                      {accessRole.name}
                    </div>
                    <div className="Users__block">
                      <b>Код роли: </b>
                      {accessRole.code}
                    </div>
                    <div className="Users__block">
                      <b>Описание роли: </b>
                      {accessRole.description}
                    </div>
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

export default Roles
