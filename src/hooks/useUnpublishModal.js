import { useState } from 'react';

export const useUnpublishModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [product, setProduct] = useState(null);

    const openModal = (item) => {
        setProduct(item);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setProduct(null);
    };

    return {
        modalIsOpen,
        product,
        openModal,
        closeModal
    };
};
