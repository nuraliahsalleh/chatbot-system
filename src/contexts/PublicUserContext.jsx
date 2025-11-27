
// import React, { createContext, useContext, useState, useEffect } from "react";

// const PublicUserContext = createContext(null);

// export function PublicUserProvider({ children }) {
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [chats, setChats] = useState([]);

//   /* --------------------------------------------------
//      LOAD from localStorage on first load
//   -------------------------------------------------- */
//   useEffect(() => {
//     try {
//       const savedUsers = localStorage.getItem("public_users");
//       const savedCurrent = localStorage.getItem("public_current_user");
//       const savedChats = localStorage.getItem("public_chats");

//       if (savedUsers) setUsers(JSON.parse(savedUsers));
//       if (savedCurrent) setCurrentUser(JSON.parse(savedCurrent));
//       if (savedChats) setChats(JSON.parse(savedChats));
//     } catch (err) {
//       console.error("LocalStorage parse error:", err);
//     }
//   }, []);

//   /* --------------------------------------------------
//      SAVE users + currentUser + chats to localStorage
//   -------------------------------------------------- */
//   useEffect(() => {
//     localStorage.setItem("public_users", JSON.stringify(users));
//   }, [users]);

//   useEffect(() => {
//     localStorage.setItem("public_current_user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   useEffect(() => {
//     localStorage.setItem("public_chats", JSON.stringify(chats));
//   }, [chats]);

//   /* --------------------------------------------------
//      ADD NEW USER (Public Register)
//   -------------------------------------------------- */
//   const addUser = (payload) => {
//     const newUser = {
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       totalChat: 0,
//       agencies: [],
//       ...payload,
//     };

//     setUsers((prev) => [...prev, newUser]);
//     return newUser;
//   };

//   /* --------------------------------------------------
//      LOGIN USER
//   -------------------------------------------------- */
//   // const login = (email, password) => {
//   //   const found = users.find(
//   //     (u) => u.email.toLowerCase() === email.toLowerCase()
//   //   );

//   //   if (!found) {
//   //     return { success: false, message: "Email tidak ditemui." };
//   //   }

//   //   setCurrentUser(found);
//   //   return { success: true, user: found };
//   // };
//   const login = (email, password) => {
//   const found = users.find(
//     (u) => u.email.toLowerCase() === email.toLowerCase()
//   );

//   if (!found) {
//     return { success: false, message: "Email tidak ditemui." };
//   }

//   if (found.password !== password) {
//     return { success: false, message: "Kata laluan salah." };
//   }

//   setCurrentUser(found);
//   return { success: true, user: found };
// };



//   /* --------------------------------------------------
//      LOGOUT USER
//   -------------------------------------------------- */
//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem("public_current_user");
//   };

//   /* --------------------------------------------------
//      UPDATE USER 
//   -------------------------------------------------- */
//   const updateUser = (id, changes) => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === id ? { ...u, ...changes } : u))
//     );

//     if (currentUser?.id === id) {
//       setCurrentUser((prev) => ({ ...prev, ...changes }));
//     }
//   };

//   /* --------------------------------------------------
//      CREATE NEW CHAT SESSION — FIXED WITH userName
//   -------------------------------------------------- */
//   const startChat = (userId, agency) => {
//     const user = users.find((u) => u.id === userId);

//     const newChat = {
//       id: Date.now().toString(),
//       userId,
//       userName: user?.name || "Pengguna",
//       agencyId: agency.id,
//       agencyName: agency.name,
//       messages: [
//         {
//           id: "msg-" + Date.now(),
//           sender: "system",
//           text: `Anda telah memulakan chat dengan ${agency.name}.`,
//           createdAt: new Date().toISOString(),
//         },
//       ],
//       status: "active",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     setChats((prev) => [newChat, ...prev]);

//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === userId ? { ...u, totalChat: (u.totalChat || 0) + 1 } : u
//       )
//     );

//     return newChat.id;
//   };

//   /* --------------------------------------------------
//      ADD MESSAGE 
//   -------------------------------------------------- */
//   const addMessage = (chatId, messageText, sender = "user") => {
//     setChats((prev) =>
//       prev.map((c) =>
//         c.id === chatId
//           ? {
//               ...c,
//               messages: [
//                 ...c.messages,
//                 {
//                   id: "msg-" + Date.now(),
//                   sender,
//                   text: messageText,
//                   createdAt: new Date().toISOString(),
//                 },
//               ],
//               updatedAt: new Date().toISOString(),
//             }
//           : c
//       )
//     );
//   };

//   const getChatsForUser = (userId) => {
//     return chats.filter((c) => c.userId === userId);
//   };

