// Function to save an item with expiration in local storage
const saveItemWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl, // ttl is time to live in milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Function to get an item from local storage and check for expiration
const getItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // If the item has expired, remove it and return null
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

// Exported functions to save authToken and userId with a default expiry (e.g., 1 hour)
export const saveAuthTokenLocal = (token, ttl = 3600000) => {
  // ttl defaults to 1 hour
  if (token) {
    saveItemWithExpiry('authToken', token, ttl);
  } else {
    console.warn(
      'Attempted to save an undefined or null token in local storage'
    );
  }
};

export const saveUserIdLocal = (userId, ttl = 3600000) => {
  // ttl defaults to 1 hour
  if (userId) {
    saveItemWithExpiry('userId', userId, ttl);
  } else {
    console.warn(
      'Attempted to save an undefined or null userId in local storage'
    );
  }
};

export const getAuthTokenLocal = () => getItemWithExpiry('authToken');
export const getUserIdLocal = () => getItemWithExpiry('userId');
