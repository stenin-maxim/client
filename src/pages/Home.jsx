import { useState, useEffect } from 'react'

export default function Home() {
    const [error, setError] = useState(null);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "public/ads")
            .then(res => res.json())
            .then(
                (result) => {
                    setAds(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])

    let categories = [
        {name: "Мужской гардероб", img: 'src/assets/images/icon-cat-automobiles-rotator.png',},
        {name: "Женский гардероб", img: 'src/assets/images/icon-cat-automobiles-rotator.png',},
        {name: "Детский гардероб", img: "src/assets/images/icon-cat-gadgets-rotator.png"},
        {name: "Детский товары", img: "src/assets/images/icon-cat-kids-rotator.png"},
        {name: "Хэндмейд", img: "src/assets/images/icon-cat-gadgets-rotator.png"},
        {name: "Телефоны и планшеты", img: "src/assets/images/icon-cat-gadgets-rotator.png"},
        {name: "Фото и видеокамеры", img: "src/assets/images/icon-cat-gadgets-rotator.png"},
        {name: "Компьютерная техника", img: "src/assets/images/icon-cat-pc-rotator.png",},
        {name: "ТВ, аудио, видео", img: "src/assets/images/icon-cat-pc-rotator.png",},
        {name: "Бытовая техника", img: "src/assets/images/icon-cat-pc-rotator.png",},
        {name: "Для дома и дачи", img: "src/assets/images/icon-cat-home-rotator.png"},
        {name: "Стройматериалы и инструменты",img: "src/assets/images/icon-cat-tools-rotator.png",},
        {name: "Красота и здоровье", img: "src/assets/images/icon-cat-beauty-rotator.png",},
        {name: "Спорт и отдых", img: "src/assets/images/icon-cat-other-rotator.png",},
        {name: "Хобби и развлечения", img: "src/assets/images/icon-cat-other-rotator.png",},
        {name: "Прочее", img: "src/assets/images/icon-cat-other-rotator.png",},
        {name: "Животные", img: "src/assets/images/icon-cat-pets-rotator.png",},
    ];

    return (
        <>
            <div className="container">
                <div className="row">
                    <h2>Выберите категорию</h2>
                    {categories.map((item) => (
                        <div key={item.name} className="col-2 text-center pb-3 mb-3 category">
                            <a href="">
                                <img className="img-category" src={item.img} alt={item.name}/>
                                <span>{item.name}</span>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <h2 className="mb-3">Отдам даром</h2>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-3">
                                <div className="block-ad">
                                    <a href="">
                                        <span className="location">Москва</span>
                                        <i className="bi bi-heart" title="Добавить в избранное"></i>
                                        <div className="free">Бесплатно</div>
                                        <div className="title">Собака</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="mb-3">Все обьявления</h2>
                    <div className="col-10">
                        <div className="row">
                            {ads.map((item) => (
                                <div key={item.id} className="col-3">
                                    <div className="block-ad">
                                        <a href={"/ad/" + item.id} >
                                            <img src={item.adPhotos.length === 0 ? "#" : import.meta.env.VITE_API_PUBLIC_URL + "image/" + item.adPhotos[0].id} alt=""/>
                                            <span className="location">{item.location}</span>
                                            <i className="bi bi-heart" title="Добавить в избранное"></i>
                                            <div className="price">{item.price}</div>
                                            <div className="title">{item.title}</div>
                                        </a>
                                    </div>
                                </div>
                            ))}
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