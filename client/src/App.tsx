import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from "./components/Footer"
import PageNotFound from "./components/PageNotFound";
import HomePage from "./containers/HomePage";
import SignupPage from "./containers/SignupPage";
import LoginPage from "./containers/LoginPage";
import LandingPage from "./containers/LandingPage";
import checkIsUserAuthenticated from "./lib/Auth";
import { ChildrenProps } from "./types";
import { AppProvider } from "./context/AppContext";
import './App.scss'
import { FRONTEND_PAGE_URLS } from "./lib/Constants";

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

const SpecialHomePageRoute = () => {
  const isUserAuthenticated: boolean = checkIsUserAuthenticated()

  return  (
    <React.Fragment>
      {isUserAuthenticated ? <HomePage/> : <LandingPage/>}
    </React.Fragment>
  );
}

function App() {  
  return (
    <div
      role="app-wrapper"
      aria-labelledby="app-wrapper"
      id="app-wrapper"
    >
      <Router basename={"/"}>
        <AppProvider>
          <Header />
          <AppContent>
            <Routes>
              <Route path="/auth">
                <Route path="signup" Component={SignupPage} />
                <Route path="login" Component={LoginPage} />
              </Route>

              <Route path={FRONTEND_PAGE_URLS.HOME_PAGE} element={<SpecialHomePageRoute />} />

              <Route element={<PrivateRoute />}>
                {/* TODO: Add Private routes here */ }
              </Route>

              <Route path="*" Component={PageNotFound} />
            </Routes>
          </AppContent>
          <Footer />
        </AppProvider>
      </Router>
    </div>
  )
}

export default App
