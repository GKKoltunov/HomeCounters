import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { HomeContext } from '../../providers/context/HomeProvider/HomeContext';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export default function SelectAutoWidth() {
  const { list, handleChange, value } = useContext(HomeContext);

  let periods = list!.period!;

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Месяц</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
          label="Value"
        >
          {periods &&
            periods!.map((el: any) => (
              <MenuItem key={el._id} value={el.date}>
                {dayjs(el.date).format('MMMM YYYY')}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
