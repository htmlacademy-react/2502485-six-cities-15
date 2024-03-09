import { Link } from 'react-router-dom';
import { TOfferCard } from '../../types';
import { AppRoute } from '../../const';
import { capitalizeFirstLetter } from '../../utils';
import { Settings } from '../../const';

type PlaceCardProps = {
  offerCard: TOfferCard;
  handleHover?: (offerCard?: TOfferCard) => void;
  isFavoritesPage?: boolean;
}

function PlaceCard ({ offerCard, handleHover, isFavoritesPage }: PlaceCardProps):JSX.Element{
  const handleMouseOn = () => {
    if(handleHover){
      handleHover(offerCard);
    }
  };
  const handleMouseOFF = () =>{
    if(handleHover){
      handleHover();
    }
  };

  return(
    <Link
      to={`${AppRoute.OfferPage}/${offerCard.id}`}
      className={`${isFavoritesPage ? 'favorites__card' : 'cities__card'} place-card`}
    >
      <article
        className={`${isFavoritesPage ? 'favorites__card' : 'cities__card'} place-card`}
        onMouseEnter={handleMouseOn}
        onMouseLeave={handleMouseOFF}
      >
        { offerCard.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
        <div className={`${isFavoritesPage ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
          <img
            className="place-card__image"
            src={offerCard.previewImage}
            width={isFavoritesPage ? '150' : '260'}
            height={isFavoritesPage ? '110' : '200'}
            alt="Place image"
          />
        </div>
        <div className={`${isFavoritesPage && 'favorites__card-info'} place-card__info`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offerCard.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={`place-card__bookmark-button ${offerCard.isFavorite && 'place-card__bookmark-button--active'} button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${offerCard.rating * (100 / Settings.maxRating)}%` }} />
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
