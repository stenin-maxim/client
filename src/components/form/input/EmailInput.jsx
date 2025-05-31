export default function EmailInput(props) {
    return (
        <div className="mb-3">
            <label htmlFor="email">Почта:</label>
            <input type="email"
                id="email"
                className="form-control"
                value={props.email}
                onChange={props.handleChange}
                name="email"
                minLength="2"
                maxLength="30"
                required
                placeholder='name@example.com'
            />
        </div>
    )
}