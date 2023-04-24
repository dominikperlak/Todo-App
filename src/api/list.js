import axios from 'axios';

export const fetchItems = async () => {
  const response = await axios.get('https://api.todoist.com/rest/v2/tasks', {
    headers: {
      "Authorization": `Bearer ${'85eaa8e09a95ed4651de5c90ca7ee667b6f3b229'}`,
    },
  });
  return response.data;
};
