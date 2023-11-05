
import './App.css'
import { Layout } from './components/Layouts/Layout';
import { Dashboard, Login, Register, 
  NotFound, Invoices, Clients, 
  Unauthorized, LinkPage, Home,ResetPassword } from './pages'
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/Auth/RequireAuth';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/clients" element={<Clients />} />
        </Route>
        {/* catch all routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes >

  )
}

export default App
