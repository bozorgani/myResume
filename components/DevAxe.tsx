"use client";
import { useEffect } from 'react';

export function DevAxe() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Dynamically import to avoid including in production bundles
      import('@axe-core/react').then((axe) => {
        const React = require('react');
        const ReactDOM = require('react-dom');
        axe.default(React, ReactDOM, 1000);
      });
    }
  }, []);
  return null;
}


