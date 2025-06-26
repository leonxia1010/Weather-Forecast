import React from 'react';

interface ISearchCityInput {
  inputValue: string;
  onChangeCity: (city: string) => void;
  onSearchCity: (event: React.FormEvent<HTMLFormElement>) => void;
}

const InputSection = (props: ISearchCityInput) => {
  const { inputValue, onChangeCity, onSearchCity } = props;
  return (
    <div className='mb-5 relative' style={{ width: '80%' }}>
      <form onSubmit={(e) => onSearchCity(e)}>
        <input
          type='text'
          placeholder='Search for a city'
          className='input-default'
          value={inputValue}
          onChange={(e) => onChangeCity(e.target.value)}
        ></input>
        <button type='submit' className='button-default cursor-pointer me-1.5'>
          Search
        </button>
      </form>
    </div>
  );
};

export default InputSection;
