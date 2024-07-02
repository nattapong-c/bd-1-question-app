import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Leaderboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const usersLocal = localStorage.getItem("users");
    if (usersLocal) {
      const sorted = (JSON.parse(usersLocal) as []).sort((a, b) =>
        a["score"] < b["score"] ? 1 : -1
      );
      setUsers(sorted);
    }
  }, []);

  return (
    <>
      <div>
        <div style={styles.title}>
          <h1>Leaderboard</h1>
        </div>
        <div>
          <div style={styles.header}>
            <h3>Name</h3>
            <h3>Score</h3>
          </div>
        </div>
      </div>

      <ScrollView>
        <div>
          {users.map((item, index) => (
            <div
              key={index}
              style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
            >
              <p>{item.name}</p>
              <p>{item.score}</p>
            </div>
          ))}
        </div>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    backgroundColor: "#a2c6ff",
    padding: 20,
  },
  rowEven: {
    backgroundColor: "#e7cbff",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  rowOdd: {
    backgroundColor: "#e5e5e5",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#a2c6ff",
  },
});