//   const getChatById = (chatId) => {
//     return chats.find((c) => c.id === chatId);
//   };

//   return (
//     <PublicUserContext.Provider
//       value={{
//         users,
//         addUser,
//         currentUser,
//         login,
//         logout,
//         updateUser,
//         chats,
//         setChats,
//         startChat,
//         addMessage,
//         getChatsForUser,
//         getChatById,
//       }}
//     >
//       {children}
//     </PublicUserContext.Provider>
//   );
// }

// export function usePublicUsers() {
//   const ctx = useContext(PublicUserContext);
//   if (!ctx)
//     throw new Error("usePublicUsers must be used inside PublicUserProvider");
//   return ctx;
// }


import React, { createContext, useContext, useState, useEffect } from "react";

const PublicUserContext = createContext(null);

export function PublicUserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [chats, setChats] = useState([]);

  /* --------------------------------------------------
     LOAD from localStorage on first load
  -------------------------------------------------- */
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("public_users");
      const savedCurrent = localStorage.getItem("public_current_user");
      const savedChats = localStorage.getItem("public_chats");

      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedCurrent) setCurrentUser(JSON.parse(savedCurrent));
      if (savedChats) setChats(JSON.parse(savedChats));
    } catch (err) {
      console.error("LocalStorage parse error:", err);
    }
  }, []);

  /* --------------------------------------------------
     SAVE users + currentUser + chats to localStorage
  -------------------------------------------------- */
  useEffect(() => {
    localStorage.setItem("public_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("public_current_user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("public_chats", JSON.stringify(chats));
  }, [chats]);

  /* --------------------------------------------------
     ADD NEW USER (Public Register)
  -------------------------------------------------- */
  const addUser = (payload) => {
    const newUser = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      totalChat: 0,
      agencies: [],
      ...payload,
    };

    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  /* --------------------------------------------------
     LOGIN USER
  -------------------------------------------------- */
  // const login = (email, password) => {
  //   const found = users.find(
  //     (u) => u.email.toLowerCase() === email.toLowerCase()
  //   );

  //   if (!found) {
  //     return { success: false, message: "Email tidak ditemui." };
  //   }

  //   setCurrentUser(found);
  //   return { success: true, user: found };
  // };
  const login = (email, password) => {
  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!found) {
    return { success: false, message: "Email tidak ditemui." };
  }

  if (found.password !== password) {
    return { success: false, message: "Kata laluan salah." };
  }

  setCurrentUser(found);
  return { success: true, user: found };
};



  /* --------------------------------------------------
     LOGOUT USER
  -------------------------------------------------- */
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("public_current_user");
  };

  /* --------------------------------------------------
     UPDATE USER 
  -------------------------------------------------- */
  const updateUser = (id, changes) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...changes } : u))
    );

    if (currentUser?.id === id) {
      setCurrentUser((prev) => ({ ...prev, ...changes }));
    }
  };

  /* --------------------------------------------------
     CREATE NEW CHAT SESSION — FIXED WITH userName
  -------------------------------------------------- */
  const startChat = (userId, agency) => {
    const user = users.find((u) => u.id === userId);

    const newChat = {
      id: Date.now().toString(),
      userId,
      userName: user?.name || "Pengguna",
      agencyId: agency.id,
      agencyName: agency.name,
      messages: [
        {
          id: "msg-" + Date.now(),
          sender: "system",
          text: `Anda telah memulakan chat dengan ${agency.name}.`,
          createdAt: new Date().toISOString(),
        },
      ],
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setChats((prev) => [newChat, ...prev]);

    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, totalChat: (u.totalChat || 0) + 1 } : u
      )
    );

    return newChat.id;
  };

  /* --------------------------------------------------
     ADD MESSAGE 
  -------------------------------------------------- */
  const addMessage = (chatId, messageText, sender = "user") => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: "msg-" + Date.now(),
                  sender,
                  text: messageText,
                  createdAt: new Date().toISOString(),
                },
              ],
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );
  };

  const getChatsForUser = (userId) => {
    return chats.filter((c) => c.userId === userId);
  };

  const getChatById = (chatId) => {
    return chats.find((c) => c.id === chatId);
  };

  return (
    <PublicUserContext.Provider
      value={{
        users,
        addUser,
        currentUser,
        login,
        logout,
        updateUser,
        chats,
        setChats,
        startChat,
        addMessage,
        getChatsForUser,
        getChatById,
      }}
    >
      {children}
    </PublicUserContext.Provider>
  );
}

export function usePublicUsers() {
  const ctx = useContext(PublicUserContext);
  if (!ctx)
    throw new Error("usePublicUsers must be used inside PublicUserProvider");
  return ctx;
}





