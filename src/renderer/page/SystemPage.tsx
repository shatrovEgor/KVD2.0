import { Button, Slider, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useState } from 'react';

const calculateFunc = (
  obj: { ηe: number; qm: number; Ne: number },
  m: number,
  z: number
) => {
  const cm = 2.1;
  const den = 900;
  const dT = 18;
  const kd = 2.5;
  const ηn = 0.7;
  // const z = 8;
  const h = 2 * m;
  const Un = 9;
  const p = 506500;
  const ηm = 0.89;

  const QM = (obj.qm * obj.Ne) / obj.ηe;
  const Vc = QM / den / cm / dT;
  const Vt = (Vc * kd) / ηn;

  const D0 = z * m;
  const D = m * (z + 2);
  const nh = (Un * 60) / D / Math.PI;
  const b = (60 * Vt) / (2 * Math.PI * m * m * z * nh);
  const Nn = (Vt * p) / 1000 / ηm;

  // console.log({ QM, Vt, Nn, z, m });

  return { QM, Vt, Nn };
};

const SystemPage = () => {
  const [variables, setVariables] = useState({ ηe: 0, qm: 0, Ne: 0 });
  const [result, setResult] = useState({ QM: 0, Vt: 0, Nn: 0 });
  const [indicateCaclulate, setIndicate] = useState(false);
  const [z, setZ] = useState(10);
  const [age, setAge] = useState('2');

  const variablesChange = (
    event: SelectChangeEvent,
    name: 'ηe' | 'qm' | 'Ne'
  ) => {
    setVariables((prev) => {
      const newValue = prev;
      if (+event.target.value || +event.target.value === 0) {
        newValue[name] = +event.target.value;
      }

      return { ...newValue };
    });
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <Stack direction="row">
        <Typography sx={{ mr: '40px' }}>Введите переменные:</Typography>
        <Stack direction="row">
          <TextField
            id="ηe"
            label="ηe"
            sx={{ mr: '40px' }}
            value={variables.ηe}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              variablesChange(event, 'ηe')
            }
          />
          <TextField
            id="qm"
            label="qm"
            sx={{ mr: '40px' }}
            value={variables.qm}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              variablesChange(event, 'qm')
            }
          />
          <TextField
            id="Ne"
            label="Ne"
            value={variables.Ne}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              variablesChange(event, 'Ne')
            }
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: '20px' }} direction="row">
        <Typography>Введите переменные:</Typography>

        <FormControl sx={{ width: '200px', ml: '40px' }}>
          <InputLabel id="demo-simple-select-label">M</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="15">15</MenuItem>
          </Select>
        </FormControl>
        <Stack sx={{ ml: '20px' }}>
          <Typography>Zа правду</Typography>
          <Slider
            sx={{ width: '200px', ml: '20px' }}
            value={z}
            min={5}
            max={15}
            onChange={(e, value) => {
              if (typeof value === 'number') {
                setZ(value);
              }
            }}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: '20px' }} direction="row">
        <Button
          variant="contained"
          onClick={() => {
            setResult(calculateFunc(variables, +age, z));
            setIndicate(true);
          }}
        >
          Расчет
        </Button>
      </Stack>
      <Stack sx={{ mt: '20px' }} direction="row">
        {indicateCaclulate && (
          <>
            <Typography sx={{ mr: '40px' }}>Результаты расчета</Typography>
            <Typography sx={{ mr: '100px' }}>Qm: {result.QM}</Typography>
            <Typography sx={{ mr: '100px' }}>Vt: {result.Vt}</Typography>
            <Typography>Nn: {result.Nn}</Typography>
          </>
        )}
      </Stack>
    </>
  );
};

export default SystemPage;
