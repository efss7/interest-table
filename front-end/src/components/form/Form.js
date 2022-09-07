import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import AttachMoney from "@mui/icons-material"
import { Screen } from "./style"

const Form = () => {
  return (
    <Screen>
      <form onSubmit={""}>
        <TextField
          name={"cpf"}
          value={""}
          onChange={""}
          label={"CPF"}
          inputProps={{
            pattern:
              "([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})",
          }}
          placeholder={"000.000.000-00"}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          required
        />
        <TextField
          name={"uf"}
          value={""}
          onChange={""}
          label={"UF"}
          placeholder={"SP, MG, RJ, ES..."}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          required={"none"}
        />
        <TextField
          name={"birthData"}
          value={""}
          onChange={""}
          InputLabelProps={{
            shrink: true,
          }}
          label={"DATA DE NASCIMENTO"}
          type={"date"}
          fullWidth
          placeholder={"Data de Nascimento"}
          margin={"normal"}
          required
        />
        <TextField
          name={"loanAmount"}
          value={""}
          onChange={""}
          label={"QUAL O VALOR DO EMPRÉSTIMO?"}
          placeholder={"Somente acima de 50000"}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          required
        />
        <TextField
          name={"amountPerMonth"}
          value={""}
          onChange={""}
          label={"QUAL VALOR DESEJA PAGAR POR MÊS?"}
          placeholder={""}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          required
        />
        <Button
          style={{
            background: "#F3A126",
            marginTop: "15px",
          }}
          type={"submit"}
          fullWidth
          variant={"contained"}
          margin={"normal"}
        >
          Simular
        </Button>
      </form>
    </Screen>
  );
    
};

export default Form;
