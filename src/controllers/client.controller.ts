import { Request, Response } from 'express';
import { addClient, findClients } from '../services/client.service';

export const addClientHandler = async (req: Request, res: Response) => {
  const { name, type } = req.body;
  try {
    const client = await addClient({ name, type });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const findClientsHandler = async (req: Request, res: Response) => {
  try {
    const clients = await findClients({});
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}