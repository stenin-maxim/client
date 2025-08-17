import support from "../../assets/support.json";

export default function Support() {
    return (
        <form action="">
            <p>
                <label htmlFor="theme">Выберите тему обращения</label>
                <select name="theme" id="theme">
                    <option disabled>Выберите тему</option>
                    {support.map((item) => {
                        return (<option key={item.id} value={item.title}>{item.title}</option>)
                    })}
                </select>
            </p>
            <p>
                <label htmlFor="phone">Номер телефона, привязанный к аккаунту на Юле</label>
                <input type="phone" id="phone" name="phone"/>
            </p>
            <p>
                <label htmlFor="username">Как к вам можно обращаться</label>
                <input type="text" id="username" name="username"/>
            </p>
            <p>
                <label htmlFor="email">Почта, на которую можно ответить</label>
                <input type="email" id="email" name="email"/>
            </p>
            <p>
                <label htmlFor="messages">Ваше сообщение</label>
                <textarea name="messages" id="messages"></textarea>
            </p>
            <p>
                <label htmlFor="file">Вы можете прикрепить скриншоты и файлы к запросу. Не более 10 штук, общим размером до 8 Мб. </label>
                <input type="file" id="file" name="file"/>
            </p>
            <p>
                <input type="submit" value="Отправить обращение"/>
            </p>
        </form>
    )
}