import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Book, BookHero, BookLoading, BookError } from './Book/Book';
import { LinkPrimary, LinkSecondary } from '../Links/Links';

import getRequestWithNativeFetch from "../../utils/nativeFetch";
import BooksBySubject from "../../types/booksBySubject";

import styles from './Hero.module.scss'

export default function Hero() {
    const [data, setData] = useState<Book[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const carouselRef = useRef<HTMLDivElement | null>(null);
    const carouselIndicators = useRef<HTMLDivElement | null>(null);
    const carouselIndex = useRef(0);

    function generateHeroData(data:BooksBySubject[]) {
        const selectedBooks = data.map(subject => {
            //  choose book that has a cover_id
            let selectedBook;
            const booksIndex = [...Array(subject.works.length).keys()];

            while(booksIndex.length > 0) {
                const selectedIndex = Math.floor(Math.random() * booksIndex.length);
                selectedBook = subject.works[selectedIndex];

                if (selectedBook.cover_id !== null) {
                    break;
                }

                booksIndex.splice(booksIndex.indexOf(selectedIndex), 1);
            }

            return selectedBook;
        });

        const heroBookData = selectedBooks.map(book => {
            const newData = {
                title: book.title,
                coverID: book.cover_id,
                bookKey: book.key,
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
        const actionAdventureUrl = `https://openlibrary.org/subjects/fiction_action_&_adventure.json?offset=${randomOffset(33300)}`

        async function fetchHeroBooksData() {   
            try {
                const result = await Promise.all([
                    getRequestWithNativeFetch(thrillerSuspenseUrl),
                    getRequestWithNativeFetch(historicalFictionUrl),
                    getRequestWithNativeFetch(selfHelpUrl),
                    getRequestWithNativeFetch(actionAdventureUrl)
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
                    <button data-indicator="3" onClick={() => selectCarouselIndicator(3)}>
                        <svg fill="#ffffffda" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                            <path d="M236.4375 73.34375 213.207 57.85547A60.00943 60.00943 0 0 0 96 76v17.19385L1.75293 211.00244A7.99963 7.99963 0 0 0 8 224h104a104.11791 104.11791 0 0 0 104-104v-19.71875l20.4375-13.625a7.99959 7.99959 0 0 0 0-13.3125Zm-126.292 67.77783-40 48a7.99987 7.99987 0 0 1-12.291-10.24316l40-48a7.99987 7.99987 0 0 1 12.291 10.24316ZM164 80a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"/>
                        </svg>
                    </button>
            </div>

            <div className={styles.carouselContainer} ref={carouselRef}> 
                <div className={styles.categoryHighlight} data-highlight="1">
                    <div className={styles.wrapper}>
                        {loading? (
                            <BookLoading />
                        ) : data? (
                            <BookHero
                                coverID={data[0].coverID} 
                                title={data[0].title} 
                                bookKey={data[0].bookKey}
                            />
                        ) : (
                            <BookError/>
                        )}
                        <h1>THRILLERS, SUSPENSE</h1>
                        <p>
                            Heart-pounding reads that keep you guessing, perfect for those who crave adrenaline-fueled adventures and can't resist a good plot twist.
                        </p>
                        <LinkPrimary address={'/'} text={'SHOP NOW'} />
                    </div>
                </div>
                
                <div className={styles.categoryHighlight} data-highlight="2">
                    <div className={styles.wrapper}>
                        {loading ? (
                            <BookLoading />
                        ) : data && !error? (
                            <BookHero
                                coverID={data[1].coverID} 
                                title={data[1].title} 
                                bookKey={data[1].bookKey}
                            />
                        ) : (
                            <BookError />
                        )}
                        <h1>HISTORICAL FICTION</h1>
                        <p>
                            Journey through time and different eras with captivating tales. These books promise to educate, entertain, and inspire.
                        </p>
                        <LinkPrimary address={'/'} text={'SHOP NOW'} />
                    </div>
                </div>
                
                <div className={styles.categoryHighlight} data-highlight="3">
                    <div className={styles.wrapper}>
                        {loading? (
                            <BookLoading />
                        ) : data && !error? (
                            <BookHero
                                coverID={data[2].coverID} 
                                title={data[2].title} 
                                bookKey={data[2].bookKey}
                            />
                        ) : (
                            <BookError />
                        )}
                        <h1>SELF-HELP</h1>
                        <p>
                            Your companions on the journey to becoming your best self, whether you're seeking to improve your mindset, build better habits, or navigate life's challenges.
                        </p>
                        <LinkPrimary address={'/'} text={'SHOP NOW'} />
                    </div>
                </div>

                <div className={styles.categoryHighlight} data-highlight="4">
                    <div className={styles.wrapper}>
                        {loading? (
                            <BookLoading />
                        ) : data && !error? (
                            <BookHero
                                coverID={data[3].coverID} 
                                title={data[3].title} 
                                bookKey={data[3].bookKey}
                            />
                        ) : (
                            <BookError />
                        )}
                        <h1>ACTION & ADVENTURE</h1>
                        <p>
                            Embark on thrilling journeys with unforgettable heroes and daring exploits, filled with excitement and challenges that will keep you hooked from start to finish.
                        </p>
                        <LinkPrimary address={'/'} text={'SHOP NOW'} />
                    </div>
                </div>
            </div>
        </section>
    )
}
