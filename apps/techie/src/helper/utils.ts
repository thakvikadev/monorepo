export const arrayToObjIdKey = (collections: any[], idKey = 'id'): any => {
  const obj = {};
  collections?.forEach((c) => {
    if (c[idKey]) {
      obj[c[idKey]] = c;
    }
  });
  return obj;
};
