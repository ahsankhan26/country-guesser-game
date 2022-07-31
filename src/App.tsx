import { useState, FormEvent } from 'react';
import WorldMap from 'react-svg-worldmap';
import './App.css';
import { countryNames, countryCodes } from './countries';

const App: React.FC = () => {
  const [data, setData] = useState<{ country: string; value: number }[]>([
    { country: '', value: 0 },
  ]);

  const correctGuess = (countryName: string) => {
    const countryCode = countryCodes[countryName as keyof typeof countryCodes];
    const dataCopy = [...data];

    if (Array.isArray(countryCode)) {
      countryCode.forEach((item) => {
        dataCopy.push({ country: item, value: 1 });
      });
    } else {
      const temp = { country: countryCode, value: 1 };
      dataCopy.push(temp);
    }
    setData(dataCopy);
  };

  const checkCountry = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    const name = countryNames.find(
      (item) => item === target.value.toUpperCase()
    );
    if (name) {
      correctGuess(name);
      target.value = '';
    }
  };

  return (
    <div className='App'>
      <div>
        <label
          htmlFor='countryName'
          style={{
            display: 'block',
            marginBottom: 2,
            fontSize: 'small',
          }}
        >
          Country Name
        </label>
        <input
          type='text'
          id='countryName'
          placeholder='Country Name'
          onInput={checkCountry}
        />
      </div>
      <WorldMap color='#0099ff' size='xl' data={data} richInteraction frame />
    </div>
  );
};

export default App;
