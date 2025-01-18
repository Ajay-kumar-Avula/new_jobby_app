import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Router>
    <Routes>
      {/* Public Route for Home */}
      <Route path="/" element={<Home />} />
      
      {/* Protected Routes */}
      <Route path="/jobs" element={<ProtectedRoute element={<Jobs />} />} />
      <Route path="/jobs/:id" element={<ProtectedRoute element={<JobItemDetails />} />} />
      
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
)

export default App



