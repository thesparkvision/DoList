import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export default function useAppContext() {
    const ctxValue = useContext(AppContext)
  
    if (ctxValue === undefined){
      throw new Error("Expected context value to be set")
    }
    
    return ctxValue 
}