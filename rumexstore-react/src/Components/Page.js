import React from 'react';
import { PageTitle } from './PageTitle';
export const Page = ({ title, children }) => (
  <div>
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);
