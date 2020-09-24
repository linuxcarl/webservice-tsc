import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { Response } from 'superagent';
import { request, expect } from 'chai';

import app from '../../src/app';
import { Order } from '../../src/models/orders';
import { OrderStatus } from '../../src/models/orderStatus';

chai.use(chaiHttp);
const urlServer = 'http://0.0.0.0:3000';

chai.use(chaiHttp);

const order: Order = {
  // generic random value from 1 to 100 only for tests so far
  id: 1,
  userId: 20,
  quantity: 1,
  shipDate: new Date(),
  status: OrderStatus.Placed,
  complete: false,
};

describe('userRoute', () => {
  it('should respond with HTTP 404 status because there is no order', async () => {
    const res: Response = await request(urlServer).get(
      `/store/orders/${order.id}`
    );
    expect(res.status).to.be.equal(404);
  });
  it('should create a new order and retrieve it back', async () => {
    const res: Response = await request(urlServer)
      .post(`/store/orders/`)
      .send(order);
    expect(res.status).to.be.equal(201);
    expect(res.body.userId).to.be.equal(order.userId);
    expect(res.body.complete).to.be.equal(false);
    order.id = res.body.id;
  });
  it('should return the order created on the step before', async () => {
    const res: Response = await request(urlServer).get(
      `/store/orders/${order.id}`
    );
    expect(res.status).to.be.equal(200);
    expect(res.body.id).to.be.equal(order.id);
    expect(res.body.status).to.be.equal(order.status);
  });
  it('should return all orders so far', async () => {
    const res: Response = await request(urlServer).get(`/store/orders/`);
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(1);
  });
  it('should not return orders because offset is higher than the size of the orders array', async () => {
    const res: Response = await request(urlServer).get(
      `/store/orders?offset=2&limit=2`
    );
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(0);
  });
  it('should return the inventory for all users', async () => {
    const res: Response = await request(urlServer).get(`/store/inventory`);
    expect(res.status).to.be.equal(200);
    expect(res.body[20].length).to.be.equal(1);
  });
  it('should remove an existing order', async () => {
    const res: Response = await request(urlServer).del(
      `/store/orders/${order.id}`
    );
    expect(res.status).to.be.equal(204);
  });
  it('should return 404 when it is trying to remove an order because the order does not exist', async () => {
    const res: Response = await request(urlServer).del(
      `/store/orders/${order.id}`
    );
    expect(res.status).to.be.equal(404);
  });
});
