import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { BookHero, BookLoading } from '../Book/Book';

import getRequestWithNativeFetch from "../../utils/nativeFetch";
import BooksBySubject from "../../types/booksBySubject";

import styles from './Hero.module.scss'

interface HeroData {
    title: string;
    coverURL: string;
    id: string;
}

export default function Hero() {
    const [data, setData] = useState<HeroData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const carouselRef = useRef<HTMLDivElement | null>(null);
    const carouselIndicators = useRef<HTMLDivElement | null>(null);
    const carouselIndex = useRef(0);

    function generateHeroData(data:BooksBySubject[]) {
        const randomIndex = Math.floor(Math.random() * 10);
        const selectedBooks = data.map(subject => subject.works[randomIndex]);

        const heroBookData = selectedBooks.map(book => {
            const newData:HeroData = {
                'title': book.title,
                'coverURL': `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
                'id': book.key,
            };
            return newData;   
        });

        return heroBookData;
    }

    function randomOffset(maxNum:number) {
        return Math.floor(Math.random() * maxNum);
    }

    useEffect(() => {
        const thrillerSuspenseUrl = `https://openlibrary.org/subjects/fiction_thrillers_suspense.json?offset=${randomOffset(34200)}`;
        const historicalFictionUrl = `https://openlibrary.org/subjects/historical_fiction.json?offset=${randomOffset(7000)}`;
        const selfHelpUrl = `https://openlibrary.org/subjects/self-help.json?offset=${randomOffset(2300)}`;

        async function fetchHeroBooksData() {
            try {
                const result = await Promise.all([
                    getRequestWithNativeFetch(thrillerSuspenseUrl),
                    getRequestWithNativeFetch(historicalFictionUrl),
                    getRequestWithNativeFetch(selfHelpUrl)
                ]);

                const heroBooksDataJson = await result;
                const newHeroData =  generateHeroData(heroBooksDataJson);
                setData(newHeroData);
                setError(null);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        } 

        fetchHeroBooksData();
    }, []);

    function updateCarouselInterface() {
        if (carouselRef.current) {
            carouselRef.current.style.transform = `translate(-${carouselIndex.current * 100}%)`;
        }

        if (carouselIndicators.current) {
            for (const btn of carouselIndicators.current.children) {
                btn.removeAttribute('data-active');
            }

            carouselIndicators.current.children[carouselIndex.current].setAttribute('data-active', '');
        }
    }

    function slideCarouselLeft() {
        if (carouselRef.current) {
            carouselIndex.current === 0
            ? carouselIndex.current = carouselRef.current.childElementCount - 1
            : carouselIndex.current -= 1
        }
        updateCarouselInterface();
    }

    function slideCarouselRight() {
        if (carouselRef.current) {
            carouselIndex.current === carouselRef.current.childElementCount - 1
            ? carouselIndex.current = 0
            : carouselIndex.current += 1
        }
        updateCarouselInterface();
    }

    function selectCarouselIndicator(index:number) {
        carouselIndex.current = index;
        updateCarouselInterface();
    }

    return (
        <section className={styles.hero}>
            <div className={styles.subjectSearch}>
                <label htmlFor="book-search">Search book subject</label>
                <input type="search" id="book-search" name="book-subject"/>
                <button>Search</button>
            </div>
            <button 
                className={styles.sliderBtn} 
                data-dir="left" 
                onClick={() => slideCarouselLeft()}
            >
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffffda" transform="rotate(180)">
                    <path d="M256 120.768 306.432 64 768 512 306.432 960 256 903.232 659.072 512z"/>
                </svg>
            </button>
            <button 
                className={styles.sliderBtn} 
                data-dir="right" 
                onClick={() => slideCarouselRight()}
            >
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffffda">
                    <path d="M256 120.768 306.432 64 768 512 306.432 960 256 903.232 659.072 512z"/>
                </svg>
            </button>
            <div className={styles.carouselIndicators} ref={carouselIndicators}>
                    <button data-active onClick={() => selectCarouselIndicator(0)}>
                        <svg fill="#ffffffda" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                            <path d="M236.4375 73.34375 213.207 57.85547A60.00943 60.00943 0 0 0 96 76v17.19385L1.75293 211.00244A7.99963 7.99963 0 0 0 8 224h104a104.11791 104.11791 0 0 0 104-104v-19.71875l20.4375-13.625a7.99959 7.99959 0 0 0 0-13.3125Zm-126.292 67.77783-40 48a7.99987 7.99987 0 0 1-12.291-10.24316l40-48a7.99987 7.99987 0 0 1 12.291 10.24316ZM164 80a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"/>
                        </svg>
                    </button>
                    <button data-indicator="1" onClick={() => selectCarouselIndicator(1)}>
                        <svg fill="#ffffffda" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                            <path d="M236.4375 73.34375 213.207 57.85547A60.00943 60.00943 0 0 0 96 76v17.19385L1.75293 211.00244A7.99963 7.99963 0 0 0 8 224h104a104.11791 104.11791 0 0 0 104-104v-19.71875l20.4375-13.625a7.99959 7.99959 0 0 0 0-13.3125Zm-126.292 67.77783-40 48a7.99987 7.99987 0 0 1-12.291-10.24316l40-48a7.99987 7.99987 0 0 1 12.291 10.24316ZM164 80a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"/>
                        </svg>
                    </button>
                    <button data-indicator="2" onClick={() => selectCarouselIndicator(2)}>
                        <svg fill="#ffffffda" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                            <path d="M236.4375 73.34375 213.207 57.85547A60.00943 60.00943 0 0 0 96 76v17.19385L1.75293 211.00244A7.99963 7.99963 0 0 0 8 224h104a104.11791 104.11791 0 0 0 104-104v-19.71875l20.4375-13.625a7.99959 7.99959 0 0 0 0-13.3125Zm-126.292 67.77783-40 48a7.99987 7.99987 0 0 1-12.291-10.24316l40-48a7.99987 7.99987 0 0 1 12.291 10.24316ZM164 80a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"/>
                        </svg>
                    </button>
            </div>

            <div className={styles.carouselContainer} ref={carouselRef}> 
                <div className={styles.categoryHighlight} data-highlight="1">
                    {loading? (
                        <BookLoading />
                    ) : data? (
                        <BookHero
                            coverURL={data[0].coverURL} 
                            title={data[0].title} 
                            id={data[0].id}
                        />
                    ) : (
                        <div>Error</div>
                    )}
                    <h2>THRILLERS, SUSPENSE</h2>
                    <p>
                        Heart-pounding reads that keep you guessing, perfect for those who crave adrenaline-fueled adventures and can't resist a good plot twist.
                    </p>
                    <button>SHOP NOW</button>
                </div>
                
                <div className={styles.categoryHighlight} data-highlight="2">
                    {loading ? (
                        <BookLoading />
                    ) : data? (
                        <BookHero
                            coverURL={data[1].coverURL} 
                            title={data[1].title} 
                            id={data[1].id}
                        />
                    ) : (
                        <div>Error</div>
                    )}
                    <h2>HISTORICAL FICTION</h2>
                    <p>
                        Journey through time and different eras with captivating tales. These books promise to educate, entertain, and inspire.
                    </p>
                    <button>SHOP NOW</button>
                </div>
                
                <div className={styles.categoryHighlight} data-highlight="3">
                    {loading? (
                        <BookLoading />
                    ) : data? (
                        <BookHero
                            coverURL={data[2].coverURL} 
                            title={data[2].title} 
                            id={data[2].id}
                        />
                    ) : (
                        <div>Error</div>
                    )}
                    <h2>SELF-HELP</h2>
                    <p>
                        Your companions on the journey to becoming your best self, whether you're seeking to improve your mindset, build better habits, or navigate life's challenges.
                    </p>
                    <button>SHOP NOW</button>
                </div>
            </div>
        </section>
    )
}
