export const removeItem = async (itemId) => {
  await fetch(`https://api.todoist.com/rest/v1/tasks/${itemId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${'85eaa8e09a95ed4651de5c90ca7ee667b6f3b229'}`,
    },
  });
};
