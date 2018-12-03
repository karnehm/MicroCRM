interface Customer {
  id: number;
  gender: 'Herr' | 'Frau' | undefined;
  name: string;
  firstname: string;
  phone: {
    number: string;
    type: string;
  };
}
