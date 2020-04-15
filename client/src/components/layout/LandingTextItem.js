import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TweenMax, Power3 } from 'gsap';
import { useIntersection } from 'react-use';
import gsap from 'gsap';

const LandingTextItem = ({ textName: { text } }) => {
  const textItem = useRef(null);

  const intersection = useIntersection(textItem, {
    root: null,
    rootMargin: '50px',
    threshold: 1
  });

  //animation for fading in
  const fadeIn = el => {
    gsap.to(el, 1.5, {
      opacity: 1,
      y: -30,
      ease: 'power4.out',
      stagger: {
        amount: 1
      }
    });
  };

  //animation for fading out
  const fadeOut = el => {
    gsap.to(el, 1.5, {
      opacity: 0,
      y: -20,
      ease: 'power4.out'
    });
  };

  intersection && intersection.intersectionRatio < 1
    ? fadeOut('.company-text')
    : fadeIn('.company-text');

  return (
    <Fragment>
      <h5 className='px-5  company-text' ref={textItem}>
        {text}
      </h5>
    </Fragment>
  );
};

LandingTextItem.propTypes = {
  textName: PropTypes.object
};

export default LandingTextItem;
