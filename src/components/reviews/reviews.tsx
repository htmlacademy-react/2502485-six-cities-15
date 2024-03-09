import ReviewForm from '../review-form/review-form';
import { Settings } from '../../const';
import { TComment } from '../../types';

type ReviewsProps = {
  isAuth:boolean;
  comments: TComment[];
}

function Reviews ({ isAuth, comments }: ReviewsProps):JSX.Element{
  return(
    <>
      <ul className="reviews__list">
        {
          comments.map((comment)=>(
            <li key={comment.id} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                </div>
                <span className="reviews__user-name">{comment.user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: `${comment.rating * (100 / Settings.maxRating)}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  {/* {comment.rating} */}
                </div>
                <p className="reviews__text">{comment.comment}</p>
                <time className="reviews__time" dateTime="2019-04-24">
                  {new Date(comment.date).toLocaleString('en-us', {month:'long', year:'numeric'})}
                </time>
              </div>
            </li>
          ))
        }
      </ul>
      {isAuth && <ReviewForm />}
    </>
  );
}

export default Reviews;
