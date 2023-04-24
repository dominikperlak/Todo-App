import { v4 as uuidv4 } from 'uuid';

const url = 'https://api.todoist.com/rest/v2/tasks'

export default async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 85eaa8e09a95ed4651de5c90ca7ee667b6f3b229',
        'X-Request-Id': uuidv4()
      }
    })

    return response.json()
  };