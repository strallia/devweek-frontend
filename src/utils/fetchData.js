/**
 * Fetch backend data with error handling.
 * @param {String} endpoints
 * @param {String} method - "POST", "GET", "DELETE", or "PUT"
 * @param {Object} body
 * @returns {Object} response
 */
export const fetchData = async (endpoint, method, body) => {
  try {
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      mode: 'cors',
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error(`Error fetching at ${endpoint}`, err);
    throw new Error(err.message);
  }
};
