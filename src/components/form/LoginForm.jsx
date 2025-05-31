import { useState } from 'react';
import EmailInput from './input/EmailInput';
import PasswordInput from './input/PasswordInput';

export default function LoginForm() {
	const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');

  	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(import.meta.env.VITE_API_URL + "auth/login", {
		  	method: 'POST',
		  	headers: { 'Content-Type': 'application/json' },
		  	body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		if (data.accessToken) {
		  	localStorage.setItem('accessToken', data.accessToken);
		} else {
		  	alert('Ошибка входа');
		}
  	};

	return (
        <form className="form" method="POST" onSubmit={handleSubmit}>
	        <EmailInput email={email} handleChange={(e) => setEmail(e.target.value)} />
            <PasswordInput password={password} handleChange={(e) => setPassword(e.target.value)}/>
	        <div className="form-check">
	            <input type="checkbox" defaultChecked={true} id="checkbox" name="rememberMe"/>
	            <label htmlFor="checkbox">Запомнить меня</label>
	        </div>
	        <div className="center">
	            <button type="submit">Войти</button>
	        </div>
	    </form>
	)
}