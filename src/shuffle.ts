// This function comes from a cut feature of ramda.
// Source: https://github.com/ramda/ramda/pull/590/files
function shuffler<T>(random: any) {
  return (list: T[]) => {
    let idx = -1;
    const len = list.length;
    let position;
    const result: T[] = [];
    while (++idx < len) {
      position = Math.floor((idx + 1) * random());
      result[idx] = result[position];
      result[position] = list[idx];
    }
    return result;
  };
}

export function shuffle<T>(list: T[]) {
  return shuffler<T>(Math.random)(list);
}
