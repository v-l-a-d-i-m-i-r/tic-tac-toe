import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { GameModel } from '../models/game.model';
import { authSelector, gamesSelector } from '../store/store';
import { createNewGame, getForPlayer, joinGame } from './gamesActions';

export const Games: React.FC = () => {
  const { games } = useAppSelector(gamesSelector);
  const { user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getForPlayer());
  }, []);

  const onClick = (game: GameModel) => {
    if (user.id === game.creatorId || user.id === game.guestId) {
      navigate(`/games/${game.id}`);
    } else {
      dispatch(joinGame({ gameId: game.id })).then(() => navigate(`/games/${game.id}`));
    }
  };

  const onCreateNewGameClick = () => dispatch(createNewGame());

  return (
    <>
      <h1>Games</h1>
      <div className="text-center d-grid gap-2">
        {games.map((game) => <Button key={game.id} variant="outline-primary" onClick={() => onClick(game)}>{game.id}</Button>)}
        <Button onClick={onCreateNewGameClick}>Create New Game</Button>
      </div>
    </>
  );
};
