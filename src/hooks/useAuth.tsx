"use client"
import { AuthContext } from '@/context/auth-context';
import React, { useContext } from 'react';


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("auth must be used within a authProvider");
  }
  return context;
};
