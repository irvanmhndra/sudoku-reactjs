import { Typography } from "@material-ui/core";
import React from "react";
import { useSudokuContext } from "../context/SudokuContext";
import { Grid } from "@material-ui/core";

type NumbersProps = {
  onClickNumber: (number: string) => void;
};

/**
 * React component for the Number Selector in the Status Section.
 */
export const Numbers = ({ onClickNumber }: NumbersProps) => {
  let { numberSelected } = useSudokuContext();

  return (
    <Grid
      container
      className="status__numbers"
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: `${
          window.screen.width >= 690 ? "1.5em 10em 0" : "1.5em 2em 0"
        }`,
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
        if (numberSelected === number.toString()) {
          return (
            <Grid
              item
              className="status__number status__number--selected"
              key={number}
              onClick={() => onClickNumber(number.toString())}
            >
              <Typography variant="body1" style={{ margin: "auto" }}>
                {number}
              </Typography>
            </Grid>
          );
        } else {
          return (
            <Grid
              item
              className="status__number"
              key={number}
              onClick={() => onClickNumber(number.toString())}
            >
              <Typography variant="body1" style={{ margin: "auto" }}>
                {number}
              </Typography>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};
