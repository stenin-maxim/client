const Login = (props: any) => {
    return (
        <>
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
                    <div id="passwordHelpBlock" className="form-text">
                        Ваш пароль должен состоять из 8–20 символов, содержать буквы и цифры и не должен содержать пробелов, специальных символов или смайлов.
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Запомнить пароль
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Войти</button>
                </form>
                <a href="">Зарегистрироваться</a>
            </div>
        </>
    )
}

export default Login;