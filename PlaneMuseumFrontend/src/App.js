import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPageForm from "./Components/StartPageForm/StartPageForm";
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import ContentForm from './Components/ContentForm/ContentForm';
import ProtectedRoute from './Components/ProtectedRoute';
import AccDetailsForm from './Components/AccDetailsForm/AccDetailsForm';
import AddPlaneForm from './Components/AddPlaneForm/AddPlaneForm';
import EditPlaneForm from './Components/EditPlaneForm/EditPlaneForm';
import AdminToolsForm from './Components/AdminToolsForm/AdminToolsForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPageForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/manage/user" element={<AccDetailsForm />} />
        <Route path="/manage/plane/add" element={<AddPlaneForm />} />
        <Route path="/manage/plane/edit" element={<EditPlaneForm />} />
        <Route path="/admin" element = {<AdminToolsForm />} />
        <Route
          path="/planeMuseum"
          element={
            <ProtectedRoute>
          <ContentForm />
        </ProtectedRoute>
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
