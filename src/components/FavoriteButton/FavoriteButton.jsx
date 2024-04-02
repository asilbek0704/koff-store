import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite } from "../../store/favorite/favorite.slice";

export const FavoriteButton = ({ className, id }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const favoriteList = useSelector(state => state.favorite.favoriteList);

  const isFavorite = favoriteList.includes(id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(id));
    } else {
      dispatch(addToFavorite(id));
    }
  }

  return (
    <button
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleFavoriteClick}
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8.41337 12.8733C8.18671 12.9533 7.81337 12.9533 7.58671 12.8733C5.65337 12.2133 1.33337 9.45998 1.33337 4.79332C1.33337 2.73332 2.99337 1.06665 5.04004 1.06665C6.25337 1.06665 7.32671 1.65332 8.00004 2.55998C8.67337 1.65332 9.75337 1.06665 10.96 1.06665C13.0067 1.06665 14.6667 2.73332 14.6667 4.79332C14.6667 9.45998 10.3467 12.2133 8.41337 12.8733Z'
          fill={hover !== isFavorite ? '#780096' : '#ffffff'}
          stroke={hover !== isFavorite ? '#780096' : '#1c1c1c'}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  )
}