import React from 'react';

export const defaultUserContext = {
  auth_status_reported: false,
  signed_in: false,
};

export const UserContext = React.createContext(defaultUserContext);
