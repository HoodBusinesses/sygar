export function areObjectsEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  // If both are the same reference, they are equal
  if (obj1 === obj2) return true;

  // If either is not an object or is null, they are not equal
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  // Get keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // If they have a different number of keys, they are not equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Compare keys and values recursively
  for (const key of keys1) {
    // Check if the key exists in both objects and their values are equal
    if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
