'use client';

import React, { createContext, useContext, useState } from 'react';

interface ReservationData {
  isSplit: boolean;
  splitCount: number;
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  hasReservation: boolean;
  setHasReservation: (value: boolean) => void;
  reservationData: ReservationData;
  setReservationData: (data: ReservationData) => void;
  adminUser: string | null;
  setAdminUser: (user: string | null) => void;
  hasSeenSplash: boolean;
  setHasSeenSplash: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasReservation, setHasReservation] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationData>({ isSplit: false, splitCount: 10 });
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        hasReservation,
        setHasReservation,
        reservationData,
        setReservationData,
        adminUser,
        setAdminUser,
        hasSeenSplash,
        setHasSeenSplash,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
