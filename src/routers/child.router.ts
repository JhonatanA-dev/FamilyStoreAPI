import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ChildCreate, ChildUpdate } from "../interfaces/child.interface";
import { ChildUseCase } from "../useCases/child.usecase";

export async function ChildRouter(app: FastifyInstance) {

    const childUseCase = new ChildUseCase()

    app.post<{ Body: ChildCreate }>('/children', async (req, reply) => {

        const {  name,age,level,userId} = req.body;

        try {

          const data = await childUseCase.create({name,age,level,userId});
          return reply.send(data);

        } catch (error) {
          reply.send(error);
        }
      });
      app.put<{Body: ChildUpdate }>('/children', async (req, reply) => {

        const { id , name, age, level } = req.body;

        try {
          const data = await childUseCase.update({id, name, age, level});
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      app.get<{ Params: { id: string }}>('/children/:id', async (req, reply) => {
        const { id } = req.params;
        try {
          const data = await childUseCase.findByParents(id);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      app.delete<{ Params: { id: string }}>('/children/:id', async (req, reply) => {
        const { id } = req.params;
        try {
          const data = await childUseCase.delete(id);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
}