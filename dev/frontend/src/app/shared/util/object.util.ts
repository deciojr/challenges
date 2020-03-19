export const filterObject = (object: object, predicate: (args: any) => boolean) => {
  const filtered = {};

  for (const field in object) {
    if (object.hasOwnProperty(field) && predicate(object[field])) {
      filtered[field] = object[field];
    }
  }
  return filtered;
};
