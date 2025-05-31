export default function PasswordInput(props) {
    return (
        <div className="mb-3">
            <label htmlFor="password">Пароль:</label>
            <input type="password"
                name="password"
                id="password"
                className="form-control"
                value={props.password}
                onChange={props.handleChange}
                minLength="8"
                maxLength="40"
                required
            />
        </div>
    )
}

