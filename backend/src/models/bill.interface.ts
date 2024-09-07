export interface Bill {
  uid: string;
  price: number;
  isPayed: boolean;
  payDate: Date;
  expiresAt: Date;
  factures: string[];
}
