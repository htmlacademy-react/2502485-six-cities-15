
import { useState } from 'react';
import PlaceCard from '../../components/place-card/place-card';
import OffersSortingForm from '../../components/offers-sorting-form/offers-sorting-form';
import Map from '../map/map';
import { Nullable } from 'vitest';
import { TOfferCard } from '../../types';

type OffersListProprs = {
  placesCount: number;
  offerCards: TOfferCard[];
}

function OffersList ({ placesCount, offerCards }: OffersListProprs):JSX.Element{
  const [activeOfferCard, setActiveOfferCard] = useState<Nullable<TOfferCard>>(null);
  const handleHover = (offerCard?: TOfferCard) => {
    setActiveOfferCard(offerCard || null);
  };

  return(
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesCount} places to stay in Amsterdam</b>
        <OffersSortingForm />
        <div className="cities__places-list places__list tabs__content">
          {
            offerCards.map((offerCard)=>(
              <PlaceCard key={offerCard.id} offerCard={offerCard} handleHover={handleHover} />
            ))
          }
        </div>
      </section>
      <div className="cities__right-section">
        <Map className="cities__map" offerCards={offerCards} activeOfferCard={activeOfferCard} />
      </div>
    </div>
  );
}

export default OffersList;
