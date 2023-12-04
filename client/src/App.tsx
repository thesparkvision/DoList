import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from "./components/Footer"
import LoginContainer from "./components/LoginContainer";
import PageNotFound from "./components/PageNotFound";
import HomePage from "./containers/HomePage";
import { ChildrenProps } from "./types";
import './App.scss'

const Main: React.FC<ChildrenProps> = ({children}) => {
  return (
    <div
      role="main"
      aria-labelledby="main-content"
      id="main"
    >
      {children}
    </div>
  )
}

function App() {  
  return (
    <>
      <LoginContainer>
        <Header />
        <Main>
          <Router>
            <Routes>
              <Route path="/" Component={HomePage} />
              <Route path="*" Component={PageNotFound} />
            </Routes>
          </Router>
        </Main>
        <Footer />
      </LoginContainer>
    </>
  )
}

export default App
