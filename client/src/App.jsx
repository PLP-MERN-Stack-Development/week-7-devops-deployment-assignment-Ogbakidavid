import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "sonner";

export default function App() {
    return(
        <BrowserRouter>
            <Toaster richColors position="top-right" />
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </BrowserRouter>
    );
}