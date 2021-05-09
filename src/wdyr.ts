/*
 * @description: 
 * @author: 
 * @lastEditors: 
 * @Date: 2021-04-29 11:20:12
 */

import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}