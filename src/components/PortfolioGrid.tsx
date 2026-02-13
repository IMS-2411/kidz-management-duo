import Image from 'next/image';

const items = [
    { id: 1, src: '/thumb1.jpg', alt: 'Portfolio 1' },
    { id: 2, src: '/thumb2.jpg', alt: 'Portfolio 2' },
    { id: 3, src: '/thumb3.jpg', alt: 'Portfolio 3' },
    { id: 4, src: '/thumb4.jpg', alt: 'Portfolio 4' },
    { id: 5, src: '/thumb5.jpg', alt: 'Portfolio 5' },
    { id: 6, src: '/thumb6.jpg', alt: 'Portfolio 6' },
];

export default function PortfolioGrid() {
    return (
        <section id="portfolio" className="section-padding container">
            <div className="section-header">
                <p>Selected Works</p>
                <h2>The Collection</h2>
            </div>

            <div className="grid">
                {items.map((item) => (
                    <div key={item.id} className="portfolio-item">
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="portfolio-overlay">View</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
