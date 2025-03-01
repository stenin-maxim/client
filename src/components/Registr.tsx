const Registr = (props: any) => {
    return (
        <>
            <div className="container">
                <form>
                	<div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Имя:</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name" maxLength={20} minLength={2}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">E-mail:</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="E-mail" maxLength={50}/>
                    </div>
                    <div>
    	                <label htmlFor="password" className="form-label">Пароль:</label>
    	                <input type="password" id="password" className="form-control" aria-describedby="passwordHelpBlock" maxLength={50}/>
                    </div>
                    <div className="mb-3">
    	                <label htmlFor="repeat_password" className="form-label">Повторите пароль:</label>
    	                <input type="repeat_password" id="repeat_password" className="form-control" aria-describedby="passwordHelpBlock" maxLength={50}/>
    	                <div id="passwordHelpBlock" className="form-text">
    	                    Ваш пароль должен состоять из 8–20 символов, содержать буквы и цифры и не должен содержать пробелов, специальных символов или смайлов.
    	                </div>
                    </div>
                    <div className="mb-3">
                    	<input type="checkbox" className="mr-3"/>
                    	<label>Я принимаю условия <a href="#">пользовательского соглашения</a></label>
                    </div>	
                    <button type="submit" className="btn btn-primary mb-3">Зарегистрироваться</button>
                </form>
            </div>
        </>
    )
}

export default Registr;