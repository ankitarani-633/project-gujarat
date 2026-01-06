// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Yard from "./pages/Yard";
import { auth } from "./auth";
import Plan from "./pages/Plan";
import Approval from "./pages/Approval";
import Ihm from "./pages/Ihm";
import Training from "./pages/Training";
import Compliance from "./pages/Compliance";
function ProtectedRoute({ children }) {
  if (!auth.isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/yard"
          element={
            <ProtectedRoute>
              <Yard />
            </ProtectedRoute>
          }
        />
                <Route path="/plan" element={<ProtectedRoute><Plan /></ProtectedRoute>} />

                <Route path="/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
                

      <Route path="/ihm" element={<ProtectedRoute><Ihm /></ProtectedRoute>} />
      <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
  

                
<Route
        path="/approval"
        element={<ProtectedRoute><Approval /></ProtectedRoute>}
      />



        <Route path="/login" element={<Login />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
