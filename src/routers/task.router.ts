import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TaskUseCase } from "../useCases/task.usecase";
import { TaskCreate, TaskUpdate } from "../interfaces/task.interface";
import { prisma } from "../dataBase/prisma.client";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export async function TaskRouter(app: FastifyInstance) {

    const taskUseCase = new TaskUseCase()

    app.post<{ Body: TaskCreate, }>('/task',{preHandler:isAuthenticated}, async (req, reply) => {
        const { title,description,date,difficulty,taskStatus,childId} = req.body;
        
        try {
          
          const data = await taskUseCase.create({
            title,
            description,
            date,
            difficulty,
            taskStatus,
            childId 
          });
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });

    app.put<{ Body: TaskUpdate }>('/task', {preHandler:isAuthenticated} ,async (req, reply) => {
    
      const { id ,title,description,date,difficulty,taskStatus} = req.body;
      try {
        const data = await taskUseCase.update({
          id , title,description,date,difficulty,taskStatus
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });  
    app.get<{ Params: { id: string } }>('/task/:id',{preHandler:isAuthenticated}, async (req, reply) => {
        const { id } = req.params;
      try {
        const data = await taskUseCase.findByTaskList(id);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    
    app.get<{ Params: { id: string }}>('/taskAnalysis/:id',{preHandler:isAuthenticated}, async (req, reply) => {
      const { id } = req.params;  
      try {
        const data = await taskUseCase.findByIdTaskAnalysis(id)

        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });

    app.get<{ Params: { id: string }}>('/tasksAnalysisList/:id',{preHandler:isAuthenticated}, async (req, reply) => {
      const { id } = req.params;
      try {
        const data = await taskUseCase.findByChildIdTaskAnalysis(id)

        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });

  app.delete<{ Params: { id: string } }>('/task/:id',{preHandler:isAuthenticated}, async (req, reply) => {
    const { id } = req.params;
    try {
      const data = await taskUseCase.delete(id);
      return reply.send(data);
    } catch (error) {
      reply.send(error);    
    }
  });
   
}