import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

let users: Array<User> = [];

export let getUser = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;
  const user = users.find((obj) => obj.username === username);
  const httpStatus = user ? 200 : 404;
  return res.status(httpStatus).send();
};

export let addUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: Math.floor(Math.random() * 100) + 1,
    ...req.body,
    userStatus: 1,
  };
  users.push(user);
  return res.status(201).send(user);
};

export let updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;
  const userIndex = users.findIndex((item) => item.username === username);
  if (userIndex === -1) {
    return res.status(404).send();
  }

  const user = Object.assign(users[userIndex], req.body);

  users[userIndex] = user;
  return res.status(204).send();
};
export let removeUser = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;
  const userIndex = users.findIndex((item) => item.username === username);

  if (userIndex === -1) {
    return res.status(404).send();
  }

  users = users.filter((item) => item.username !== username);

  return res.status(204).send();
};
