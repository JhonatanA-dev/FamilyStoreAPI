import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserUseCase } from "../useCases/user.usecase";
import { UserCreate, UserUpdate } from "../interfaces/user.interface";
import { prisma } from "../dataBase/prisma.client";

export async function UserRouter(app: FastifyInstance) {

    const userUseCase = new UserUseCase()

    app.post<{ Body: UserCreate }>('/user', async (req, reply) => {
        const { name, email, password} = req.body;
        try {
          const data = await userUseCase.create({
            name,
            email,
            password,
          });
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });

      app.put<{ Body: UserUpdate }>('/user', async (req, reply) => {

        const { id, name, email, password } = req.body;
        try {
          const data = await userUseCase.update({
            id, 
            name,
            email,
            password,
          });
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      
      app.get<{ Params: { id: string }}>('/user/:id', async (req, reply) => {
        const { id } = req.params;
        try {
          const data = await userUseCase.findById(id);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
}