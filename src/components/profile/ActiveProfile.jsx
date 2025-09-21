import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import ReactModal from 'react-modal';

export default function ActiveProfile() {
    const APP_NAME = import.meta.env.VITE_APP_NAME;
    const userProducts = useSelector(state => state.userProduct.userProducts);
    const [loading, setLoading] = useState(false); // отменить многочисленное нажатие кнопки, при отправке данных
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [product, setProduct] = useState();
    let userProductsActive = userProducts?.filter((item) => item.status === 'active');
    let openModal = (item) => {
        console.log(item);
        setProduct(item)
        setModalIsOpen(true);
    },
        closeModal = () => { setModalIsOpen(false); };

    return (
        <>
            {userProductsActive?.map((item) => {
                return (
                    <div className="profile-item" key={item.id}>
                        <div className='profile-item__left'>
                            <div>
                                <Link to="">
                                    <img src={item.product_image[0].url} />
                                </Link>
                            </div>
                            <div className="profile-item__desc">
                                <h3><Link to="">{item.name}</Link></h3>
                                <h4 className="price">{item.price.toLocaleString('ru-RU')}</h4>
                                <div>Кол-во: {item.amount} шт.</div>
                                <div>{item.location}</div>
                            </div>
                        </div>
                        <div className='profile-item__right'>
                            <div className="profile-item__menu">
                                <i className="bi bi-three-dots"></i>
                                <ul>
                                    <li><button disabled={loading}>Продать быстрее</button></li>
                                    <li><Link to={`/product/${item.id}/edit`}><button>Редактировать</button></Link></li>
                                    <li><button onClick={() => openModal(item)}>Снять с публикации</button></li>
                                </ul>
                            </div>
                            <div>
                                Осталось дней: {item.expires_at}
                            </div>
                            <div className='profile-item__group'>
                                <div className='profile-item__views'>
                                    <i className="bi bi-eye" title="Просмотры"></i>
                                    <span>0</span>
                                </div>
                                <div>
                                    <i className="bi bi-heart-fill" title="Избранное"></i>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })}
            <ReactModal className="ReactModal ReactModal-product" overlayClassName="ReactModal-overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className="container">
                    <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModal}></i>
                        <div className="modal-product">
                            <div className="modal-product__header">
                                <img src={product?.product_image[0]?.url} />
                                <h4 className="price">{product?.price.toLocaleString('ru-RU')}</h4>
                                <h3>{product?.name}</h3>
                            </div>
                            <div>
                                <h2>Снять с продажи</h2>
                                <center>Выберите причину</center>
                            </div>
                            <div className='modal-product__footer'>
                                <button>Я продал на {APP_NAME}</button>
                                <button>Я продал в другом месте</button>
                                <button>Другая причина</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}