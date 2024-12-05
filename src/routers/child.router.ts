import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ChildCreate, ChildUpdate } from "../interfaces/child.interface";
import { ChildUseCase } from "../useCases/child.usecase";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export async function ChildRouter(app: FastifyInstance) {

    const childUseCase = new ChildUseCase()

      app.post<{ Body: ChildCreate }>('/children',{preHandler:isAuthenticated}, async (req, reply) => {

          const {  name,age,level,userId} = req.body;
          try {

            const data = await childUseCase.create({name,age,level,userId});
            return reply.send(data);

          } catch (error) {
            reply.send(error);
          }
      });
      app.put<{Body: ChildUpdate }>('/children',{preHandler:isAuthenticated}, async (req, reply) => {

        const { id , name, age, level } = req.body;

        try {
          const data = await childUseCase.update({id, name, age, level});
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      app.get<{ Params: { email: string }}>('/children',{preHandler:isAuthenticated}, async (req, reply) => {
        const { email } = req.params;
        
        try {
          const data = await childUseCase.findByParents(email);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      app.delete<{ Params: { id: string }}>('/children/:id',{preHandler:isAuthenticated}, async (req, reply) => {
        const { id } = req.params;
        if (!id) {
          throw new Error('Id não informado');
        }
        try {
 
          const data = await childUseCase.delete(id);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
}