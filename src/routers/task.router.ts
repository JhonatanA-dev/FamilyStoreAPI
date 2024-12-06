import { FastifyInstance} from "fastify";
import { TaskUseCase } from "../useCases/task.usecase";
import { TaskCreate, TaskUpdate } from "../interfaces/task.interface";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export async function TaskRouter(app: FastifyInstance) {

    const taskUseCase = new TaskUseCase()

    app.post<{  Params: { email: string } , Body: TaskCreate, }>('/task',{preHandler:isAuthenticated}, async (req, reply) => {
        const { title,description,date,difficulty,taskStatus,childId} = req.body;
        const {email} = req.params;
        try {
          const data = await taskUseCase.create(email,{
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
   
    app.put<{  Params: { email: string } , Body: TaskUpdate }>('/task', {preHandler:isAuthenticated} ,async (req, reply) => {
    
      const { id ,title,description,date,difficulty,taskStatus} = req.body;
      const {email} = req.params;
      try {
        const data = await taskUseCase.update(email,{
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
    

   
}