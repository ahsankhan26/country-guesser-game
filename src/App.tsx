import { useState, FormEvent } from 'react';
import WorldMap from 'react-svg-worldmap';
import './App.css';
import { countryNames, countryCodes } from './countries';

const App: React.FC = () => {
  const [data, setData] = useState<{ country: string; value: number }[]>([
    { country: '', value: 0 },
  ]);

  console.log(data);

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
      (item) => item === target.value?.toUpperCase()
    );
    const temp = data.find(
      (item) => item.country === countryCodes[name as keyof typeof countryCodes]
    );

    if (name && !temp) {
      correctGuess(name);
      target.value = '';
    }
  };

  return (
    <div className='App'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <input
            type='text'
            placeholder='Country Name'
            onInput={checkCountry}
          />
        </div>
        <WorldMap
          size='xxl'
          data={data}
          richInteraction
          frame
          styleFunction={(countryCode) => {
            return {
              fill: data.find(
                (item) => item.country === countryCode.countryCode
              )
                ? '#43c76f'
                : '#fafafa',
              stroke: 'black',
            };
          }}
        />
      </div>
    </div>
  );
};

export default App;
