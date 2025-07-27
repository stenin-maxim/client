// src/pages/VerifyEmail.jsx
import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { setUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function VerifyEmail() {
    const { id, hash } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const query = location.search; // Собираем query параметры (expires, signature и т.д.)
        if (!token) {
            alert("Вы должны быть авторизованы для подтверждения e-mail.");
            navigate("/login");
            return;
        }

        fetch(
            `${import.meta.env.VITE_API_URL}email/verify/${id}/${hash}${query}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((res) => res.json())
        .then((data) => {
            dispatch(setUser(data.data.user));
            alert(data.message || "E-mail подтверждён!");
            navigate("/profile");
        })
        .catch(() => {
            alert("Ошибка подтверждения e-mail");
        });
    }, [id, hash, location, navigate]);

    return <div>Подтверждение e-mail...</div>;
}