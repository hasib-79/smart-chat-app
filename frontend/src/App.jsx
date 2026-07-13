import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { socket } from './lib/socket'

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

import { useAuthStore } from "./store/useAuthStore";

function App() {
  const {
    authUser,
    checkAuth,
    isCheckingAuth,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    socket.connect();

    return () => socket.disconnect();
  }, [])


  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <HomePage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/signup"
        element={
          !authUser ? (
            <SignupPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/login"
        element={
          !authUser ? (
            <LoginPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
