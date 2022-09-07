import {
  Box,
  Button,
  Grid,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Form from "../components/form/Form";

export function Dashboard() {
  return (
    <>
      <Typography variant="h3" align="center" color={"#8F99A6"}>
        Simule e solicite seu empréstimo
      </Typography>
      <Box 
        margin={1}
        display="flex"
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Grid container direction="column" padding={2} spacing={2}>
          <Grid item align="center">
            <Form />
          </Grid>
        </Grid>
      </Box>
      <Box
        margin={1}
        display="flex"
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Grid container direction="column" padding={2} spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ m: 1, width: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Saldo devedor</TableCell>
                    <TableCell>Juros</TableCell>
                    <TableCell>Saldo devedor ajustado</TableCell>
                    <TableCell>Valor da Parcela</TableCell>
                    <TableCell>Vencimento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
            </TableContainer>
            <Button
              style={{
                background: "#21AE1E",
                marginTop: "15px",
              }}
              type={"submit"}
              fullWidth
              variant={"contained"}
              margin={"normal"}
            >
              Efetuar o empréstimo
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
