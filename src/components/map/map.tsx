import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { TOfferCard } from '../../types';
import { Nullable } from 'vitest';
import useMap from '../../hooks/useMap';
import { Settings} from '../../const';

type MapProps = {
  className: string;
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

function Map ({className, offerCards, activeOfferCard}: MapProps): JSX.Element{
  const city = offerCards[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if(map){
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }

  }, [city, map, activeOfferCard]);

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
          .addTo(markerLayer.current);
      });
    }
  }, [map, offerCards, activeOfferCard]);

  return(
    <section
      className={`${className} map`}
      style={className === 'offer__map' ? {width: '1144px', marginLeft: 'auto', marginRight: 'auto'} : {}}
      ref={mapRef}
    />
  );
}

export default Map;
