import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flex: "1 1 100%",
  },
  root: {
    width: "100%",
  },
});

export default function ProveedoresContainer(props) {
  const classes = useStyles();
  const proveedoresContent = () => {
    var content = [];
    for (var i = 1; i < props.proveedores.length; i++) {
      content.push(
        props.proveedores[i].map((cont) => {
            return <TableCell align="center">{cont}</TableCell>;
          })
      )
    }
    return content;
  };
  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  Proveedores
                </TableCell>
              </TableRow>
              <TableRow>
                {props.proveedores[0].map((row) => (
                  <TableCell align="center">{row}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {proveedoresContent().map((row) => (
                <TableRow>{row}</TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.next()}
          disableElevation
          aling="right"
        >
          Siguiente
        </Button>
        <Button
          aling="left"
          variant="contained"
          color="secondary"
          onClick={() => props.cancel()}
          disableElevation
        >
          Cancelar
        </Button>
      </Grid>
    </Grid>
  );
}
