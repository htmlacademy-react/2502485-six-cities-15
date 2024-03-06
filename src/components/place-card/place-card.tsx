import { Link } from 'react-router-dom';
import { TOfferCard } from '../../types';
import { AppRoute } from '../../const';
import { capitalizeFirstLetter } from '../../utils';

type PlaceCardProps = {
  offerCard: TOfferCard;
  handleHover: (offerCard?: TOfferCard) => void;
}

function PlaceCard ({ offerCard, handleHover }: PlaceCardProps):JSX.Element{
  const handleMouseOn = () => {
    handleHover(offerCard);
  };
  const handleMouseOFF = () =>{
    handleHover();
  };

  return(
    <Link to={`${AppRoute.OfferPage}/${offerCard.id}`}>
      <article
        className="cities__card place-card"
        onMouseEnter={handleMouseOn}
        onMouseLeave={handleMouseOFF}
      >
        { offerCard.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img className="place-card__image" src={offerCard.previewImage} width="260" height="200" alt="Place image" />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offerCard.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: '80%'}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">{offerCard.title}</h2>
          <p className="place-card__type">{capitalizeFirstLetter(offerCard.type)}</p>
        </div>
      </article>
    </Link>
  );
}

export default PlaceCard;
