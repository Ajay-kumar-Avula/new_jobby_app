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
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/jobs/:id" element={<ProtectedRoute><JobItemDetails /></ProtectedRoute>} />
      
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
)

export default App


