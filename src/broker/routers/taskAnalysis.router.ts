import { FastifyInstance} from "fastify";
import { TaskAnalysisUseCase } from "../useCases/taskAnalysis.usecase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { TaskUserUpdate } from "../interfaces/task.interface";

export async function TaskAnalysisRouter(app: FastifyInstance) {

    const taskAnalysisUseCase = new TaskAnalysisUseCase()
    
    app.get<{ Params: { id: string }}>('/taskAnalysis/:id',{preHandler:isAuthenticated}, async (req, reply) => {
      const { id } = req.params;  
      try {
        const data = await taskAnalysisUseCase.findByIdTaskAnalysis(id)

        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });

    app.get<{ Params: { id: string }}>('/taskAnalysis/list/:id',{preHandler:isAuthenticated}, async (req, reply) => {
      const { id } = req.params;
      try {
        const data = await taskAnalysisUseCase.findByChildIdTaskAnalysis(id)
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    app.post<{ Params: { email: string },Body: { taskId: string }}>('/confirmedTask',{preHandler:isAuthenticated}, async (req, reply) => {
      const { email } = req.params;  
      const { taskId } = req.body;
      try {
        const data = await taskAnalysisUseCase.confirmedTaskAnalysis(taskId,email)

        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });

    app.post<{  Params: { email: string },Body: TaskUserUpdate}>('/redoTask',{preHandler:isAuthenticated}, async (req, reply) => {
      const { email } = req.params;
      const bodyData = req.body;
      try {
        const data = await taskAnalysisUseCase.redoTaskAnalysis(bodyData,email)
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    
   
}