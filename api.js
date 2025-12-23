const parseResponse = async (response) => {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed: ${response.status} ${body}`);
  }
  return response.json();
};

export const getGlobalInstalls = async () => {
  try {
    const response = await fetch('/api/installs');
    const data = await parseResponse(response);
    return data.installs ?? 0;
  } catch (error) {
    console.error('Failed to fetch installs:', error);
    return 0;
  }
};

export const incrementGlobalInstalls = async () => {
  try {
    const response = await fetch('/api/installs/increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await parseResponse(response);
    return data.installs ?? 0;
  } catch (error) {
    console.error('Failed to increment installs:', error);
    return 1337;
  }
};
