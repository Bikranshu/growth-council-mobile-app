import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import CountryPopup from './components/CountryPopup';


const CountryPopupScreen = props => {
  const dispatch = useDispatch();

  return (
    <CountryPopup
      {...props}
     
    />
  );
};

export default CountryPopupScreen;
