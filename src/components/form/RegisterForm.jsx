import { useState } from 'react';
import EmailInput from './input/EmailInput';
import PasswordInput from './input/PasswordInput';

export default function RegisterForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');
	const [conditions, setConditions] = useState(false);
	const [errorConditions, setErrorConditions] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!conditions) {
			setErrorConditions("Пожалуйста, примите условия пользовательского соглашения.");
			return
		} else {
			setErrorConditions("");
		}

		const response = await fetch(import.meta.env.VITE_API_URL + "auth/register", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password }),
		});
		if (response.ok) {
			// Обработка успешной регистрации
			alert('Регистрация успешна!');
		} else {
		  	alert('Ошибка регистрации');
		}
	};

	return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name">Имя:</label>
                <input type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    minLength={2}
                    maxLength={20}
                    required
                />
            </div>
            <EmailInput email={email} handleChange={(e) => setEmail(e.target.value)} />
            <PasswordInput password={password} handleChange={(e) => setPassword(e.target.value)} />
            <div className="mb-3">
                <input type="checkbox"
	                id="conditions"
	                name="conditions"
	                className="mr-3"
	                checked={conditions}
	                onChange={() => setConditions(!conditions)}
                />
                <label htmlFor="conditions">Я принимаю условия <a href="#">пользовательского соглашения</a></label>
            	{errorConditions && <div><span className="err">{errorConditions}</span></div>}
            </div>
            <div className="center">
                <button type="submit">Зарегистрироваться</button>
            </div>
        </form>
	)
	
}


