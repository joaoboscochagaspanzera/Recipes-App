export const chunkArray = ({ arr, chunkLength }) => {
  const a = Math.ceil(arr.length / chunkLength);
  const parsedArray = arr.map((element, index) => ({
    element,
    index,
  }));
  const chunks = [];
  for (let i = 0; i < a; i += 1) {
    chunks.push(
      parsedArray.slice(Math.ceil(chunkLength * i), Math.ceil(chunkLength * (i + 1))),
    );
  }
  return chunks;
};
