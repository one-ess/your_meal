export const getData = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};
