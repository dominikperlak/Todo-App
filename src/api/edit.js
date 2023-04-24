export const editItem = async (itemId, newValue) => {
    await fetch(`https://api.todoist.com/rest/v1/tasks/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 85eaa8e09a95ed4651de5c90ca7ee667b6f3b229`,
      },
      body: JSON.stringify({ content: newValue }),
    });
  };
  