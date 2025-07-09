import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setToken } from '../../features/auth/authSlice'
//import { userRegister } from '../../features/auth/authActions'

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [conditions, setConditions] = useState(false);
    const [errorConditions, setErrorConditions] = useState("");
    const [isRequestPending, setIsRequestPending] = useState(false);
    const baseUrl = import.meta.env.VITE_API_URL;

    const submitForm = async (dataForm) => {
        if (!conditions) {
            setErrorConditions("Пожалуйста, примите условия пользовательского соглашения.");
            return
        } 
        setErrorConditions("");

        if (!isRequestPending) {
            setIsRequestPending(true);
            const response = await fetch(`${baseUrl}auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataForm),
            });
            const data = await response.json();
            if (response.ok && data.data.accessToken) {
                dispatch(setToken(data.data.accessToken));
                navigate('/profile');
            } else {
                alert('Ошибка регистрации');
            }
        }
    }

    return (
        <div className="row justify-content-md-center">
            <div className="col-5">
                <div className="auth">
                    <h2>Регистрация</h2>
                    <form className="form" onSubmit={handleSubmit(submitForm)}>
                        <div className="mb-3">
                            <label htmlFor="name">Имя:</label>
                            <input type="text"
                                id="name"
                                className="form-control"
                                {...register('name', {
                                    required: 'Введите имя',
                                    minLength: 3,
                                    maxLength: 20,
                                    pattern: {
                                        value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
                                        message: 'Введите буквенный формат'
                                    },
                                })}
                            />
                            {errors.name && <span className="err">{errors.name.message}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Почта:</label>
                            <input type="email"
                                id="email"
                                className="form-control"
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
                        <div className="mb-3">
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
                        <div className="mb-3">
                            <input type="checkbox"
                                id="conditions"
                                className="mr-3"
                                checked={conditions}
	                            onChange={() => setConditions(!conditions)}
                            />
                            <label htmlFor="conditions">Я принимаю условия <a href="#">пользовательского соглашения</a></label>
                            {errorConditions && <div><span className="err">{errorConditions}</span></div>}

                        </div>
                        <center>
                            <input type="submit" value="Зарегистрироваться" className="form-submit" disabled={isRequestPending}/>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    )
}