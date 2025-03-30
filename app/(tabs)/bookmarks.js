import React, { useState,useCallback } from "react";
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getSavedJobs } from "../db/storage";
import { useFocusEffect } from "@react-navigation/native"; 


const BookmarksScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getSavedJobs().then((savedJobs) => {
        setJobs(savedJobs);
        setLoading(false);
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : jobs.length === 0 ? (
        <Text>No bookmarked jobs</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: `/jobs/${item.id}`, params: { job: JSON.stringify(item) } })}>
              <Text style={styles.company_name}>{item.company_name}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Salary: {`${item.salary_min ? item.salary_min : 0}-${item.salary_max ? item.salary_max : "Negotiable"}`}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { backgroundColor: "#f9f9f9", padding: 15, marginVertical: 5, borderRadius: 5, width: "50%", alignSelf: "center", borderWidth: 1, borderColor: "#ddd" },
  title: { fontSize: 18 },
  company_name: { fontSize: 20, color: "#555", fontWeight: "bold" },
});

export default BookmarksScreen;