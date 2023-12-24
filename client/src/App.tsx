import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from "./components/Footer"
import PageNotFound from "./components/PageNotFound";
import HomePage from "./containers/HomePage";
import SignupPage from "./containers/SignupPage";
import LoginPage from "./containers/LoginPage";
import LandingPage from "./containers/LandingPage";
import checkIsUserAuthenticated from "./hooks/auth";
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
  const isUserAuthenticated: boolean = checkIsUserAuthenticated()

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
      <AppContent>
        <Router basename={"/"}>
            <Routes>
              <Route path="/auth">
                <Route path="signup" Component={SignupPage} />
                <Route path="login" Component={LoginPage} />
              </Route>

              <Route path="/" element={checkIsUserAuthenticated() ? <HomePage/> : <LandingPage/>} />

              <Route element={<PrivateRoute />}>
                {/* TODO: Add Private routes here */ }
              </Route>

              <Route path="*" Component={PageNotFound} />
            </Routes>
        </Router>
      </AppContent>
      <Footer />
    </div>
  )
}

export default App
