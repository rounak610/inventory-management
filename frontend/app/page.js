"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import {
  fetchItemByName,
  issueItem,
  returnItem,
  createItem,
  updateItem,
  deleteItem
} from "@/pages/api/DashboardService";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  const [itemNameInput, setItemNameInput] = useState("");
  const [studentIdInput, setStudentIdInput] = useState("");
  const [studentNameInput, setStudentNameInput] = useState("");

  const [itemReturnNameInput, setItemReturnNameInput] = useState("");
  const [studentReturnIdInput, setStudentReturnIdInput] = useState("");
  const [studentReturnNameInput, setStudentReturnNameInput] = useState("");

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");

  const [oldItemName, setOldItemName] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const [deleteItemID, setDeleteItemID] = useState("");
  const [deleteItemName, setDeleteItemName] = useState("");

  const handleDeleteItem = async () => {
    try{
      const data = {
        item_id: deleteItemID,
        item_name: deleteItemName
      };
      await deleteItem(data);
      setNotificationMessage("Item deleted successfully!");
      setNotificationVisible(true);
    } catch (error) {
      setNotificationMessage(
        error.response?.data.detail ||
          "An error occurred while deleting the item!"
      );
      setNotificationVisible(true);
    }
    setDeleteItemID("");
    setDeleteItemName("");
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage("");
    }, 3000);
  };

  const handleUpdateItem = async () => {
    try{
      const data = {
        old_item_name: oldItemName,
        new_item_name: newItemName
      };
      await updateItem(data);
      setNotificationMessage("Item updated successfully!");
      setNotificationVisible(true);
    } catch (error) {
      setNotificationMessage(
        error.response?.data.detail ||
          "An error occurred while updating the item!"
      );
      setNotificationVisible(true);
    }
    setOldItemName("");
    setNewItemName("");
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage("");
    }, 3000);
  };

  const addNewItem = async () => {
    try{
      const data = {
        item_name: itemName,
        item_id: itemId
      };
      console.log(data);
      await createItem(data);
      setNotificationMessage("Item added successfully!");
      setNotificationVisible(true);
    } catch (error) {
      setNotificationMessage(
        error.response?.data.detail ||
          "An error occurred while adding the item!"
      );
      setNotificationVisible(true);
    }
    setItemName("");
    setItemId("");
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage("");
    }, 3000);
  };

  const handleSearch = async () => {
    try {
      const item = await fetchItemByName(searchTerm);
      setItem(item);
      setError(null);
    } catch (error) {
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
      setNotificationMessage(
        error.response?.data.detail ||
          "An error occurred while issuing the item!"
      );
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

  const handleReturnItem = async () => {
    try {
      const data = {
        item_name: itemReturnNameInput,
        student_id: studentReturnIdInput,
        student_name: studentReturnNameInput,
      };
      await returnItem(data);
      setNotificationMessage("Item returned successfully!");
      setNotificationVisible(true);
    } catch (error) {
      setNotificationMessage(
        error.response?.data.detail ||
          "An error occurred while returning the item!"
      );
      setNotificationVisible(true);
    }
    setItemReturnNameInput("");
    setStudentReturnIdInput("");
    setStudentReturnNameInput("");
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage("");
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Inventory Management System</h1>

      <h2 className={styles.subHeading}>Find Items</h2>
      <div className={styles.formContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter item name..."
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
          <button className={styles.orderButton} onClick={handleIssueItem}>
            Issue Item
          </button>
        </div>
        {notificationVisible && (
          <div className={styles.notification}>{notificationMessage}</div>
        )}
      </div>

      <h2 className={styles.subHeading}>Return Items</h2>
      <div className={styles.issueForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Item Name"
          value={itemReturnNameInput}
          onChange={(e) => setItemReturnNameInput(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Student ID"
          value={studentReturnIdInput}
          onChange={(e) => setStudentReturnIdInput(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Student Name"
          value={studentReturnNameInput}
          onChange={(e) => setStudentReturnNameInput(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.orderButton} onClick={handleReturnItem}>
            Return Item
          </button>
        </div>
        {notificationVisible && (
          <div className={styles.notification}>{notificationMessage}</div>
        )}
      </div>

      <h2 className={styles.subHeading}>Add Items</h2>
      <div className={styles.issueForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Item ID"
          style={{ marginRight: '10px' }}
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.orderButton} onClick={addNewItem}>
            Add New Item
          </button>
        </div>
        {notificationVisible && (
          <div className={styles.notification}>{notificationMessage}</div>
        )}
      </div>

      <h2 className={styles.subHeading}>Update Item</h2>
      <div className={styles.issueForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter new name of the item..."
          style={{ marginRight: '10px' }}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter old name of the item..."
          value={oldItemName}
          onChange={(e) => setOldItemName(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.orderButton} onClick={handleUpdateItem} >
            Update Item
          </button>
        </div>
        {notificationVisible && (
          <div className={styles.notification}>{notificationMessage}</div>
        )}
      </div>
      
      <h2 className={styles.subHeading}>Delete Item</h2>
      <div className={styles.issueForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter name of the item"
          style={{ marginRight: '10px' }}
          value={deleteItemName}
          onChange={(e) => setDeleteItemName(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter ID of the item"
          value={deleteItemID}
          onChange={(e) => setDeleteItemID(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.orderButton} onClick={handleDeleteItem} >
            Update Item
          </button>
        </div>
        {notificationVisible && (
          <div className={styles.notification}>{notificationMessage}</div>
        )}
      </div>
      <div style={{ marginTop: '15px', marginBottom:'30px' }}></div>
    </div>
  );
}
