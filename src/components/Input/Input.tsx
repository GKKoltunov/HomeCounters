import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type Props = {
  setValue: (event: any) => void;
  changeElectric: () => void;
  changeCold: () => void;
  changeHot: () => void;
};

export default function Input({ setValue, changeHot, changeCold, changeElectric }: Props) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
      className="newPeriod-form"
      onSubmit={setValue}
    >
      <TextField
        color="warning"
        className="input"
        id="cold"
        label="Холодная вода "
        variant="standard"
        onChange={changeCold}
        required
      />
      <TextField
        color="warning"
        className="input"
        id="hot"
        label="Горячая вода "
        variant="standard"
        onChange={changeHot}
        required
      />
      <TextField
        color="warning"
        className="input"
        id="electricity"
        label="Электричество"
        variant="standard"
        onChange={changeElectric}
        required
      />
      <Button onClick={setValue} variant="contained">
        Добавить показания
      </Button>
    </Box>
  );
}
