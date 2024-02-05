import { Navigate } from 'react-router-dom'

const RedirectToMyAccount = () => {
    console.log("Redirecrt to my account")
  return <Navigate to='/myaccount' />
}

export default RedirectToMyAccount
