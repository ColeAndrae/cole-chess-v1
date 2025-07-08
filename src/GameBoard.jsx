import { useEffect, useState } from 'react'
import bishop_b from '/src/assets/pieces/bishop-b.svg'
import bishop_w from '/src/assets/pieces/bishop-w.svg'
import king_b from '/src/assets/pieces/king-b.svg'
import king_w from '/src/assets/pieces/king-w.svg'
import knight_b from '/src/assets/pieces/knight-b.svg'
import knight_w from '/src/assets/pieces/knight-w.svg'
import pawn_b from '/src/assets/pieces/pawn-b.svg'
import pawn_w from '/src/assets/pieces/pawn-w.svg'
import queen_b from '/src/assets/pieces/queen-b.svg'
import queen_w from '/src/assets/pieces/queen-w.svg'
import rook_b from '/src/assets/pieces/rook-b.svg'
import rook_w from '/src/assets/pieces/rook-w.svg'
import circle from '/src/assets/pieces/circle.svg'

export default function GameBoard() {

  const [turn, setTurn] = useState(1);

  const [startPos, setStartPos] = useState();

  const [legalMoves, setLegalMoves] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [state, setState] = useState([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]);

  function isBlack([rank, file]) {
    let c = state[rank][file];
    return (c > 'a' && c != 'x');
  }

  function isWhite([rank, file]) {
    let c = state[rank][file];
    return (c < 'a' && c != 'x');
  }

  function convertToImage(c) {

    switch (c) {

      case 'b':
        return (bishop_b);
      case 'B':
        return (bishop_w)
      case 'k':
        return (king_b);
      case 'K':
        return (king_w)
      case 'n':
        return (knight_b);
      case 'N':
        return (knight_w)
      case 'p':
        return (pawn_b);
      case 'P':
        return (pawn_w)
      case 'q':
        return (queen_b);
      case 'Q':
        return (queen_w)
      case 'r':
        return (rook_b);
      case 'R':
        return (rook_w)

    }

  }

  function findKing(white) {

    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        if (white && state[rank][file] == 'K') {
          return ([rank, file]);
        } else if (!white && state[rank][file] == 'k') {
          return ([rank, file]);
        }
      }
    }

  }

  function kingSafe([x1, y1, x2, y2]) {

    let c = state[x1][y1]
    let tempState = state.map(row => [...row]);
    tempState[x1][y1] = 'x';
    tempState[x2][y2] = c;

    let tempLegalMoves = [];
    const [kingRank, kingFile] = findKing(1);

    if (turn) {

      for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {

          if (isBlack([rank, file])) {

            tempLegalMoves = findLegalMoves([rank, file], false, tempState);
            if (tempLegalMoves[kingRank][kingFile]) console.log("ILLEGAL MOVE");

          }

        }
      }

    } else {



    }

    return true;

  }

  function findLegalMoves([rank, file], real, tempState) {

    let y = 0;
    const c = state[rank][file];
    let tempLegalMoves = Array(8).fill(0).map(row => Array(8).fill(0));

    if ((turn && real) || (!turn && !real)) {

      switch (c) {

        case 'B':

          y = 1;
          for (let x = rank + 1; x < 8 && file + y < 8; x++) {
            if (isWhite([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isBlack([x, file + y])) break;
            y++;
          }

          y = -1;
          for (let x = rank + 1; x < 8 && file + y >= 0; x++) {
            if (isWhite([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isBlack([x, file + y])) break;
            y--;
          }

          y = 1;
          for (let x = rank - 1; x >= 0 && file + y < 8; x--) {
            if (isWhite([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isBlack([x, file + y])) break;
            y++;
          }

          y = -1;
          for (let x = rank - 1; x >= 0 && file + y >= 0; x--) {
            if (isWhite([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isBlack([x, file + y])) break;
            y--;
          }

          break;
        case 'K':

          if (rank + 1 < 8 && !isWhite([rank + 1, file])) tempLegalMoves[rank + 1][file] = 1;
          if (rank - 1 >= 0 && !isWhite([rank - 1, file])) tempLegalMoves[rank - 1][file] = 1;
          if (rank + 1 < 8 && file + 1 < 8 && !isWhite([rank + 1, file + 1])) tempLegalMoves[rank + 1][file + 1] = 1;
          if (rank - 1 >= 0 && file - 1 >= 0 && !isWhite([rank - 1, file - 1])) tempLegalMoves[rank - 1][file - 1] = 1;
          if (file + 1 < 8 && !isWhite([rank, file + 1])) tempLegalMoves[rank][file + 1] = 1;
          if (file - 1 >= 0 && !isWhite([rank, file - 1])) tempLegalMoves[rank][file - 1] = 1;
          if (rank + 1 < 8 && file - 1 >= 0 && !isWhite([rank + 1, file - 1])) tempLegalMoves[rank + 1][file - 1] = 1;
          if (rank - 1 >= 0 && file + 1 < 8 && !isWhite([rank - 1, file + 1])) tempLegalMoves[rank - 1][file + 1] = 1;

          break;
        case 'N':

          if (rank + 2 < 8 && file + 1 < 8 && !isWhite([rank + 2, file + 1])) tempLegalMoves[rank + 2][file + 1] = 1;
          if (rank + 2 < 8 && file - 1 >= 0 && !isWhite([rank + 2, file - 1])) tempLegalMoves[rank + 2][file - 1] = 1;
          if (rank + 1 < 8 && file + 2 < 8 && !isWhite([rank + 1, file + 2])) tempLegalMoves[rank + 1][file + 2] = 1;
          if (rank + 1 < 8 && file - 2 >= 0 && !isWhite([rank + 1, file - 2])) tempLegalMoves[rank + 1][file - 2] = 1;
          if (rank - 2 >= 0 && file + 1 < 8 && !isWhite([rank - 2, file + 1])) tempLegalMoves[rank - 2][file + 1] = 1;
          if (rank - 2 >= 0 && file - 1 >= 0 && !isWhite([rank - 2, file - 1])) tempLegalMoves[rank - 2][file - 1] = 1;
          if (rank - 1 >= 0 && file + 2 < 8 && !isWhite([rank - 1, file + 2])) tempLegalMoves[rank - 1][file + 2] = 1;
          if (rank - 1 >= 0 && file - 2 >= 0 && !isWhite([rank - 1, file - 2])) tempLegalMoves[rank - 1][file - 2] = 1;

          break;
        case 'P':

          if (state[rank - 1][file] == 'x') {
            tempLegalMoves[rank - 1][file] = 1;
          }

          if (rank == 6 && state[rank - 2][file] == 'x') {
            if (real) {
              if (kingSafe([rank, file, rank - 2, file])) tempLegalMoves[rank - 2][file] = 1;
            } else {
              tempLegalMoves[rank - 2][file] = 1;
            }
          }

          if (isBlack([rank - 1, file + 1])) {
            tempLegalMoves[rank - 1][file + 1] = 1;
          }

          if (isBlack([rank - 1, file - 1])) {
            tempLegalMoves[rank - 1][file - 1] = 1;
          }

          break;
        case 'Q':

          y = 1;
          for (let x = rank + 1; x < 8 && file + y < 8; x++) {
            if (isWhite([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isBlack([x, file + y])) break;
            y++;
          }

          y = -1;
          for (let x = rank + 1; x < 8 && file + y >= 0; x++) {
            if (isWhite([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isBlack([x, file + y])) break;
            y--;
          }

          y = 1;
          for (let x = rank - 1; x >= 0 && file + y < 8; x--) {
            if (isWhite([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isBlack([x, file + y])) break;
            y++;
          }

          y = -1;
          for (let x = rank - 1; x >= 0 && file + y >= 0; x--) {
            if (isWhite([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isBlack([x, file + y])) break;
            y--;
          }

          for (let y = file - 1; y >= 0; y--) {
            if (isWhite([rank, y])) break;
            tempLegalMoves[rank][y] = 1;
            if (isBlack([rank, y])) break;
          }

          for (let y = file + 1; y < 8; y++) {
            if (isWhite([rank, y])) break;
            tempLegalMoves[rank][y] = 1;
            if (isBlack([rank, y])) break;
          }

          for (let x = rank - 1; x >= 0; x--) {
            if (isWhite([x, file])) break;
            tempLegalMoves[x][file] = 1;
            if (isBlack([x, file])) break;
          }

          for (let x = rank + 1; x < 8; x++) {
            if (isWhite([x, file])) break;
            tempLegalMoves[x][file] = 1;
            if (isBlack([x, file])) break;
          }

          break;
        case 'R':

          for (let y = file - 1; y >= 0; y--) {
            if (isWhite([rank, y])) break;
            tempLegalMoves[rank][y] = 1;
            if (isBlack([rank, y])) break;
          }

          for (let y = file + 1; y < 8; y++) {
            if (isWhite([rank, y])) break;
            tempLegalMoves[rank][y] = 1;
            if (isBlack([rank, y])) break;
          }

          for (let x = rank - 1; x >= 0; x--) {
            if (isWhite([x, file])) break;
            tempLegalMoves[x][file] = 1;
            if (isBlack([x, file])) break;
          }

          for (let x = rank + 1; x < 8; x++) {
            if (isWhite([x, file])) break;
            tempLegalMoves[x][file] = 1;
            if (isBlack([x, file])) break;
          }

          break;

      }

    } else if ((!turn && real) || (turn && !real)) {

      switch (c) {

        case 'b':

          y = 1;
          for (let x = rank + 1; x < 8 && file + y < 8; x++) {
            if (isBlack([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isWhite([x, file + y])) break;
            y++;
          }

          y = -1;
          for (let x = rank + 1; x < 8 && file + y >= 0; x++) {
            if (isBlack([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isWhite([x, file + y])) break;
            y--;
          }

          y = 1;
          for (let x = rank - 1; x >= 0 && file + y < 8; x--) {
            if (isBlack([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isWhite([x, file + y])) break;
            y++;
          }

          y = -1;
          for (let x = rank - 1; x >= 0 && file + y >= 0; x--) {
            if (isBlack([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isWhite([x, file + y])) break;
            y--;
          }

          break;
        case 'k':

          if (rank + 1 < 8 && !isBlack([rank + 1, file])) tempLegalMoves[rank + 1][file] = 1;
          if (rank - 1 >= 0 && !isBlack([rank - 1, file])) tempLegalMoves[rank - 1][file] = 1;
          if (rank + 1 < 8 && file + 1 < 8 && !isBlack([rank + 1, file + 1])) tempLegalMoves[rank + 1][file + 1] = 1;
          if (rank - 1 >= 0 && file - 1 >= 0 && !isBlack([rank - 1, file - 1])) tempLegalMoves[rank - 1][file - 1] = 1;
          if (file + 1 < 8 && !isBlack([rank, file + 1])) tempLegalMoves[rank][file + 1] = 1;
          if (file - 1 >= 0 && !isBlack([rank, file - 1])) tempLegalMoves[rank][file - 1] = 1;
          if (rank + 1 < 8 && file - 1 >= 0 && !isBlack([rank + 1, file - 1])) tempLegalMoves[rank + 1][file - 1] = 1;
          if (rank - 1 >= 0 && file + 1 < 8 && !isBlack([rank - 1, file + 1])) tempLegalMoves[rank - 1][file + 1] = 1;

          break;
        case 'n':

          if (rank + 2 < 8 && file + 1 < 8 && !isBlack([rank + 2, file + 1])) tempLegalMoves[rank + 2][file + 1] = 1;
          if (rank + 2 < 8 && file - 1 >= 0 && !isBlack([rank + 2, file - 1])) tempLegalMoves[rank + 2][file - 1] = 1;
          if (rank + 1 < 8 && file + 2 < 8 && !isBlack([rank + 1, file + 2])) tempLegalMoves[rank + 1][file + 2] = 1;
          if (rank + 1 < 8 && file - 2 >= 0 && !isBlack([rank + 1, file - 2])) tempLegalMoves[rank + 1][file - 2] = 1;
          if (rank - 2 >= 0 && file + 1 < 8 && !isBlack([rank - 2, file + 1])) tempLegalMoves[rank - 2][file + 1] = 1;
          if (rank - 2 >= 0 && file - 1 >= 0 && !isBlack([rank - 2, file - 1])) tempLegalMoves[rank - 2][file - 1] = 1;
          if (rank - 1 >= 0 && file + 2 < 8 && !isBlack([rank - 1, file + 2])) tempLegalMoves[rank - 1][file + 2] = 1;
          if (rank - 1 >= 0 && file - 2 >= 0 && !isBlack([rank - 1, file - 2])) tempLegalMoves[rank - 1][file - 2] = 1;

          break;
        case 'p':

          if (state[rank + 1][file] == 'x') {
            tempLegalMoves[rank + 1][file] = 1;
          }

          if (rank == 1 && state[rank + 2][file] == 'x') {
            tempLegalMoves[rank + 2][file] = 1;
          }

          if (isWhite([rank + 1, file + 1])) {
            tempLegalMoves[rank + 1][file + 1] = 1;
          }

          if (isWhite([rank + 1, file - 1])) {
            tempLegalMoves[rank + 1][file - 1] = 1;
          }


          break;
        case 'q':

          y = 1;
          for (let x = rank + 1; x < 8 && file + y < 8; x++) {
            if (isBlack([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isWhite([x, file + y])) break;
            y++;
          }

          y = -1;
          for (let x = rank + 1; x < 8 && file + y >= 0; x++) {
            if (isBlack([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isWhite([x, file + y])) break;
            y--;
          }

          y = 1;
          for (let x = rank - 1; x >= 0 && file + y < 8; x--) {
            if (isBlack([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isWhite([x, file + y])) break;
            y++;
          }

          y = -1;
          for (let x = rank - 1; x >= 0 && file + y >= 0; x--) {
            if (isBlack([x, file + y])) break;
            tempLegalMoves[x][file + y] = 1;
            if (isWhite([x, file + y])) break;
            y--;
          }

          for (let y = file - 1; y >= 0; y--) {
            if (isBlack([rank, y])) break;
            tempLegalMoves[rank][y] = 1;
            if (isWhite([rank, y])) break;
          }

          for (let y = file + 1; y < 8; y++) {
            if (isBlack([rank, y])) break;
            tempLegalMoves[rank][y] = 1;
            if (isWhite([rank, y])) break;
          }

          for (let x = rank - 1; x >= 0; x--) {
            if (isBlack([x, file])) break;
            tempLegalMoves[x][file] = 1;
            if (isWhite([x, file])) break;
          }

          for (let x = rank + 1; x < 8; x++) {
            if (isBlack([x, file])) break;
            tempLegalMoves[x][file] = 1;
            if (isWhite([x, file])) break;
          }

          break;
        case 'r':

          for (let y = file - 1; y >= 0; y--) {
            if (isBlack([rank, y])) break;
            tempLegalMoves[rank][y] = 1;
            if (isWhite([rank, y])) break;
          }

          for (let y = file + 1; y < 8; y++) {
            if (isBlack([rank, y])) break;
            tempLegalMoves[rank][y] = 1;
            if (isWhite([rank, y])) break;
          }

          for (let x = rank - 1; x >= 0; x--) {
            if (isBlack([x, file])) break;
            tempLegalMoves[x][file] = 1;
            if (isWhite([x, file])) break;
          }

          for (let x = rank + 1; x < 8; x++) {
            if (isBlack([x, file])) break;
            tempLegalMoves[x][file] = 1;
            if (isWhite([x, file])) break;
          }

          break;

      }

    }

    if (real) setLegalMoves(tempLegalMoves);
    return (tempLegalMoves);

  }

  function handleClick(event) {

    const [rank, file] = event.currentTarget.dataset.pos.split(',').map(Number);

    setStartPos([rank, file]);
    findLegalMoves([rank, file], true);

    if (legalMoves[rank][file]) {

      const [startRank, startFile] = startPos;
      let tempState = state.map(row => [...row]);

      tempState[rank][file] = state[startRank][startFile];
      tempState[startRank][startFile] = 'x';

      setState(tempState);
      setTurn(!turn);

    }


  }

  function generateBoard() {

    let newBoard = [];
    for (let rank = 0; rank < 8; rank++) {

      let newRank = [];
      for (let file = 0; file < 8; file++) {

        newRank[file] = <div data-pos={[rank, file]} className="relative h-13 w-13" onClick={handleClick}
          style={{
            backgroundColor: (rank + file) % 2 == 0 ? '#eeeed2' : '#769656',
            cursor: state[rank][file] != 'x' ? 'grab' : 'auto'
          }}>
          <img src={convertToImage(state[rank][file])}></img>
          <img src={circle} className='absolute top-0 left-0 h-1/2 w-1/2 mx-auto translate-x-1/2 translate-y-1/2'
            style={{ opacity: legalMoves[rank][file] ? 0.3 : 0 }}></img>
        </div >

      }

      newBoard[rank] = <div className="flex">{newRank}</div>;

    }

    return (newBoard);

  }

  return (
    <div className="flex flex-col w-104 h-104 mx-auto my-12">
      {generateBoard()}
    </div>
  );

}
