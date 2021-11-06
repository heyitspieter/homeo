import Image from "next/image";
import className from "classnames";
import Svg from "src/components/Svg/Svg";
import styles from "src/components/Search/SearchForm/SearchForm.module.scss";

function SearchFormResults({ count }) {
  const resultsClass = className({
    [styles.results]: true,
    [styles.translateX_in__left]: count > 0,
  });

  return (
    <div className={resultsClass}>
      <div className={styles.results__count}>
        <h4>Showing 200 results</h4>
      </div>
      <div className={styles.results__list}>
        <div className={styles.results__list_item}>
          <div className={styles.item__overlay}>
            <div className={styles.overlay__row}>
              <span>For Sale</span>
              <button>
                <Svg className={styles.iconHeart} symbol="heart" />
              </button>
            </div>
            <div className={styles.overlay__row}>
              <h4>Luxury Family Loft by Victory Park</h4>
              <p>$7,200/mo</p>
            </div>
            <div className={styles.overlay__row}>
              <div>
                <Svg className={styles.iconBed} symbol="bed" />
                <span>4 Beds</span>
              </div>
              <div>
                <Svg className={styles.iconBathtub} symbol="bathtub" />
                <span>5 Baths</span>
              </div>
              <div>
                <Svg className={styles.iconGarage} symbol="garage" />
                <span>1 Garage</span>
              </div>
              <div>
                <Svg className={styles.iconRuler} symbol="ruler" />
                <span>1200 Sq ft</span>
              </div>
            </div>
          </div>
          <figure className={styles.item__img}>
            <Image
              src="/images/home-1.jpg"
              layout="responsive"
              height={200}
              width={300}
              alt="home 1"
            />
          </figure>
        </div>
        <div className={styles.results__list_item}>
          <div className={styles.item__overlay}>
            <div className={styles.overlay__row}>
              <span>For Sale</span>
              <button>
                <Svg className={styles.iconHeart} symbol="heart" />
              </button>
            </div>
            <div className={styles.overlay__row}>
              <h4>Luxury Family Loft by Victory Park</h4>
              <p>$7,200/mo</p>
            </div>
            <div className={styles.overlay__row}>
              <div>
                <Svg className={styles.iconBed} symbol="bed" />
                <span>4 Beds</span>
              </div>
              <div>
                <Svg className={styles.iconBathtub} symbol="bathtub" />
                <span>5 Baths</span>
              </div>
              <div>
                <Svg className={styles.iconGarage} symbol="garage" />
                <span>1 Garage</span>
              </div>
              <div>
                <Svg className={styles.iconRuler} symbol="ruler" />
                <span>1200 Sq ft</span>
              </div>
            </div>
          </div>
          <figure className={styles.item__img}>
            <Image
              src="/images/home-2.jpg"
              layout="responsive"
              height={200}
              width={300}
              alt="home 2"
            />
          </figure>
        </div>
        <div className={styles.results__list_item}>
          <div className={styles.item__overlay}>
            <div className={styles.overlay__row}>
              <span>For Sale</span>
              <button>
                <Svg className={styles.iconHeart} symbol="heart" />
              </button>
            </div>
            <div className={styles.overlay__row}>
              <h4>Luxury Family Loft by Victory Park</h4>
              <p>$7,200/mo</p>
            </div>
            <div className={styles.overlay__row}>
              <div>
                <Svg className={styles.iconBed} symbol="bed" />
                <span>4 Beds</span>
              </div>
              <div>
                <Svg className={styles.iconBathtub} symbol="bathtub" />
                <span>5 Baths</span>
              </div>
              <div>
                <Svg className={styles.iconGarage} symbol="garage" />
                <span>1 Garage</span>
              </div>
              <div>
                <Svg className={styles.iconRuler} symbol="ruler" />
                <span>1200 Sq ft</span>
              </div>
            </div>
          </div>
          <figure className={styles.item__img}>
            <Image
              src="/images/home-4.jpg"
              layout="responsive"
              height={200}
              width={300}
              alt="home 4"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default SearchFormResults;
