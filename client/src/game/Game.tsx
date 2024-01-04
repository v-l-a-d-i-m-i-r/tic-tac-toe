import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { GameModel, GameState } from '../models/game.model';
import { gameSelector } from '../store/store';
import { ArrayElement } from '../utils/array-element';
import { getById, makeStep, subscribeToSocket, unsubscribeFromSocket } from './gameActions';

import './game.scss';
import { Alert } from 'react-bootstrap';

export const Game: React.FC = () => {
  const { gameId } = useParams();
  const { game } = useAppSelector(gameSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getById({ gameId }));
    dispatch(subscribeToSocket({ gameId }));

    return () => {
      dispatch(unsubscribeFromSocket());
    };
  }, []);

  const board: (ArrayElement<GameModel['steps']> | null)[] = Array(9).fill(null);
  (game?.steps || []).forEach((step) => board[step.cell] = step);
  const isGameOver = [GameState.XWon, GameState.OWon, GameState.WinWin].includes(game?.state);

  const onClick = (cell: number) => dispatch(makeStep({ gameId, cell }));

  return (
    <>
      <h1>
        Game
        {game?.id}
      </h1>
      <div className="board">
        {board.map((cell, i) => <div className="box" key={i} onClick={!cell ? () => onClick(i) : null}>{cell?.symbol}</div>)}
      </div>

      {game?.state === GameState.XWon ? <Alert variant="primary" className="text-center">X won!</Alert> : null}
      {game?.state === GameState.OWon ? <Alert variant="primary" className="text-center">O won!</Alert> : null}
      {game?.state === GameState.WinWin ? <Alert variant="primary" className="text-center">Win Win!</Alert> : null}
      {game?.state === GameState.ReadyForGuest ? <Alert variant="success" className="text-center">Waititng for guest</Alert> : null}

      {isGameOver
        ? (
          <p className="mb-0  text-center">
            <Link to="/games">Back to Games</Link>
          </p>
        ) : null}

      {game
        && (
        <div className="debug">
          Debug  Info
          <div>
            State:
            {game.state}
          </div>
          <div>
            Creator Id:
            {game.creatorId}
          </div>
          <div>
            Guest Id:
            {game.guestId}
          </div>
          <ul>
            {game.steps.map((step, i) => (
              <li key={i}>
                Cell:
                {step.cell}
                , Symbol:
                {step.symbol}
              </li>
            ))}
          </ul>
        </div>
        )}
    </>
  );
};
