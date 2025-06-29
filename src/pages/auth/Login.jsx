import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth/authActions'

export default function Login() {
	const dispatch = useDispatch();
    const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors }  } = useForm()

	const submitForm = (data) => {
		dispatch(login(data))
        navigate('/profile');
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
                        <div className="center">
                            <input type="submit" value="Войти" className="form-submit"/>
                        </div>
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