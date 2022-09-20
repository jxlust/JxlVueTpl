export const isEmptyObject = (obj: any) => {
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
};

export const extend = Object.assign;
