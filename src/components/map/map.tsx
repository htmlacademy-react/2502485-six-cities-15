import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { TOfferCard } from '../../types';
import { Nullable } from 'vitest';
import useMap from '../../hooks/useMap';
import { Settings} from '../../const';

type MapProps = {
  offerCards: TOfferCard[];
  activeOfferCard: Nullable<TOfferCard>;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: Settings.URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: Settings.URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

function Map ({offerCards, activeOfferCard}: MapProps): JSX.Element{
  const mapRef = useRef(null);
  const map = useMap(mapRef, offerCards[0].city);

  useEffect(() => {
    if (map) {
      offerCards.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === activeOfferCard?.id ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offerCards, activeOfferCard]);

  return(
    <section className="cities__map map" style={{height: '100%', width: '100%'}} ref={mapRef} />
  );
}

export default Map;
