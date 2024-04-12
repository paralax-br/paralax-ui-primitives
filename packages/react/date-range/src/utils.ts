export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );

export const generateRows = <T extends any[]>(data: T, size: number): T[] => {
  return data.reduce((acc, curr, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(curr);
    return acc;
  }, []);
};

export const getIndex = <T extends number | any>(item: T, data: T[]) =>
  data.findIndex((dataItem: T) => dataItem === item);

export const getQuarters = (years: number[], size: number = 4): number[][] =>
  years.reduce((acc: number[][], curr, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(curr);
    return acc;
  }, []);
