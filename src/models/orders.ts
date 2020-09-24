import { OrderStatus } from './orderStatus';

export interface Order {
  id: number;
  userId: number;
  quantity: number;
  shipDate: Date;
  status: OrderStatus;
  complete: boolean;
}
