export default function Hero() {
    return (
        <section className="hero-section">
            <div id="subject-search">
                <label htmlFor="book-search">Search book subject</label>
                <input type="search" id="book-search" name="book-subject"/>
                <button>Search</button>
            </div>
            <div className="carousel-container">
                {/* mystery-thriller, historical-fiction, self-help */}
                <div className="category-highlight">
                    <div className="book-image"></div>
                    <h2></h2>
                    <p></p>
                    <button>Shop Now</button>
                </div>
            </div>
        </section>
    )
}
