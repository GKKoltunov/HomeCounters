import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { HomeContext } from '../../providers/context/HomeProvider/HomeContext';

export default function SelectAutoWidth() {
  const { list, handleChange, value } = useContext(HomeContext);

  let periods = list!.period!;
  // const arrMonth = [
  //   'Январь',
  //   'Февраль',
  //   'Март',
  //   'Апрель',
  //   'Май',
  //   'Июнь',
  //   'Июль',
  //   'Август',
  //   'Сентябрь',
  //   'Октябрь',
  //   'Ноябрь',
  //   'Декабрь',
  // ];

  // const month = new Date(Date.parse(value!)).getMonth();
  // const year = new Date(Date.parse(value!)).getFullYear();

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
                {el.date.split('T')[0]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
