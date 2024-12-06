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
   
}