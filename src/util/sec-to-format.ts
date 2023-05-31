export const secToFormat = (sec: number) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds =(sec - hours * 3600 - minutes * 60).toFixed(0);
  return `${hours}:${minutes}:${seconds}`;
};
