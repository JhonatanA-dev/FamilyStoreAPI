import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserUseCase } from "../useCases/user.usecase";

import { prisma } from "../dataBase/prisma.client";

export async function Adm(app: FastifyInstance) {

    const userUseCase = new UserUseCase()

    app.get('/adm/user', async (req:FastifyRequest, reply: FastifyReply) => {
     
      try {
        
        const userFindById = await prisma.user.findMany();
        return reply.send(userFindById);
        
      } catch (error) {
        reply.send(error);
      }
    });
    
    app.get('/adm/children', async (req, reply) => {
  
      try {
        const data = await prisma.children.findMany()
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    app.get('/adm/tasks', async (req, reply) => {
  
      try {
        const data = await prisma.task.findMany()
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    const data = await prisma.children.findMany()
}