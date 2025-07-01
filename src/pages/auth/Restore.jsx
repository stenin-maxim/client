import { useState } from 'react';

export default function Restore() {
    const [email, setEmail] = useState('');

    return (
        <div className="row justify-content-md-center">
            <div className="col-5">
                <div className="auth">
                    <h2>Восстановление пароля</h2>
                    <p><center>Ссылка для смены пароля будет выслана на почту, указанную в Вашем профиле!</center></p>
                    <form className="form" method="POST">
                        <div className="mb-4">
                            <label htmlFor="email">Почта:</label>
                            <input type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                minLength="2"
                                maxLength="30"
                                required
                                placeholder='name@example.com'
                            />
                        </div>
                        <center>
                            <input type="submit" value="Отправить" className="form-submit"/>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    )
}