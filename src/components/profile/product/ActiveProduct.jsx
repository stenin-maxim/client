import { useSelector } from 'react-redux';
import { useProductActions } from '../../../hooks/useProductActions';
import { useUnpublishModal } from '../../../hooks/useUnpublishModal';
import ProductCard from './ProductCard';
import UnpublishModal from '../../modal/UnpublishModal';

export default function ActiveProduct() {
    const userProducts = useSelector(state => state.userProduct.userProducts) || [];
    const { setStatusProduct, loading } = useProductActions();
    const { modalIsOpen, product, openModal, closeModal } = useUnpublishModal();
    const userProductsActive = userProducts.filter((item) => item.status === 'active');

    const handleSetStatusProduct = async (productId, status) => {
        try {
            await setStatusProduct(productId, status);
            closeModal();
        } catch (error) {
            // Ошибка уже обработана в хуке
        }
    };

    const actions = [
        { type: 'button', label: 'Продать быстрее', disabled: loading },
        { type: 'link', label: 'Редактировать', to: `/product/${userProductsActive[0]?.id}/edit` },
        { type: 'button', label: 'Снять с публикации', onClick: openModal }
    ];

    return (
        <>
            {userProductsActive?.length > 0 ? (
                <>
                    {userProductsActive?.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            actions={actions.map(action => ({
                                ...action,
                                to: action.type === 'link' ? `/product/${item.id}/edit` : undefined
                            }))}
                            onActionClick={(action) => {
                                if (action.label === 'Снять с публикации') {
                                    openModal(item);
                                }
                            }}
                            showExpiresAt={true}
                        />
                    ))}
                    <UnpublishModal
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        product={product}
                        onAction={handleSetStatusProduct}
                        loading={loading}
                    />
                </>
            ) : (
                <center>Все созданные объявления будут отображаться на этой странице.</center>
            )}
        </>
    );
}
