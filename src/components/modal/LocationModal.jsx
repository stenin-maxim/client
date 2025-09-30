import { useState } from 'react';
import ReactModal from 'react-modal';
import cities from "../../assets/cities.json";

export default function LocationModal() {
    ReactModal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [location, setLocation] = useState("Вся Россия(все регионы)");
    let openModal = () => { setModalIsOpen(true); };
    let closeModal = () => { setModalIsOpen(false); };

    function checkedLocation(e) {
        setLocation(e.target.innerText);
        closeModal();
    }

    return (
        <>
            <div className="location" onClick={openModal}>
                <i className="bi bi-geo-alt"></i>
                <span>{location}</span>
            </div>
            <ReactModal className="ReactModal ReactModal-location" overlayClassName="ReactModal-overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className="container">
                    <div className="modal-location">
                        <i className="bi bi-x-lg" onClick={closeModal}></i>
                        <h2>Выберите город из списка</h2>
                        <div className="row">
                            <div className="col-3">
                                {cities.cities.map((item, index) => {
                                    if (index < 24) {
                                        return (
                                            <div key={item}><span className="city" onClick={checkedLocation}>{item}</span></div>
                                        )
                                    } 
                                })}
                            </div>
                            <div className="col-3">
                                {cities.cities.map((item, index) => {
                                    if (index >= 24 && index < 48) {
                                        return (
                                            <div key={item}><span className="city" onClick={checkedLocation}>{item}</span></div>
                                        )
                                    } 
                                })}
                            </div>
                            <div className="col-3">
                                {cities.cities.map((item, index) => {
                                    if (index >= 48 && index < 72) {
                                        return (
                                            <div key={item}><span className="city" onClick={checkedLocation}>{item}</span></div>
                                        )
                                    } 
                                })}
                            </div>
                            <div className="col-3">
                                {cities.cities.map((item, index) => {
                                    if (index > 72) {
                                        return (
                                            <div key={item}><span className="city" onClick={checkedLocation}>{item}</span></div>
                                        )
                                    } 
                                })}
                            </div>
                            <div className="col-12">
                                <div className='all-city'>
                                    <span onClick={checkedLocation} className="city">Вся Россия(все регионы)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}