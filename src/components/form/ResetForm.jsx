import EmailInput from './input/EmailInput';

export default function ResetForm() {
	return (
        <form className="form" method="POST">
            <EmailInput />
            <div className="center">
                <button type="submit">Отправить</button>
            </div>
        </form>
	)
}