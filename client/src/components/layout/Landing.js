import React, { Fragment, useEffect } from 'react';
import Paralax from 'react-rellax';
import { getTexts } from '../../actions/textAboutCompany';
import { getNames } from '../../actions/companyName';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LandingTextItem from './LandingTextItem';
import LandingCompanyNameItem from './LandingCompanyNameItem';
//import { TweenMax, Power3 } from 'gsap';
//import Zoom from 'react-reveal/Reveal';

const Landing = ({
  getNames,
  getTexts,
  textAboutCompany: { texts },
  companyName: { names }
}) => {
  useEffect(() => {
    getTexts();
  }, [getTexts]);
  useEffect(() => {
    getNames();
  }, [getNames]);
  return (
    <Fragment>
      <Paralax speed={3} className='landing-page'></Paralax>
      <div className='cover-photo'></div>

      <div className='company-name-text d-flex justify-content-center'>
        {names.map(compName => (
          <LandingCompanyNameItem
            className='d-flex'
            key={compName._id}
            compName={compName}
          />
        ))}
      </div>

      <div className='company-info '>
        <Paralax speed={6} className='paralax-text1'>
          {texts.map((textName, id) => (
            <LandingTextItem key={id} textName={textName} />
          ))}
        </Paralax>
      </div>

      <div className='partners-div '>
        <h3 className='d-flex justify-content-center my-5'>Наши партнеры</h3>
      </div>
      <div className='news-div'></div>
    </Fragment>
  );
};

Landing.propTypes = {
  getTexts: PropTypes.func.isRequired,
  textAboutCompany: PropTypes.object,
  companyName: PropTypes.object,
  getNames: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  textAboutCompany: state.textAboutCompany,
  companyName: state.companyName
});

export default connect(
  mapStateToProps,
  { getTexts, getNames }
)(Landing);
