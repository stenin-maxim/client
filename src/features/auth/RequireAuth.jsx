import { NavLink, Outlet } from "react-router"
import { useSelector } from "react-redux"

const RequireAuth = () => {
    const accessToken = useSelector((state) => state.auth.accessToken)
    
    // show unauthorized screen if no user is found in redux store
    if (!accessToken) {
        return (
            <div>
                <h1>Неавторизованный :(</h1>
                <span>
                    <NavLink to='/login'>Войдите</NavLink>, чтобы получить доступ
                </span>
            </div>
        )
    }

    return <Outlet />
}

export default RequireAuth