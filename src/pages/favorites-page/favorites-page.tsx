import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { TOfferCard } from '../../types';

type FavoritesPageProps = {
  favoriteOffers: TOfferCard[];
}

function FavoritesPage ({favoriteOffers}:FavoritesPageProps): JSX.Element{
  const favoritesOffersGroupByCity = favoriteOffers.reduce<Record<string, TOfferCard[]>>((accumulator, currentValue) => {
    accumulator[currentValue.city.name] = accumulator[currentValue.city.name] || [];
    accumulator[currentValue.city.name].push(currentValue);
    return accumulator;
  }, {});
  const favoritsOffersToDisplay = [];
  for(const city in favoritesOffersGroupByCity){
    favoritsOffersToDisplay.push(
      <li key={city} className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item locations__item-link">
            <span>{city}</span>
          </div>
        </div>
        <div className="favorites__places">
          {
            favoritesOffersGroupByCity[city].map((favoriteOfferCard:TOfferCard)=>(
              <PlaceCard key={favoriteOfferCard.id} offerCard={favoriteOfferCard} isFavoritesPage />
            ))
          }
        </div>
      </li>
    );
  }

  return(
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoritsOffersToDisplay}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
