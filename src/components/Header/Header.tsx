import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const lastScrollPos = useRef(0);

    function toggleHeaderPosition() {
        const currentScrollPos = window.scrollY;

        if (headerRef.current) {
            currentScrollPos > lastScrollPos.current
            ? headerRef.current.setAttribute('data-hide', '')
            : headerRef.current.removeAttribute('data-hide');
        }

        lastScrollPos.current = currentScrollPos;
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleHeaderPosition);

        return () => {
            window.removeEventListener('scroll', toggleHeaderPosition);
        }
    }, []);
    
    return (
        <header className={styles.header} ref={headerRef}>
            <Link to={'/'} className={styles.anchor}>
                <div className={styles.logo}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230.504 230.504">
                        <path d="M230.342 34.09c1.876-1.651-12.827-7.155-28.609-12.184-6.896-2.198-10.968-6.99-22.376-6.187-14.789 0-26.123 20.712-32.216 31.513-7.655 13.57-24.085 18.145-34.864 28.717-32.453 31.824-61.877 68.51-94.93 101.02-34.531 33.965-11.609 28.819 17.539 9.948.656-.382 1.472-.796 2.404-1.231-18.746 20.518-1.249 15.809 20.508 1.723 6.132-3.569 19.83-11.032 41.59-11.082 14.903 7.767 27.691 27.686 27.935 28.251l-1.409.434c-2 .615-8.858 2.128-12.52 2.925l-.04.01c-.906.195-1.615.351-1.995.433l-1.683.369c-.351.076-.601.385-.6.745.001.357.253.667.604.74.677.144 1.454.209 2.443.209.441 0 .882-.013 1.308-.023.384-.011.757-.021 1.11-.021.379 0 1.534 0 1.823.332 1.396 1.612 2.962 2.361 4.933 2.361.935 0 1.86-.164 2.756-.322.864-.152 1.678-.298 2.493-.306 1.09-.012 2.209-.048 3.291-.082 1.292-.043 2.628-.086 3.929-.086 3.081 0 5.354.25 7.366.815 3.911 1.098 6.461 1.764 8.918 1.764 2.704 0 5.248-.771 9.72-2.951.49-.24 1.465-.279 1.832-.078 3.392 1.854 6.992 2.756 11.01 2.756 3.072 0 6.398-.521 10.467-1.64.394-.106.835-.159 1.353-.159.712 0 1.463.098 2.257.197.643.083 1.306.168 1.969.204h.05c.421 0 .761-.341.761-.761 0-.179-.061-.342-.163-.472l-.234-.413c-1.457-2.59-3.108-5.522-6.457-5.522-.643 0-1.332.112-2.049.335-2.604.812-5.118 1.223-7.474 1.223-6.813 0-12.728-3.199-18.354-10.279-11.392-14.342-6.3-27.127.182-42.293 10.437-24.431 25.335-42.77 34.216-72.751 3.303-11.151 6.112-32.978 18.552-35.675 2.366-.513 21.104-1.277 21.502-3.391.346-1.846-23.085-7.105-25.909-7.885 4.172.074 25.548.102 27.061-1.23zm-75.698 173.098c-1.839.629-3.667.947-5.446.947-4.469 0-8.781-1.943-13.187-5.939-4.611-4.187-9.761-20.194-9.761-20.194s13.323 10.651 16.703 13.504c4.166 3.516 8.464 7.145 11.691 11.682zm26.441-172.604c-2.301 0-4.167-1.865-4.167-4.167s1.866-4.166 4.167-4.166 4.167 1.866 4.167 4.167-1.865 4.166-4.167 4.166z"/>
                    </svg>
                    <h1>BookNest</h1>
                </div>
            </Link>
            <div className={styles.search} id="search-book">
                <input type="search" id="book-search" name="book" placeholder='Search book title'/>
                <button>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.9536 14.9458 21 21m-4-11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7 0-3.86599 3.13401-7 7-7 3.866 0 7 3.13401 7 7Z" stroke="rgb(255 255 255 / 85%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            <div className={styles.cart} id="cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 240">
                    <path d="M98.603439 154.170685c-1.383751-7.604981-2.710006-14.800598-4.044243-21.994736-1.145111-6.174377-2.297111-7.033996-8.244087-5.698715-2.250252.505257-4.376426.439018-6.249168-.779038-1.798676-1.169891-3.664108-1.450859-5.698746-1.368354-3.401161.137909-6.364715-.612107-7.6268-4.249222-.60495-1.743386-2.241379-1.835518-3.528042-2.476944-4.774822-2.380333-7.058026-6.425026-7.638272-11.529503-.328411-2.889099.845711-4.74102 4.023179-3.844688 5.370079 1.514862 10.557754.50315 15.783393-.639679 13.052498-2.854523 17.259476-.975396 22.132058 11.200981 2.980308 7.447639 7.250068 10.817589 15.764595 10.30352 12.950332-.781891 25.98899-.397698 38.979377-.075409 5.311112.131767 8.532227-1.930901 10.489624-6.588051.645081-1.534767 1.355667-3.042274 1.987564-4.582252 4.18866-10.208069 9.149399-12.989052 19.947266-10.714905 6.051575 1.274528 11.973343 2.784737 18.22078 1.009819 2.469436-.701576 3.796234 1.069496 3.747863 3.404365-.048446 2.339119-.420242 5.041123-2.102829 6.543061-5.601898 5.000435-9.609512 11.998413-18.701767 12.55088-4.580719.278336-8.925522 2.460343-13.90364 1.116707-2.001664-.540268-3.421143 2.022553-3.860062 4.427666-1.492218 8.176712-3.143433 16.324249-4.705811 24.488327-1.433105 7.488617-5.261612 11.233825-12.858184 11.379501-12.992997.249146-25.997742.242096-38.990815-.007721-7.378067-.141876-11.2266-3.910538-12.923233-11.87561m42.710266-7.212799c.787384-4.408753 1.632584-8.808289 2.336503-13.230332.326522-2.051269.388259-4.261108-2.594483-4.287292-7.437134-.065308-14.875206-.0215-22.964859-.0215.867859 9.655152 2.597923 18.365524 4.888603 26.971466.400063 1.503022 1.881569 2.240891 3.341469 2.774353 7.365906 2.691666 12.732239-.292709 14.221863-7.942199.222092-1.140427.363769-2.296524.770904-4.264496m4.770508 9.840301c-.744262 2.413803.592163 2.852204 2.594864 2.878586 3.330414.043884 6.839737-.29747 7.750336-3.970581 2.097381-8.460266 3.721588-17.043106 4.730774-25.698456-9.448471-1.603775-9.932587-1.332718-11.516342 6.950608-1.213807 6.348373-2.290879 12.7229-3.559632 19.839843m-43.582596-15.690811c.793801 3.882202 1.503632 7.783905 2.400467 11.642151 1.455468 6.261475 4.253434 7.800232 11.147652 6.057785-.395004-7.538727-2.471329-14.862915-3.706177-22.303726-1.278-7.700821-2.517883-8.268936-10.933708-6.422501-.891212 3.488892.859276 6.765366 1.091766 11.026291m72.726044-21.400032c3.865311-2.677635 8.001511-3.281609 12.991867-.782448-1.136719-5.479294.237366-7.868805 5.480545-6.568458 1.751694.43444 3.364548-.586434 4.651367-2.747208-5.496597.068382-10.209549-1.548103-15.072647-2.342773-8.717254-1.424477-12.474472 1.61409-13.343826 10.785713 1.577972.47982 3.13855.954353 5.292694 1.655174M66.235878 109.418312c-.740982.161392-1.685188-.174774-2.116905.915817 1.05854 1.687317 2.666664 2.650986 4.565178 2.091515 5.289528-1.558792 5.849456 1.542908 5.450844 5.524376 4.155944.311661 8.757408-3.508751 11.326972 2.070076 2.577919-.875481 4.738205-1.609146 6.882699-2.337433-2.549172-10.530991-5.089219-12.214058-15.213212-10.227768-3.408821.6688-6.828758 1.280907-10.895576 1.963417z"/>
                    <path d="M147.298767 104.760345c-.671814-.787918-1.119965-1.527023-1.667908-1.610374-9.414077-1.432281-18.869629-.818298-28.305091-.307487-1.744706.094451-2.647835 1.775032-2.992959 3.582847-.654068 3.426041-1.464851 6.822205-2.116035 10.248741-.493469 2.596619-1.996742 3.745484-4.572769 3.44397-3.281128-.384026-2.212151-2.783989-1.903626-4.589447.643181-3.763916 1.573624-7.477982 2.256501-11.236069.943107-5.190101 4.195823-8.05796 9.230552-8.194832 9.309609-.25309 18.637116-.194236 27.947464.073075 4.641098.133239 7.817734 2.766441 8.670822 7.516502.930176 5.179299 2.627915 10.240265 2.799271 15.632416-4.087952 1.893844-6.144348.529594-6.919601-3.474419-.694642-3.587654-1.495438-7.15477-2.426621-11.084923z"/>
                </svg>
                <span>SHOPPING CART</span>
            </div>
        </header>
    )
}
