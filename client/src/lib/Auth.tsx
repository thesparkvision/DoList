function checkIsUserAuthenticated(): boolean {
    const APP_TOKEN: string | null = localStorage.getItem("API_TOKEN")
    let isUserAuthenticated = false;

    if(APP_TOKEN){
        isUserAuthenticated = true;
    }

    return isUserAuthenticated
}

export default checkIsUserAuthenticated;