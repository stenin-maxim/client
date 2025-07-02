import { useNavigate } from "react-router"

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <center>
            <h1>404 | Страница не найдена</h1>
            <br />
            <button className="btn-404" onClick={() => navigate("/")}>Перейти на главную страницу</button>
        </center>
    )
}