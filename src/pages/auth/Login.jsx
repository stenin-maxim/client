import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setToken, setUser } from '@/features/auth/authSlice'

export default function Login() {
    const [isRequestPending, setIsRequestPending] = useState(false);
	const dispatch = useDispatch();
    const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm();
    const baseUrl = import.meta.env.VITE_API_URL;

	const submitForm = async (dataForm) => {
        try {
            if (!isRequestPending) {
                setIsRequestPending(true);
                const response = await fetch(`${baseUrl}/auth/login`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                     },
                    body: JSON.stringify(dataForm),
                })
    
                if (!response.ok) {
                    setIsRequestPending(false);
                    const errorData = await response.json();
                    throw new Error(`Ошибка: ${errorData.message || 'Неизвестная ошибка'}`);
                }
                const data = await response.json();
                dispatch(setToken(data.data.accessToken));
                dispatch(setUser(data.data.user));
                navigate('/profile');
            }
        } catch (error) {
            alert(error.message);
            setIsRequestPending(false);
        }
	}

    return (
        <div className="row justify-content-md-center">
            <div className="col-5">
                <div className="auth">
                    <h2>Вход</h2>
                    <form className="form" onSubmit={handleSubmit(submitForm)}>
                        <div className="mb-4">
                            <label htmlFor="email">Почта:</label>
                            <input type="email"
                                id="email"
                                className="form-control"
                                placeholder='name@example.com'
                                {...register('email', {
                                    required: 'Введите адрес электронной почты',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Неверный адрес электронной почты',
                                    },
                                })}
                            />
                            {errors.email && <span className="err">{errors.email.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password">Пароль:</label>
                            <input type="password"
                                id="password"
                                className="form-control"
                                {...register('password', {
                                    required: 'Введите пароль',
                                    minLength: { value: 8, message: 'Пароль должен быть не менее 8 символов' },
                                    maxLength: { value: 50, message: 'Пароль очень большой' },
                                })}
                            />
                            {errors.password && <span className="err">{errors.password.message}</span>}
                        </div>
                        <div className="form-check">
                            <input type="checkbox" defaultChecked={true} id="checkbox" name="rememberMe"/>
                            <label htmlFor="checkbox">Запомнить меня</label>
                        </div>
                        <center>
                            <input type="submit" value="Войти" className="form-submit" disabled={isRequestPending}/>
                        </center>
                    </form>
                    <p className="auth-footer">
                        <Link to="/restore" className="forget-password" >Забыли пароль?</Link>
                        <Link to="/register">Еще не зарегистрированы у нас?</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}