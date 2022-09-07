import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import About from './components';
import {fetchAbouts, resetAbout} from './slice/aboutSlice';

const AboutScreen = props => {
  const dispatch = useDispatch();

  const {about, aboutLoading, aboutError} = useSelector(state => state.about);

  // fetch about data
  const fetchAbout = () => {
    dispatch(fetchAbouts());
  };

  //clear about data
  const cleanAbout = () => {
    dispatch(resetAbout());
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <About
      {...props}
      about={about}
      aboutLoading={aboutLoading}
      aboutError={aboutError}
      fetchAbout={fetchAbout}
      cleanAbout={cleanAbout}
    />
  );
};

export default AboutScreen;
