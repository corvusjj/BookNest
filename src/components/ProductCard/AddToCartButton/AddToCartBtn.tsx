import styles from "./AddToCartBtn.module.scss";

export default function AddToCartBtn({active}) {
    return (
        <button className={styles.addCartBtn}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#ffffffda" strokeWidth=".984">
                <path d="m2 3 .26491.0883c1.32004.44002 1.98006.66002 2.35757 1.1838C5 4.79587 5 5.49159 5 6.88304V9.5c0 2.8284 0 4.2426.87868 5.1213C6.75736 15.5 8.17157 15.5 11 15.5h8" strokeLinecap="round"/>
                <path d="M7.5 18c.82843 0 1.5.6716 1.5 1.5S8.32843 21 7.5 21 6 20.3284 6 19.5 6.67157 18 7.5 18ZM16.5 18.0001c.8284 0 1.5.6715 1.5 1.5 0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5c0-.8285.6716-1.5 1.5-1.5ZM5 6h11.4504c2.055 0 3.0824 0 3.5271.67426.4446.67427.0398 1.61868-.7697 3.50754l-.4286 1c-.3779.8818-.5669 1.3227-.9426 1.5705C17.4609 13 16.9812 13 16.0218 13H5"/>
              </g>
            </svg>
        </button>
    );
}
