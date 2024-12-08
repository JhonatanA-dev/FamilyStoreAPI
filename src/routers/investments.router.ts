import { FastifyInstance } from "fastify";
import { InvestmentAdmCreated} from "../interfaces/investmentsAdm.interface";
import { InvestmentAdmUseCase } from "../useCases/investmentsAdm.usecase";
import { InvestmentCreated } from "../interfaces/investments.interface";
import { InvestmentUseCase } from "../useCases/investments.usecase";

import { isAuthenticated } from "../middlewares/isAuthenticated";
export async function InvestmentRouter(app: FastifyInstance) {

    const investmentAdmUseCase = new InvestmentAdmUseCase()
    const investmentUseCase = new InvestmentUseCase()

    app.post<{ Body: InvestmentAdmCreated , Params:{email:string} }>('/investmentsAdm',{preHandler:isAuthenticated}, async (req, reply) => {
        const data = req.body;
        const { email } = req.params;
        try {
          const created = await investmentAdmUseCase.create(email, data);
          return reply.send(created);
        } catch (error) {
          reply.send(error);
        }
    });
    app.get<{ Params:{id:string} }>('/investmentsAdm/:id',{preHandler:isAuthenticated}, async (req, reply) => {
      const { id } = req.params;
      try {
          const data = await investmentAdmUseCase.findById(id);
          return reply.send(data);
      } catch (error) {
          reply.send(error);
      }
    });
    app.get('/investmentsAdm',{preHandler:isAuthenticated}, async (req, reply) => {
            try {
                const data = await investmentAdmUseCase.findByList()
                return reply.send(data);
            } catch (error) {
                reply.send(error);
            }
    });
    app.get<{ Params:{id:string} }>('/investments/:id',{preHandler:isAuthenticated}, async (req, reply) => {
      const { id } = req.params;
      try {
          const data = await investmentUseCase.findById(id);
          return reply.send(data);
      } catch (error) {
          reply.send(error);
      }
    });
    app.get('/investments',{preHandler:isAuthenticated}, async (req, reply) => {
            
      try {
          const data = await investmentUseCase.findByList();
          return reply.send(data);
      } catch (error) {
          reply.send(error);
      }
    });
    app.post<{ Body: InvestmentCreated , Params:{name:string} }>('/investments/buyShares',{preHandler:isAuthenticated}, async (req, reply) => {
        const data = req.body;
        const { name } = req.params;
        try {
          const created = await investmentUseCase.buyShares(name, data);
          return reply.send(created);
        } catch (error) {
          reply.send(error);
        }
    });
    app.post<{ Body: InvestmentCreated , Params:{name:string} }>('/investments/sellShares',{preHandler:isAuthenticated}, async (req, reply) => {
      const data = req.body;
      const { name } = req.params;
      try {
        const created = await investmentUseCase.sellShares(name, data.idInvestment);
        return reply.send(created);
      } catch (error) {
        reply.send(error);
      }
  });
}