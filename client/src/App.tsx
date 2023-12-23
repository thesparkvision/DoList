import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from "./components/Footer"
import PageNotFound from "./components/PageNotFound";
import HomePage from "./containers/HomePage";
import SignupPage from "./containers/SignupPage";
import useAuth from "./hooks/auth";
import LoginPage from "./containers/LoginPage";
import { ChildrenProps } from "./types";
import './App.scss'

const AppContent: React.FC<ChildrenProps> = ({children}) => {
  return (
    <div
      role="app-content"
      aria-labelledby="app-content"
      id="app-content"
    >
      {children}
    </div>
  )
}

const PrivateRoute = () => {
  const isUserAuthenticated: boolean = useAuth()

  return  (
    <React.Fragment>
      {isUserAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </React.Fragment>
  );
};

function App() {  
  return (
    <div
      role="app-wrapper"
      aria-labelledby="app-wrapper"
      id="app-wrapper"
    >
      <Header />
      <Router basename={"/"}>
        <AppContent>
          <Routes>
            <Route path="/signup" Component={SignupPage} />
            <Route path="/login" Component={LoginPage} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" Component={HomePage} />
            </Route>
            <Route path="*" Component={PageNotFound} />
          </Routes>
        </AppContent>
      </Router>
      <Footer />
    </div>
  )
}

export default App
