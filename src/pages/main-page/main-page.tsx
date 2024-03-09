
import Header from '../../components/header/header';
import Tabs from './tabs/tabs';
import OffersList from '../../components/offers-list/offers-list';
import { Helmet } from 'react-helmet-async';
import { TOfferCard } from '../../types';

type MainPageProps = {
  offerCards: TOfferCard[];
}

function MainPage ({ offerCards }: MainPageProps): JSX.Element{
  return(
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities. Main</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <OffersList placesCount={offerCards.length} offerCards={offerCards}/>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
