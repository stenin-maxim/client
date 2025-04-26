export default function PasswordInput() {
    return (
        <div className="mb-3">
            <label htmlFor="password">Пароль:</label>
            <input type="password" id="password" className="form-control" name="password" minLength="8" maxLength="40" required/>
        </div>
    )
}

