import { API_URL } from "./Config";

export const BACKEND_URLS: Record<string, string> = {
    SIGNUP_URL: API_URL + "/api/v1/users/register",
    LOGIN_URL: API_URL + "/api/v1/users/login",
    GET_USER_URL: API_URL + "/api/v1/users/me",
    TASK_PAGE_URL: API_URL + "/api/v1/tasks/"
}

export const FRONTEND_PAGE_URLS: Record<string, string> = {
    SIGNUP_PAGE: "/auth/signup",
    LOGIN_PAGE: "/auth/login",
    HOME_PAGE: "/"
}

type SelectConstants = {
    color: string;
    value: string;
};

export const PRIORITY_VALUES : Record<string, SelectConstants> = {
    "CRITICAL": {
        color: "red",
        value: "CRITICAL"
    },
    "HIGH": {
        color: "orange",
        value: "HIGH"
    },
    "MEDIUM": {
        color: "yellow",
        value: "MEDIUM"
    },
    "LOW": {
        color: "blue",
        value: "LOW"
    }
}

export const STATUS_VALUES : Record<string, SelectConstants> = {
    "TO_DO": {
        color: "skyblue",
        value: "TO_DO"
    },
    "IN_PROGRESS": {
        color: "yellow",
        value: "IN_PROGRESS"
    },
    "DONE": {
        color: "green",
        value: "DONE"
    }
}