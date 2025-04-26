export default function EmailInput() {
    return (
        <div className="mb-3">
            <label htmlFor="email">Почта:</label>
            <input type="email" id="email" className="form-control" name="email" minLength="2" maxLength="30" required placeholder='name@example.com'/>
        </div>
    )
}