import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({element}) => {
  const isAuthenticated = Cookies.get('jwt_token')
  return isAuthenticated ? element : <Navigate to="/login" />
}

export default ProtectedRoute


