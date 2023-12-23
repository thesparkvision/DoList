function useAuth(){
    let APP_TOKEN: string | null = localStorage.getItem("API_TOKEN")
    let isUserAuthenticated: boolean = false

    if(!APP_TOKEN){
        isUserAuthenticated = true
    }

    return isUserAuthenticated
}

export default useAuth;