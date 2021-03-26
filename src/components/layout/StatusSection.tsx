import React from "react";
import { Difficulty } from "../Difficulty";
import { Numbers } from "../Numbers";
import { Action } from "../Action";
import { Mode } from "../Mode";
import { Button, Typography } from "@material-ui/core";

type StatusSectionProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickUndo: () => void;
  onClickErase: () => void;
  onClickHint: () => void;
  onClickMistakesMode: () => void;
  onClickFastMode: () => void;
};

/**
 * React component for the Status Section.
 */
export const StatusSection = (props: StatusSectionProps) => {
  return (
    <section className="status" style={{ padding: "0 4em" }}>
      <Typography
        variant="h3"
        style={{ color: "#444", fontWeight: 800 }}
        gutterBottom
      >
        Play Sudoku!
      </Typography>
      <Typography variant="body1" style={{ color: "#444" }}>
        You can complete this Sudoku with your <br/>
        abilities or click the button below to <br/>
        finish it automatically :)
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={props.onClickHint}
        style={{ backgroundColor: "#54b273", marginTop: "3em", flex: 1, width: "100%" }}
      >
        SOLVE ME
      </Button>
    </section>
  );
};
