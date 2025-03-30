import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=1`);
        console.log(response.data.results);
        setJobs(response.data.results);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: `/jobs/${item.id}`, params: { job: JSON.stringify(item) } })}>
            <Text style={styles.company_name}>{item.company_name}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Salary: {`${item.salary_min?item.salary_min:0}-${item.salary_max?item.salary_max:"Negotiable"}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { backgroundColor: "#f9f9f9", padding: 15, marginVertical: 5, borderRadius: 5 ,width:"50%",alignSelf:"center",borderWidth:1,borderColor:"#ddd"},
  title: { fontSize: 18 },
  company_name: { fontSize: 20, color: "#555",  fontWeight: "bold" },
});

export default JobsScreen;