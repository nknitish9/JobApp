import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { saveJob, removeJob, isBookmarked } from "../db/storage";

const JobDetailsScreen = () => {
  const router = useRouter();
  const { job } = useLocalSearchParams();
  const jobData = job ? JSON.parse(job) : null;

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (jobData) {
      isBookmarked(jobData.id).then((status) => setBookmarked(status));
    }
  }, [jobData]);

  if (!jobData) return <Text style={styles.errorText}>Job not found</Text>;

  const toggleBookmark = async () => {
    let updatedBookmarkStatus;
    
    if (bookmarked) {
      await removeJob(jobData.id);
      updatedBookmarkStatus = false;
    } else {
      await saveJob(jobData);
      updatedBookmarkStatus = true;
    }
    
    setBookmarked(updatedBookmarkStatus);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{jobData.company_name}</Text>
      <Text>Role: {jobData.job_role}</Text>
      <Text>Location: {jobData.location}</Text>
      <Text>Salary: {`${jobData.salary_min ? jobData.salary_min : 0}-${jobData.salary_max ? jobData.salary_max : "Negotiable"}`}</Text>
      <Text>Description: {jobData.title}</Text>

      <Button style={styles.button} title={bookmarked ? "Remove Bookmark" : "Bookmark Job"} onPress={toggleBookmark} />
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, width:"50%", alignSelf:"center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  errorText: { fontSize: 18, color: "red", textAlign: "center" },
  button: { marginBottom: 10 },
});

export default JobDetailsScreen;