import { FastifyInstance} from "fastify";
import { TaskAnalysisUseCase } from "../useCases/taskAnalysis.usecase";
import { isAuthenticated } from "../middlewares/isAuthenticated";

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

    app.get<{ Params: { id: string }}>('/tasksAnalysisList/:id',{preHandler:isAuthenticated}, async (req, reply) => {
      const { id } = req.params;
      try {
        const data = await taskAnalysisUseCase.findByChildIdTaskAnalysis(id)
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });
    app.post<{ Params: { email: string },Body: { taskId: string }}>('/taskAnalysis/confirmedTask',{preHandler:isAuthenticated}, async (req, reply) => {
      const { email } = req.params;  
      const { taskId } = req.body;
      try {
        const data = await taskAnalysisUseCase.confirmedTaskAnalysis(taskId,email)

        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });

    app.post<{  Params: { email: string },Body: { id: string , date:string , difficulty: 2,}}>('/taskAnalysis/redoTask',{preHandler:isAuthenticated}, async (req, reply) => {
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