export const getItems = async () => {
    const response = await fetch("https://api.todoist.com/rest/v1/tasks", {
      headers: {
        Authorization: `Bearer ${'85eaa8e09a95ed4651de5c90ca7ee667b6f3b229'}`,
      },
    });
    const data = await response.json();
    return data;
  };
  