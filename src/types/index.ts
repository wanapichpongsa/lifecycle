type Deal = {
  product: string;
  price: number;
}

export interface Refurbisher {
  name: string;
  email: string;
  phone: string;
  deals: Deal[];
}