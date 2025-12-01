import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { useGetProductByIdQuery } from '@/api/userProductApi';
import ImageGallery from '@/components/ImageGallery';
import UnpublishModal from '@/components/modal/UnpublishModal';
import { useUnpublishModal } from '@/hooks/useUnpublishModal';
import { useProductActions } from '@/hooks/useProductActions';
import { Link } from 'react-router';

export default function ProductULID() {
    const { ulid } = useParams();
    const navigate = useNavigate();
    const { setStatusProduct, deleteProduct, loading } = useProductActions();
    const { modalIsOpen, openModal, closeModal } = useUnpublishModal();
    const productFromState = useSelector(state => state.userProduct.userProducts || []).find(p => String(p.ulid) === String(ulid));
    const { data: apiResp, isFetching, isError } = useGetProductByIdQuery(ulid, {
        skip: !!productFromState
    });
    const apiProduct = apiResp?.data || apiResp || null;
    const product = productFromState || apiProduct;
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

    if (!product && isFetching) return <>Загрузка...</>;
    if (!product && isError) return <>Ошибка загрузки</>;

    return (
        <>
            <div className="product-user">
                <div className="row">
                    <div className="col-9">
                        <div className="product-user__header">
                            <h2>{product?.name}</h2>
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
                                    <dd>{product?.location.city}</dd>
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
                                    <dd>{product?.category.name}</dd>
                                </dl>
                                <dl>
                                    <dt>Подкатегория</dt>
                                    <dd>{product?.subcategory.name}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <div className='product-user__header'>
                            <h2 className='price'>{product?.price.toLocaleString('ru-RU')}</h2>
                        </div>
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
                </div>
            </div>
        </>
    )
}