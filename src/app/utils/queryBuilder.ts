export const queryBuilder = (path: string, filters?: Record<any, any>) => {
  let url = path;

  if (filters) {
    const query = Object.keys(filters)
      .map((key) => (filters[key] ? `${key}=${filters[key]}` : ""))
      .join("&");

    if (query) {
      url += "?";
      url += query;
    }
  }

  return url;
};
