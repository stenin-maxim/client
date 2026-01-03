import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { useGetProductByUlidQuery, useToggleFavoriteMutation } from '@/api/productApi';
import ImageGallery from '@/components/ImageGallery';
import UnpublishModal from '@/components/modal/UnpublishModal';
import { useUnpublishModal } from '@/hooks/useUnpublishModal';
import { useProductActions } from '@/hooks/useProductActions';
import { Link } from 'react-router';

export default function ProductULID() {
    const { ulid } = useParams();
    const { setStatusProduct, deleteProduct, loading } = useProductActions();
    const { modalIsOpen, openModal, closeModal } = useUnpublishModal();
    const { isFetching, isError } = useGetProductByUlidQuery({ulid});
    const [toggleFavorite] = useToggleFavoriteMutation();
    const navigate = useNavigate();
    const product = useSelector(state => state.product.products.find(p => String(p.ulid) === String(ulid)));
    const currentUser = useSelector(state => state.auth.user); // Получить текущего авторизованного пользователя
    const isOwner = currentUser && product && currentUser.id === product.user_id;

    const handleSetStatusProduct = async (productId, status) => {
        try {
            await setStatusProduct(productId, status);
            closeModal();
            navigate('/profile')
        } catch (error) {
            // Ошибка уже обработана в хуке
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId);
        } catch (error) {
            alert(error.data.message);
        }
        navigate('/profile');
    }


    if (isFetching && !product) return <>Загрузка...</>;
    if (isError && !product) return <>Ошибка загрузки</>;

    const handleFavorite = async (e, product_ulid) => {
        e.stopPropagation(); // 1. Останавливаем всплытие события к родителю (тегу <a>)
        e.preventDefault(); // 2. На всякий случай предотвращаем действие по умолчанию
        
        try {
            await toggleFavorite({product_ulid}).unwrap();
        } catch (err) {
            console.error("Ошибка при смене статуса избранного:", err);
        }
    }

    return (
        <>
            <div className="product-user">
                <div className="row">
                    <div className="col-9">
                        <div className="product-user__header">
                            <h2>{product?.name}</h2>
                            {isOwner && (
                                <div>
                                    {(product?.status === 'inactive' || product?.status === 'sold') && (
                                        <>
                                            <button onClick={() => handleDeleteProduct(product?.id)}>Удалить объявление</button>
                                        </>
                                    )}
                                    {(product?.status === 'inactive' || product?.status === 'active') && (
                                        <Link to={`/product/${product?.id}/edit`}>Редактировать</Link>
                                    )}
                                </div>
                            )}
                            {!isOwner && currentUser && (
                                <div className='favorite' onClick={(e) => handleFavorite(e, product.ulid)}>
                                    <i className={`bi ${product.is_favorite ? 'bi-heart-fill' : 'bi-heart'}`}
                                        title={product.is_favorite ? "Удалить из избранного" : "Добавить в избранное"}
                                    >
                                    </i>
                                    <span>{product.is_favorite ? "Удалить из избранного" : "Добавить в избранное"}</span>
                                </div>
                            )}
                        </div>
                        <div className="badge">
                            {(product?.status === 'inactive') && (<div className="inactive-text" >Приостановлено</div>)}
                            {(product?.status === 'sold') && (<div className="sold-text" >Продано</div>)}
                        </div>
                        <ImageGallery images={product?.product_image} />
                        <ul>
                            <li>
                                <dl>
                                    <dt>Местоположение</dt>
                                    <dd>{product?.location?.city}</dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>Описание</dt>
                                    <dd>{product?.desc}</dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>Категория</dt>
                                    <dd>{product?.category?.name}</dd>
                                </dl>
                                <dl>
                                    <dt>Подкатегория</dt>
                                    <dd>{product?.subcategory?.name}</dd>
                                </dl>
                                <dl>
                                    <dt>Состояние товара</dt>
                                    <dd>{product?.item_condition}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <div className='product-user__header'>
                            <h2 className='price'>{product?.price?.toLocaleString('ru-RU')}</h2>
                        </div>
                        {isOwner && (
                            <table>

                                {(product?.status === 'inactive' || product?.status === 'active') && (
                                    <tbody>
                                        <tr>
                                            <th>В избранном</th>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <th>Просмотры</th>
                                            <td>0</td>
                                        </tr>
                                            <tr>
                                                <th>Размещено</th>
                                                <td>{product?.created_at}</td>
                                            </tr>
                                    </tbody>
                                )}
                            </table>
                        )}
                        {isOwner && (
                            <div>
                                {(product?.status === 'active') && (
                                    <>
                                        <button className='btn'>Продать быстрее</button>
                                        <button className='btn' onClick={openModal}>Снять с публикации</button>
                                        <UnpublishModal
                                            isOpen={modalIsOpen}
                                            onClose={closeModal}
                                            product={product}
                                            onAction={handleSetStatusProduct}
                                            loading={loading}
                                        />
                                    </>
                                )}
                                {(product?.status === 'inactive') && (
                                    <>
                                        <button className='btn' 
                                            onClick={() => handleSetStatusProduct(product?.id, 'active')}>Опубликовать повторно</button>
                                    </> 
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}