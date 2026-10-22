import { Routes, Route } from "react-router"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Homepage from "./pages/homepage"

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App