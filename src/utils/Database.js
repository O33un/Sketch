// src/utils/Database.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("fitness.db");

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS activity (
        date TEXT PRIMARY KEY,
        steps INTEGER DEFAULT 0,
        distance REAL DEFAULT 0.0
      );`,
      [],
      () => console.log("DB initialized"),
      (_, err) => console.error("DB init error", err)
    );
  });
};

export const saveDailyData = (date, steps, distance) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT OR REPLACE INTO activity (date, steps, distance) VALUES (?, ?, ?);`,
      [date, steps, distance],
      () => console.log("Data saved"),
      (_, err) => console.error("Save error", err)
    );
  });
};

export const getDailyData = (date, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM activity WHERE date = ?;`,
      [date],
      (_, { rows }) => callback(rows._array[0] || { steps: 0, distance: 0 }),
      (_, err) => console.error("Fetch error", err)
    );
  });
};

export const getMonthlyData = (monthStart, monthEnd, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM activity WHERE date BETWEEN ? AND ?;`,
      [monthStart, monthEnd],
      (_, { rows }) => callback(rows._array),
      (_, err) => console.error("Monthly fetch error", err)
    );
  });
};
