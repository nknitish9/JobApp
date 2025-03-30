import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "bookmarked_jobs";

// Get saved jobs
export const getSavedJobs = async () => {
  const jobs = await AsyncStorage.getItem(STORAGE_KEY);
  return jobs ? JSON.parse(jobs) : [];
};

// Save a job
export const saveJob = async (job) => {
  let savedJobs = await getSavedJobs();
  if (!savedJobs.some((j) => j.id === job.id)) {
    savedJobs.push(job);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs));
  }
};

// Remove a job
export const removeJob = async (id) => {
  let savedJobs = await getSavedJobs();
  savedJobs = savedJobs.filter((job) => job.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs));
};

// Check if a job is bookmarked or not
export const isBookmarked = async (id) => {
  const savedJobs = await getSavedJobs();
  return savedJobs.some((job) => job.id === id);
};
