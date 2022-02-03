export const getAll = async <T>(url: string, queryParams = ''): Promise<T> => {
  const response = await fetch(`${url}${queryParams}`);
  const data = await response.json();
  return data;
};
