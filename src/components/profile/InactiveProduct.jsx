import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useStatusProductMutation, useDeleteUserProductMutation } from '../../api/productApi';
import { updateUserProductValue, removeUserProduct } from '../../features/userProduct/userProductSlice';

export default function InactiveProduct() {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.userProduct.userProducts);
    const [loading, setLoading] = useState(false); // отменить многочисленное нажатие кнопки, при отправке данных
    const [statusProduct, { isLoading: isStatusProduct }] = useStatusProductMutation();
    const [deleteUserProduct, { isLoading: isDelete }] = useDeleteUserProductMutation();
    let userProductsNoActive = userProducts?.filter((item) => item.status === 'noactive');
    
    const setStatusProduct = async (productId, status) => {
        setLoading(true);
        try {
            const result = await statusProduct({productId, status}).unwrap();
            dispatch(updateUserProductValue({ id: productId, value: result.data.status }));
            alert(result.message);
        } catch (error) {
            alert(`Ошибка публикации: ${error.message || 'Неизвестная ошибка'}`);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (productId) => {
        setLoading(true);
        let confirmResult = confirm("Вы действительно хотите удалить объявление?");

        if (confirmResult) {
            try {
                const result = await deleteUserProduct(productId).unwrap();
                dispatch(removeUserProduct(productId));
                alert(result.message);
            } catch (error) {
                console.error('Ошибка удаление продукта:', error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            {userProductsNoActive?.length > 0 ? 
                <>
                    {userProductsNoActive?.map((item) => {
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
                                            <li><Link to={`/product/${item.id}/edit`}><button>Редактировать</button></Link></li>
                                            <li><button onClick={() => setStatusProduct(item.id, 'active')} disabled={loading || isStatusProduct}>Опубликовать повторно</button></li>
                                            <li><button onClick={() => deleteProduct(item.id)} disabled={loading || isDelete }>Удалить</button></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <button className='btn' onClick={() => setStatusProduct(item.id, 'active')} disabled={loading || isStatusProduct}>Опубликовать повторно</button>
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
                </> : <center>Заблокированные и неактивные объявления будут отображаться на этой странице.</center>
            }
        </>
    )
}