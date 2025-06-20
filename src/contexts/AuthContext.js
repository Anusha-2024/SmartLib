import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [rentedBooks, setRentedBooks] = useState(() => {
    if (!user) return [];
    const savedRented = localStorage.getItem(`rentedBooks_${user.username}`);
    return savedRented ? JSON.parse(savedRented) : [];
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`rentedBooks_${user.username}`, JSON.stringify(rentedBooks));
    }
  }, [rentedBooks, user]);

  const login = (username, password) => {
    const foundUser = registeredUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser({ username: foundUser.username });
      return true;
    }
    return false;
  };

  const register = (newUser) => {
    const exists = registeredUsers.some(
      (u) => u.username === newUser.username || u.email === newUser.email
    );
    if (!exists) {
      setRegisteredUsers([...registeredUsers, newUser]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addRentedBook = (book) => {
    setRentedBooks((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (!exists) {
        return [...prev, book];
      }
      return prev;
    });
  };

  // New function to add multiple rented books at once
  const addRentedBooks = (books) => {
    setRentedBooks((prev) => {
      const newBooks = books.filter(book => !prev.some(b => b.id === book.id));
      if (newBooks.length > 0) {
        return [...prev, ...newBooks];
      }
      return prev;
    });
  };

  // Clear rentedBooks when user logs out
  useEffect(() => {
    if (!user) {
      setRentedBooks([]);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, registeredUsers, setRegisteredUsers, login, logout, register, rentedBooks, addRentedBook, addRentedBooks }}>
      {children}
    </AuthContext.Provider>
  );
};
