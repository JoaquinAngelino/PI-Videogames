import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './Cards.module.css'
import Card from '../Card';
import Pagination from '../Pagination';

export default function Cards() {
  const [currentPage, setCurrentPage] = useState(1)
  const postPerPage = 15
  const games = useSelector(state => state.games)

  useEffect(() => {
    setCurrentPage(1)
  }, [games])

  const idxLastItem = currentPage * postPerPage
  const ixdFirstItem = idxLastItem - postPerPage
  const pageGames = games.slice(ixdFirstItem, idxLastItem)

  const paginate = (number) => { setCurrentPage(number) }

  return (
    <>
      <Pagination postPerPage={postPerPage} totalPosts={games.length} paginate={paginate} />
      <div className={style.CardsContainer}>
        {pageGames.length > 0 && pageGames.map(game => <Card
          key={game.id}
          id={game.id}
          name={game.name}
          rating={game.rating}
          genres={game.genres}
          image={game.image}
        />)}
      </div>
    </>
  )

};