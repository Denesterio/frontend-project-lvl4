function LSHandler() {}

LSHandler.prototype.get = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);
  return value ?? defaultValue;
};

LSHandler.prototype.getObject = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

LSHandler.prototype.set = (key, value) => {
  localStorage.setItem(key, value);
  return true;
};

LSHandler.prototype.remove = (key) => {
  localStorage.removeItem(key);
};

LSHandler.prototype.setObject = (key, value) => {
  const prepared = JSON.stringify(value);
  localStorage.setItem(key, prepared);
  return true;
};

LSHandler.prototype.hasToken = () => localStorage.getItem('token') !== null;

export default LSHandler;
