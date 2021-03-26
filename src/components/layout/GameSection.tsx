import React from "react";
import { useSudokuContext } from "../../context/SudokuContext";
import { Numbers } from "../Numbers";
import { Action } from "../Action";
import { Timer } from "../Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Grid, Hidden, Button, Typography } from "@material-ui/core";

type GameSectionProps = {
  onClick: (indexOfArray: number) => void;
  onClickNumber: (number: string) => void;
  onClickNewGame: () => void;
  onClickHint: () => void;
};

/**
 * React component for the Game Section
 */
export const GameSection = (props: GameSectionProps) => {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let {
    numberSelected,
    gameArray,
    fastMode,
    cellSelected,
    initArray,
  } = useSudokuContext();

  /**
   * Cell Highlight Method 1: Highlight all cells
   * related to current cell. By related, I mean all
   * cells in the same row/column/box as the current cell.
   */
  // eslint-disable-next-line
  function _isCellRelatedToSelectedCell(row: number, column: number) {
    if (cellSelected === row * 9 + column) {
      return true;
    }
    let rowOfSelectedCell = Math.floor(cellSelected / 9);
    let columnOfSelectedCell = cellSelected % 9;
    if (rowOfSelectedCell === row || columnOfSelectedCell === column) {
      return true;
    }
    return [
      [0, 3, 0, 3],
      [0, 3, 3, 6],
      [0, 3, 6, 9],
      [3, 6, 0, 3],
      [3, 6, 3, 6],
      [3, 6, 6, 9],
      [6, 9, 0, 3],
      [6, 9, 3, 6],
      [6, 9, 6, 9],
    ].some((array) => {
      if (
        rowOfSelectedCell > array[0] - 1 &&
        row > array[0] - 1 &&
        rowOfSelectedCell < array[1] &&
        row < array[1] &&
        columnOfSelectedCell > array[2] - 1 &&
        column > array[2] - 1 &&
        columnOfSelectedCell < array[3] &&
        column < array[3]
      )
        return true;
      return false;
    });
  }

  /**
   * Cell Highlight Method 2: Highlight all cells with
   * the same number as in the current cell.
   */
  function _isCellSameAsSelectedCell(row: number, column: number) {
    if (fastMode) {
      if (numberSelected === gameArray[row * 9 + column]) {
        return true;
      }
      return false;
    } else {
      if (cellSelected === row * 9 + column) {
        return true;
      }
      if (gameArray[cellSelected] === "0") {
        return false;
      }
      if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
        return true;
      }
    }
  }

  /**
   * Returns the classes for a cell related to the selected cell.
   */
  function _selectedCell(
    indexOfArray: number,
    value: string,
    highlight: string
  ) {
    if (value !== "0") {
      if (initArray[indexOfArray] === "0") {
        return (
          <td
            className={`game__cell game__cell--userfilled game__cell--${highlight}selected`}
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            <Hidden smUp>
              <Typography variant="caption">{value}</Typography>
            </Hidden>
            <Hidden smDown>
              <Typography variant="h6">{value}</Typography>
            </Hidden>
          </td>
        );
      } else {
        return (
          <td
            className={`game__cell game__cell--filled game__cell--${highlight}selected`}
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            <Hidden smUp>
              <Typography variant="caption">{value}</Typography>
            </Hidden>
            <Hidden smDown>
              <Typography variant="h6">{value}</Typography>
            </Hidden>
          </td>
        );
      }
    } else {
      return (
        <td
          className={`game__cell game__cell--${highlight}selected`}
          key={indexOfArray}
          onClick={() => props.onClick(indexOfArray)}
        >
          <Hidden smUp>
            <Typography variant="caption">{value}</Typography>
          </Hidden>
          <Hidden smDown>
            <Typography variant="h6">{value}</Typography>
          </Hidden>
        </td>
      );
    }
  }

  /**
   * Returns the classes or a cell not related to the selected cell.
   */
  function _unselectedCell(indexOfArray: number, value: string) {
    if (value !== "0") {
      if (initArray[indexOfArray] === "0") {
        return (
          <td
            className="game__cell game__cell--userfilled"
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            <Hidden smUp>
              <Typography variant="caption">{value}</Typography>
            </Hidden>
            <Hidden smDown>
              <Typography variant="h6">{value}</Typography>
            </Hidden>
          </td>
        );
      } else {
        return (
          <td
            className="game__cell game__cell--filled"
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            <Hidden smUp>
              <Typography variant="caption">{value}</Typography>
            </Hidden>
            <Hidden smDown>
              <Typography variant="h6">{value}</Typography>
            </Hidden>
          </td>
        );
      }
    } else {
      return (
        <td
          className="game__cell"
          key={indexOfArray}
          onClick={() => props.onClick(indexOfArray)}
        >
          <Hidden smUp>
            <Typography variant="caption">{value}</Typography>
          </Hidden>
          <Hidden smDown>
            <Typography variant="h6">{value}</Typography>
          </Hidden>
        </td>
      );
    }
  }

  return (
    <Grid
      container
      direction="row"
      className="game"
      style={{
        zIndex: 100,
        position: "relative",
        marginLeft: `${window.screen.width >= 690 ? "0" : "1.5em"}`,
        marginRight: `${window.screen.width >= 690 ? "0" : "1.5em"}`,
        marginTop: `${window.screen.width >= 690 ? "-10em" : "-5em"}`,
      }}
    >
      <Grid item container>
        <Grid item xs={6}>
          <Button
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            variant="contained"
            style={{
              backgroundColor: "#e37b40",
              color: "white",
              float: "right",
            }}
            onClick={props.onClickNewGame}
          >
            NEW GAME
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Timer />
        </Grid>
      </Grid>
      <Grid item container>
        <table
          className="game__board"
          style={{ alignItems: "center", marginTop: "1.5em" }}
        >
          <tbody>
            {rows.map((row) => {
              return (
                <tr
                  className={
                    (row + 1) % 2 == 0 ? "game__row__even" : "game__row__odd"
                  }
                  key={row}
                >
                  {rows.map((column) => {
                    const indexOfArray = row * 9 + column;
                    const value = gameArray[indexOfArray];

                    if (cellSelected === indexOfArray) {
                      return _selectedCell(indexOfArray, value, "highlight");
                    }

                    if (fastMode) {
                      if (
                        numberSelected !== "0" &&
                        _isCellSameAsSelectedCell(row, column)
                      ) {
                        return _selectedCell(indexOfArray, value, "");
                      } else {
                        return _unselectedCell(indexOfArray, value);
                      }
                    } else {
                      if (
                        cellSelected !== -1 &&
                        _isCellSameAsSelectedCell(row, column)
                      ) {
                        return _selectedCell(indexOfArray, value, "");
                      } else {
                        return _unselectedCell(indexOfArray, value);
                      }
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>
      <Grid item container>
        <Numbers onClickNumber={(number) => props.onClickNumber(number)} />
      </Grid>
      <Hidden smUp>
        <Button
          variant="contained"
          color="primary"
          onClick={props.onClickHint}
          style={{
            marginTop: "3em",
            flex: 1,
            width: "100%",
            backgroundColor: "#54b273",
          }}
        >
          SOLVE ME
        </Button>
      </Hidden>
    </Grid>
  );
};
