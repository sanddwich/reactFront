import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import usePrivileges from '../../../Hooks/usePrivileges'
import LoaderCircle from '../../../SharedComponents/LoaderCircle/LoaderCircle'
import './Privileges.scss'

interface PrivilegesProps {}

const Privileges = (prps: PrivilegesProps) => {
  const [loader, setLoader] = useState<boolean>(true)
  const privileges = usePrivileges()

  const getPrivileges = async (): Promise<any> => {
    await privileges.getPrivileges()
    setLoader(false)
  }

  useEffect(() => {
    getPrivileges()
  }, [])

  return (
    <Container fluid className="Privileges">
      {loader ? (
        <Container fluid className="Privileges__loader d-lg-flex justify-content-center align-items-center">
          <LoaderCircle />
        </Container>
      ) : (
        <>
          <h1>Privileges</h1>
          {privileges.fetchPrivilegesDataError.isError ? (
            <h1 className="text-danger">{privileges.fetchPrivilegesDataError.errorText}</h1>
          ) : (
            <Container fluid className="p-0">
              {privileges.privileges.map((privilege, index) => {
                return (
                  <Container fluid key={index} className="Privileges__user d-flex flex-wrap">
                    <div className="Privileges__block">
                      <b>Привилегия: </b>
                      {privilege.name}
                    </div>
                    <div className="Privileges__block">
                      <b>Код привилегии: </b>
                      {privilege.code}
                    </div>
                    <div className="Privileges__block">
                      <b>Описание привилегии: </b>
                      {privilege.description}
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

export default Privileges