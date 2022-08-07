export const getColorName = (hex: string) => {
  let color = '';

  switch (hex.toUpperCase()) {
    case '#E53E3E':
      color = 'red';
      break;
    case '#ED8936':
      color = 'orange';
      break;
    case '#ECC94B':
      color = 'yellow';
      break;
    case '#48BB78':
      color = 'green';
      break;
    case '#38B2AC':
      color = 'teal';
      break;
    case '#4299E1':
      color = 'blue';
      break;
    case '#0BC5EA':
      color = 'cyan';
      break;
    case '#9F7AEA':
      color = 'purple';
      break;
    case '#ED64A6':
      color = 'pink';
      break;
    case '#718096':
      color = 'gray';
      break;
  }

  return color;
};
