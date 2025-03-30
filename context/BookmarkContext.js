import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const storedBookmarks = await AsyncStorage.getItem("bookmarkedJobs");
      if (storedBookmarks) {
        setBookmarkedJobs(JSON.parse(storedBookmarks));
      }
    };
    loadBookmarks();
  }, []);

  const toggleBookmark = async (job) => {
    let updatedBookmarks;
    if (bookmarkedJobs.some((j) => j.id === job.id)) {
      updatedBookmarks = bookmarkedJobs.filter((j) => j.id !== job.id);
    } else {
      updatedBookmarks = [...bookmarkedJobs, job];
    }
    setBookmarkedJobs(updatedBookmarks);
    await AsyncStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedJobs, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);