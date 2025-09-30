import ReactModal from 'react-modal';

export default function UnpublishModal({ 
    isOpen, 
    onClose, 
    product, 
    onAction, 
    loading = false 
}) {
    const APP_NAME = import.meta.env.VITE_APP_NAME;

    const handleAction = (status) => {
        onAction(product.id, status);
    };

    return (
        <ReactModal 
            className="ReactModal ReactModal-product" 
            overlayClassName="ReactModal-overlay" 
            isOpen={isOpen} 
            onRequestClose={onClose}
        >
            <div className="container">
                <div className="modal">
                    <i className="bi bi-x-lg" onClick={onClose}></i>
                    <div className="modal-product">
                        <div className="modal-product__header">
                            <img src={product?.product_image[0]?.url} alt={product?.name} />
                            <h4 className="price">{product?.price.toLocaleString('ru-RU')}</h4>
                            <h3>{product?.name}</h3>
                        </div>
                        <div>
                            <h2>Снять с продажи</h2>
                            <center>Выберите причину</center>
                        </div>
                        <div className='modal-product__footer'>
                            <button 
                                onClick={() => handleAction('sold')}
                                disabled={loading}
                            >
                                Я продал на {APP_NAME}
                            </button>
                            <button 
                                onClick={() => handleAction('sold')}
                                disabled={loading}
                            >
                                Я продал в другом месте
                            </button>
                            <button 
                                onClick={() => handleAction('inactive')} 
                                disabled={loading}
                            >
                                Другая причина
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}
