import './App.scss'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout/MainLayout'
import { connect } from 'react-redux'
import { RootState } from './Redux'
import { ModalState, ToastState } from './Redux/interfaces/interfaces'
import ToastComponent from './SharedComponents/ToastComponent/ToastComponent'
import MobileMenu from './SharedComponents/MobileMenu/MobileMenu'

interface AppProps {
  toast: ToastState
  modal: ModalState
}

const App = (props: AppProps) => {
  // const [param, setParam] = useState(0)

  // const foo = ():void => {
  //   console.log('FOO')
  //   setParam(param + 1)
  //   console.log(param)
  // }

  return (
    <Container fluid className="App p-0">
      {props.modal.mobileMenu.isActive && <MobileMenu />}
      {props.toast.isActive && <ToastComponent />}

      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </Container>
  )
}

const mapDispatchToProps = {}

const mapStateToProps = (state: RootState) => {
  const toast = state.toast
  const modal = state.modal
  return {
    toast,
    modal,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)