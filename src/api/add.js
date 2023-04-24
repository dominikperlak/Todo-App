export const addItem = async (item) => {
  const response = await fetch("https://api.todoist.com/rest/v2/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${'85eaa8e09a95ed4651de5c90ca7ee667b6f3b229'}`,
    },
    body: JSON.stringify({ content: item }),
  });
  const data = await response.json();
  return data.id;
};
