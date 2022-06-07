import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Terms from './component/index';
import {fetchTerms, resetTerms} from './component/termsSlice';


const TermScreen = props => {
  const dispatch = useDispatch();
  const {terms, termsLoading, termsError} = useSelector(state => state.terms);

  const fetchTermsOfUse = () => {
    dispatch(fetchTerms());
  };

  const cleanTerms = () => {
    dispatch(resetTerms());
  };


  return (
    <Terms
      {...props}
      terms={terms}
      termsLoading={termsLoading}
      termsError={termsError}
      fetchTermsOfUse={fetchTermsOfUse}
      cleanTerms={cleanTerms}
    />
  );
};

export default TermScreen;
