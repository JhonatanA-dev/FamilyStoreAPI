import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TaskUseCase } from "../useCases/task.usecase";
import { TaskCreate, TaskUpdate } from "../interfaces/task.interface";
import { prisma } from "../dataBase/prisma.client";

export async function TaskRouter(app: FastifyInstance) {

    const taskUseCase = new TaskUseCase()

    app.post<{ Body: TaskCreate, }>('/task', async (req, reply) => {
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

    app.put<{ Body: TaskUpdate }>('/task', async (req, reply) => {
    
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

    app.delete<{ Params: { id: string } }>('/task/:id', async (req, reply) => {
        const { id } = req.params;
        try {
          const data = await taskUseCase.delete(id);
          return reply.send(data);
        } catch (error) {
          reply.send(error);    
        }
      });

      
    app.get<{ Params: { childId: string } }>('/task/:childId', async (req, reply) => {
        const { childId } = req.params;
      try {
        const data = await taskUseCase.findByTaskList(childId);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    
    app.get<{ Params: { taskId: string }}>('/taskAnalysis/:taskId', async (req, reply) => {
      const { taskId } = req.params;
    try {
      const data = await taskUseCase.findByIdTaskAnalysis(taskId)

      //verificar se a tarefa foi concluida ou esta atrasado
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
   
}