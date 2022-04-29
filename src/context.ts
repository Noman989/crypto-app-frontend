import React from 'react';

export interface IUser {
  name: string;
  wallet_address: string;
  private_key: string;
  username: string;
}
export interface IUserContext {
  user: IUser | null;
}
export const UserContext = React.createContext<IUserContext>({ user: null });
