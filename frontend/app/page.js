"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { fetchItemByName, issueItem } from "@/pages/api/DashboardService";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [itemNameInput, setItemNameInput] = useState("");
  const [studentIdInput, setStudentIdInput] = useState("");
  const [studentNameInput, setStudentNameInput] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleSearch = async () => {
    try {
      const item = await fetchItemByName(searchTerm);
      setItem(item);
      setError(null);
    } catch (error) {
      console.error("Error fetching item:", error);
      setError(error.response?.data.detail || "An error occurred");
      setItem(null);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIssueItem = async () => {
    try {
      const data = {
        item_name: itemNameInput,
        student_id: studentIdInput,
        student_name: studentNameInput,
      };
      await issueItem(data);
      setNotificationMessage("Item issued successfully!");
      setNotificationVisible(true);
    } catch (error) {
      console.error("Error issuing item:", error);
      setNotificationMessage(error.response?.data.detail || "An error occurred while issuing the item!");
      setNotificationVisible(true);
    }
    setItemNameInput("");
    setStudentIdInput("");
    setStudentNameInput("");
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage("");
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Inventory Management System</h1>
      <h2 className={styles.subHeading}>Search Items</h2>
      <div className={styles.formContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
          <button
            className={styles.clearButton}
            onClick={() => {
              setSearchTerm("");
              setItem(null);
              setError(null);
            }}
          >
            Clear
          </button>
        </div>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {item && (
        <div className={styles.itemDetails}>
          <p>
            {item.item_name.toUpperCase()} with ID:{item.item_id} has not been
            issued to anyone.
          </p>
        </div>
      )}
      <h2 className={styles.subHeading}>Issue Items</h2>
      <div className={styles.issueForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Item Name"
          value={itemNameInput}
          onChange={(e) => setItemNameInput(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Student ID"
          value={studentIdInput}
          onChange={(e) => setStudentIdInput(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Student Name"
          value={studentNameInput}
          onChange={(e) => setStudentNameInput(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.searchButton} onClick={handleIssueItem}>
            Issue Item
          </button>
        </div>
        {notificationVisible && (
          <div className={styles.notification}>{notificationMessage}</div>
        )}
      </div>
    </div>
  );
}
