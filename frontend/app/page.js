"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import {
  fetchItemByName,
  issueItem,
  returnItem,
  createItem,
  updateItem,
  deleteItem,
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
  const [totalQuantity, setTotalQuantity] = useState("");

  const [oldItemName, setOldItemName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");

  const [deleteItemID, setDeleteItemID] = useState("");
  const [deleteItemName, setDeleteItemName] = useState("");

  const handleDeleteItem = async () => {
    try {
      const data = {
        item_id: deleteItemID,
        item_name: deleteItemName,
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
    try {
      const data = {
        old_item_name: oldItemName,
        new_item_name: newItemName,
        new_total_quantity: newItemQuantity,
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
    setNewItemQuantity("");
    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage("");
    }, 3000);
  };

  const addNewItem = async () => {
    try {
      const data = {
        item_name: itemName,
        item_id: itemId,
        total_quantity: totalQuantity,
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
    setTotalQuantity("");
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
      <div style={{ marginTop: "15px" }}></div>

      <h1 className={styles.heading}>Inventory Management System</h1>

      <h2 className={styles.subHeading}>Search for Items</h2>
      <div className={styles.formContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter item name..."
          value={searchTerm}
          onChange={handleChange}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.searchButton}
            onClick={handleSearch}
            disabled={!searchTerm}
          >
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
        <div className={styles.itemDetails} style={{ marginLeft: "402px" }}>
          <p>
            Item Name: {item.item_name.toUpperCase()}, Item ID: {item.item_id}, Availability: {item.available}, Total Quantity: {item.total_quantity}
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
          <button
            className={styles.orderButton}
            onClick={handleIssueItem}
            disabled={!studentIdInput || !studentNameInput || !itemNameInput}
          >
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
          <button
            className={styles.orderButton}
            onClick={handleReturnItem}
            disabled={
              !studentReturnIdInput ||
              !studentReturnNameInput ||
              !itemReturnNameInput
            }
          >
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
          style={{ marginRight: "5px" }}
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Item Name"
          style={{ marginRight: "5px" }}
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter Item Quantity"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.orderButton}
            onClick={addNewItem}
            disabled={!itemId || !itemName}
          >
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
          style={{ marginRight: "5px" }}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          style={{ marginRight: "5px" }}
          placeholder="Enter old name of the item..."
          value={oldItemName}
          onChange={(e) => setOldItemName(e.target.value)}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter new quantit of the item..."
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.orderButton}
            onClick={handleUpdateItem}
            disabled={!newItemName || !oldItemName}
          >
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
          style={{ marginRight: "10px" }}
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
          <button
            className={styles.orderButton}
            onClick={handleDeleteItem}
            disabled={!deleteItemID || !deleteItemName}
          >
            Delete Item
          </button>
        </div>
        {notificationVisible && (
          <div className={styles.notification}>{notificationMessage}</div>
        )}
      </div>

      <div style={{ marginTop: "15px", marginBottom: "30px" }}></div>
    </div>
  );
}
