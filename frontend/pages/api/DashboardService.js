import axios from "axios";

const baseUrl = "http://localhost:3000";

// Function to get item by name
export const fetchItemByName = async (itemName) => {
  try {
    const response = await axios.get(
      `${baseUrl}/items/fetch_item_by_name/${itemName}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create an item
export const createItem = async (itemData) => {
  try {
    const response = await axios.post(`${baseUrl}/items/create_item`, itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update an item
export const updateItem = async (itemData) => {
  try {
    const response = await axios.post(`${baseUrl}/items/update_item`, itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete an item
export const deleteItem = async (itemData) => {
  try {
    const response = await axios.post(`${baseUrl}/items/delete_item`, itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to issue an item
export const issueItem = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/orders/issue_item`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to return an item
export const returnItem = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/orders/return_item`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
