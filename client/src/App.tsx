import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from "./components/Footer"
import PageNotFound from "./components/PageNotFound";
import HomePage from "./containers/HomePage";
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

function App() {  
  return (
    <div
      role="app-wrapper"
      aria-labelledby="app-wrapper"
      id="app-wrapper"
    >
      <Header />
      <AppContent>
        <Router>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="*" Component={PageNotFound} />
          </Routes>
        </Router>
      </AppContent>
      <Footer />
    </div>
  )
}

export default App
