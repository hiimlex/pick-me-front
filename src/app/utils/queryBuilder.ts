export const queryBuilder = (query: Record<any, any>) => {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");

  return "?" + queryString;
};
