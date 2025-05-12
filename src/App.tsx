import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/Layout"
import { Login } from "./components/Login";
import { JobApplicationPanel } from "./components/JobApplicationPanel";
import { AdminPanel } from "./components/AdminPanel";
import { FormProvider } from "./components/context/FormContext";

function App() {

  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<JobApplicationPanel />} />
          </Route>
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Routes>
      </Router>
    </FormProvider>
  )
}

export default App