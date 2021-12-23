export const duplicate = (arr: string[]) => {
  let a: string[] = [],
    b: number[] = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
};

export const descSort = (arrayLabel: string[], arrayData: number[]) => {
  let arrayOfObj = arrayLabel.map(function (d, i) {
    return {
      label: d,
      data: arrayData[i] || 0,
    };
  });

  let sortedArrayOfObj = arrayOfObj.sort((a, b) => {
    return b.data - a.data;
  });

  let newArrayLabel: string[] = [];
  let newArrayData: number[] = [];
  sortedArrayOfObj.forEach(function (d) {
    newArrayLabel.push(d.label);
    newArrayData.push(d.data);
  });
  return [newArrayLabel, newArrayData];
};
