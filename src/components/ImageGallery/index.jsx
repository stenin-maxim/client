import { useState, useMemo, useRef, useEffect } from 'react';
import "./ImageGallery.scss";

export default function ImageGallery({ images = [] }) {
    const safeImages = useMemo(() => images.filter(Boolean), [images]);
    const [index, setIndex] = useState(0);
    const trackRef = useRef(null);

    useEffect(() => {
        if (index >= safeImages.length) setIndex(0);
    }, [safeImages.length, index]);

    const prev = () => setIndex(i => (i - 1 + safeImages.length) % safeImages.length);
    const next = () => setIndex(i => (i + 1) % safeImages.length);
    const select = (i) => setIndex(i);

    if (!safeImages.length) return null;

    return (
        <div className="gallery">
            <div className="gallery-main">
                <button className="nav-btn left" onClick={prev} aria-label="prev">‹</button>
                <img src={safeImages[index].url} alt="" className="main-img" />
                <button className="nav-btn right" onClick={next} aria-label="next">›</button>
            </div>

            <div className="thumbs" ref={trackRef}>
                {safeImages.map((item, i) => (
                    <button
                        key={item.id}
                        className={`thumb ${i === index ? 'active' : ''}`}
                        onClick={() => select(i)}
                        aria-label={`image ${i + 1}`}
                        title={`Фото ${i + 1}`}
                    >
                        <img src={item.url} alt="" />
                    </button>
                ))}
            </div>
        </div>
    );
}