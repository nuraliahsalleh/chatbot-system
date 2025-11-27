
import React, { createContext, useContext, useState, useEffect } from "react";

const AgencyContext = createContext(null);

export function AgencyProvider({ children }) {
  // Load saved data
  const savedAgencies = localStorage.getItem("agencies");
  const savedCurrent = localStorage.getItem("current_agency");

  const [agencies, setAgencies] = useState(savedAgencies ? JSON.parse(savedAgencies) : []);
  const [currentAgency, setCurrentAgency] = useState(savedCurrent ? JSON.parse(savedCurrent) : null);

  // Save all agencies
  useEffect(() => {
    localStorage.setItem("agencies", JSON.stringify(agencies));
  }, [agencies]);

  // Save current logged-in agency
  useEffect(() => {
    localStorage.setItem("current_agency", JSON.stringify(currentAgency));
  }, [currentAgency]);

  // Add new agency
  const addAgency = (payload) => {
    const newAgency = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "Dalam Permohonan", // sementara bypass approval
      ...payload,
    };

    setAgencies((prev) => [newAgency, ...prev]);
    return newAgency;
  };

  // Login agency
  const loginAgency = (email, password) => {
    const found = agencies.find((a) => a.email === email);

    if (!found) return { success: false, message: "Akaun tidak dijumpai." };
    if (found.password !== password)
      return { success: false, message: "Kata laluan tidak sah." };

    setCurrentAgency(found);
    return { success: true, agency: found };
  };

  // Logout
  const logoutAgency = () => {
    setCurrentAgency(null);
    localStorage.removeItem("current_agency");
  };

  // Update agency info
  const updateAgency = (id, changes) => {
    setAgencies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...changes } : a))
    );

    if (currentAgency?.id === id) {
      setCurrentAgency((prev) => ({ ...prev, ...changes }));
    }
  };

  return (
    <AgencyContext.Provider
      value={{
        agencies,
        addAgency,
        currentAgency,
        loginAgency,
        logoutAgency,
        updateAgency,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
}

export function useAgency() {
  const ctx = useContext(AgencyContext);
  if (!ctx) throw new Error("useAgency must be used within AgencyProvider");
  return ctx;
}


