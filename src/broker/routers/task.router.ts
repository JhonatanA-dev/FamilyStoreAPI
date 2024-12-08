import { FastifyInstance} from "fastify";
import { TaskUseCase } from "../useCases/task.usecase";
import { TaskChildUpdate, TaskCreate, TaskUpdate, TaskUserUpdate } from "../interfaces/task.interface";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export async function TaskRouter(app: FastifyInstance) {

    const taskUseCase = new TaskUseCase()

    app.post<{  Params: { email: string } , Body: TaskCreate, }>('/task',{preHandler:isAuthenticated}, async (req, reply) => {
        const { title,description,date,difficulty,coins,childId} = req.body;
        const {email} = req.params;
        try {
          const data = await taskUseCase.create(email,{
            title,
            description,
            date,
            difficulty,
            coins,
            childId 
          });
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
   
    app.put<{  Params: { email: string } , Body: TaskUserUpdate }>('/task', {preHandler:isAuthenticated} ,async (req, reply) => {
      try {
        const dataBody = req.body;
        const {email} = req.params;
        const data = await taskUseCase.taskUserUpdate(email,dataBody);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    app.put<{  Params: { email: string } , Body: TaskChildUpdate }>('/task/status', {preHandler:isAuthenticated} ,async (req, reply) => {
      try {
        const dataBody = req.body;
        const {email} = req.params;
        const data = await taskUseCase.taskChildUpdate(email,dataBody);
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
    

   
}