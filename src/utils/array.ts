export class ArrayUtil {
  public static mergeObjectsByKey<T>(arr: Array<T>, key: string): Array<T> {
    const mergedObjects = {};
    arr.forEach((obj) => {
      if (mergedObjects[obj[key]]) {
        mergedObjects[obj[key]] = { ...mergedObjects[obj[key]], ...obj };
      } else {
        mergedObjects[obj[key]] = obj;
      }
    });
    return Object.values(mergedObjects);
  }
}
