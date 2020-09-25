import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { Order } from '../models/orders';
import { OrderStatus } from '../models/orderStatus';

let orders: Array<Order> = [];

export let getOrder = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const order = orders.find((obj) => obj.id === Number(id));
  const httpStatusCode = order ? 200 : 404;
  return res.status(httpStatusCode).send(order);
};

export let getAllOrders = (req: Request, res: Response, next: NextFunction) => {
  const { limit = orders.length, offset = 0 } = req.query;

  return res.status(200).send(_(orders).drop(offset).take(limit).value());
};

export let addOrder = (req: Request, res: Response, next: NextFunction) => {
  const order: Order = {
    // generic random value from 1 to 100 only for tests so far
    id: Math.floor(Math.random() * 100) + 1,
    ...req.body.userId,
    status: OrderStatus.Placed,
    complete: false,
  };
  orders.push(order);
  return res.status(201).send(order);
};

export let removeOrder = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const orderIndex = orders.findIndex((item: Order) => item.id === Number(id));

  if (orderIndex === -1) {
    return res.status(404).send();
  }

  orders = orders.filter((item: Order) => item.id !== Number(id));

  return res.status(204).send();
};

export let getInventory = (req: Request, res: Response, next: NextFunction) => {
  const { status: string } = req.query;
  let inventoryOrders = orders;
  if (status) {
    inventoryOrders = inventoryOrders.filter((item) => item.status === status);
  }

  const grouppedOrders = _.groupBy(inventoryOrders, 'userId');
  return res.status(200).send(grouppedOrders);
};
