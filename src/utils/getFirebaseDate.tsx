export const getFirebaseDate = (timestamp: any): string => {
  const year = timestamp.toDate().getFullYear();
  const month = timestamp.toDate().getMonth() + 1;
  const date = timestamp.toDate().getDate();
  return `${year}-${month}-${date}`;
};
