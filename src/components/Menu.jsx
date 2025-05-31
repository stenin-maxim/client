import { useState } from 'react'
import { Link } from 'react-router'
import categories from "../assets/categories.json";

export default function Menu() {
    const [isShow, setIsShow] = useState(false);
    const toggle = () => setIsShow(!isShow);

    function showSubcategory(e) {
        let category = document.body.querySelectorAll(".subcategory");
        let target = e.target.closest('li');
        // переход не на <li> - игнорировать
        if (!target) return;

        for (let i = 0; i < category.length; i++) {
            category[i].classList.remove("active");
        }
        e.target.lastChild.classList.add("active");
    }


    let listCategory = categories["Вещи, электроника и прочее"].map((item) => {
        return (
            <ul key={item.category}>
                <li className='category-item' onMouseEnter={showSubcategory} style={{backgroundImage: "url(" + item.img + ")"}}>
                    <Link to="">{item.category}</Link>
                    <ul className="subcategory">
                        <h4>{item.category}</h4>
                        {item.subcategory.map((item2) =>
                            <li key={item2}>
                                <Link to="">{item2}</Link>
                            </li>
                        )}
                    </ul>
                </li>
            </ul>
        )}
    );

    return (
        <>
            <button className="btn-category" onClick={toggle}><i className="bi bi-list"></i>Категории</button>
                {isShow &&
                <div className="category">
                    <div className='container'>
                        <div className="row">
                            {listCategory}
                        </div>
                    </div>
                </div>
                }
        </>
    )
}