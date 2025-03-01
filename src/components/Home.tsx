import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const Home = (props: any) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();
    const onButtonClick = () => {
        // You'll update this function later
    }


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/public/category")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setIsLoaded(true);
                setItems(result);
            },
    // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
    // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
        )
    }, [])

    let categories = [
        // {name: "Недвижимость", img: "images/icon-cat-realty-rotator.png",},
        // {name: "Легковые автомобили", img: 'images/icon-cat-automobiles-rotator.png',},
        // {name: "Услуги", img: 'images/icon-cat-automobiles-rotator.png',},
        {name: "Мужской гардероб", img: 'images/icon-cat-automobiles-rotator.png',},
        {name: "Женский гардероб", img: 'images/icon-cat-automobiles-rotator.png',},
        {name: "Детский гардероб", img: "images/icon-cat-gadgets-rotator.png"},
        {name: "Детский товары", img: "images/icon-cat-kids-rotator.png"},
        {name: "Хэндмейд", img: "images/icon-cat-gadgets-rotator.png"},
        {name: "Телефоны и планшеты", img: "images/icon-cat-gadgets-rotator.png"},
        {name: "Фото и видеокамеры", img: "images/icon-cat-gadgets-rotator.png"},
        {name: "Компьютерная техника", img: "images/icon-cat-pc-rotator.png",},
        {name: "ТВ, аудио, видео", img: "images/icon-cat-pc-rotator.png",},
        {name: "Бытовая техника", img: "images/icon-cat-pc-rotator.png",},
        {name: "Бытовая техника", img: "images/icon-cat-pc-rotator.png",},
        {name: "Для дома и дачи", img: "images/icon-cat-home-rotator.png"},
        {name: "Стройматериалы и инструменты",img: "images/icon-cat-tools-rotator.png",},
        {name: "Красота и здоровье", img: "images/icon-cat-beauty-rotator.png",},
        // {name: "Запчасти и автотвары", img: "images/icon-cat-gadgets-rotator.png"},
        // {name: "Вакансии", img: "images/icon-cat-gadgets-rotator.png"},
        // {name: "Одежда, обувь, аксессуары", img: "images/icon-cat-mclothes-rotator.png",},
        {name: "Спорт и отдых", img: "images/icon-cat-other-rotator.png",},
        {name: "Хобби и развлечения", img: "images/icon-cat-other-rotator.png",},
        {name: "Прочее", img: "images/icon-cat-other-rotator.png",},
        // {name: "Запчасти", img: "images/icon-cat-automoto-rotator.png",},
        // {name: "Животные", img: "images/icon-cat-pets-rotator.png",},
    ];

    return (
        <>
            <div className="container">
                <div className="row">
                    <h2 className="mb-3">Выберите категорию</h2>
                    {categories.map((item, index) => (
                        <div key={index} className="col-2 text-center mb-3 category">
                            <a href="">
                                <img className="img-category" src={item.img} alt={item.name}/>
                                <span>{ item.name }</span>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <h2>Все обьявления</h2>
                    <div className="col-10">
                        <div className="col-3">
                            {/*<img src="" alt=""/>*/}
                            <span>title</span>
                            <span>15.59 руб.</span>
                            <span>Москва</span>
                            <span>23.03.2024</span>
                        </div>
                    </div>
                    <div className="col-2">
                        <ul>
                            <li>Правила сайта</li>
                            <li>Реклама на сайте</li>
                            <li>О сайте</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home