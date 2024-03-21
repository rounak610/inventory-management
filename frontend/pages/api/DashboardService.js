import axios from 'axios';

// Function to fetch item by name
const baseUrl = "http://localhost:3000";

export const fetchItemByName = async (itemName) => {
  try {
    const response = await axios.get(`${baseUrl}/items/fetch_item_by_name/${itemName}`);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update an item
export const updateItem = async (itemId, itemData) => {
  try {
    const response = await axios.post(`${baseUrl}/items/update_item/${itemId}`, itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete an item
export const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`${baseUrl}/items/delete_item/${itemId}`);
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
