'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { fetchItemByName, updateItem, deleteItem, issueItem, returnItem } from "@/pages/api/DashboardService";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const item = await fetchItemByName(searchTerm);
      setItem(item);
      setError(null);
    } catch (error) {
      console.error('Error fetching item:', error);
      setError('An error occurred while fetching the item.');
      setItem(null);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
      <div className={styles.container}>
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
              setSearchTerm('');
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
          {/* Render item details */}
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      )}
    </div>   
  );
}
