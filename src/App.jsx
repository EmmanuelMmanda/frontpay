import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./store/authContext";
import TaskForm from "./components/Authenticated/tasks/TaskForm";
import CheckoutPage from "./components/payment/CheckoutPage";
import Login from "./components/Auth/Login";
import TaskList from "./components/Authenticated/tasks/TaskList";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* Redirect to /login for unmatched routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
