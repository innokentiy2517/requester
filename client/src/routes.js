import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    DEPARTMENT_ROUTE,
    LOGIN_ROUTE, MAIN_ROUTE,
    REGISTRATION_ROUTE,
    REQUEST_ROUTE,
    USER_ROUTE
} from "./utils/consts";
import RequestPage from "./pages/RequestPage";
import UserPage from "./pages/UserPage";
import Department from "./pages/Department";
import Auth from "./pages/Auth";
import Main from "./pages/Main";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const publicRoutes = [
    {
        path: REQUEST_ROUTE,
        Component: RequestPage
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    },
    {
        path: REQUEST_ROUTE + '/:id',
        Component: RequestPage
    },
    {
        path: DEPARTMENT_ROUTE,
        Component: Department
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]
