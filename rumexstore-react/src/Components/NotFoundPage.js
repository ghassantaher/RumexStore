import React from 'react';
import { Page } from './Page';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCategoryAction } from './Store';
export const NotFoundPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setSelectedCategoryAction(location.pathname, {
        categoryName: location.pathname,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Page title="Page Not Found">{location.pathname}</Page>;
};
