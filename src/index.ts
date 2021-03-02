import ecuador from './ecuador';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b + 1;
};

export const validar = (id: string, nacionalidad: string) => {
  if (nacionalidad === 'ecuatoriano') return ecuador(id);

  return false;
};
