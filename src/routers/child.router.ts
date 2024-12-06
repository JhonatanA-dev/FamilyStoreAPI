import { FastifyInstance } from "fastify";
import { ChildCreateUseCase, ChildLogin, ChildUpdate } from "../interfaces/child.interface";
import { ChildUseCase } from "../useCases/child.usecase";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export async function ChildRouter(app: FastifyInstance) {

    const childUseCase = new ChildUseCase()
   
      app.post<{  Params:{email:string} ,Body: ChildCreateUseCase }>('/children/signup',{preHandler:isAuthenticated}, async (req, reply) => {

          const { name,age,password} = req.body;
          const { email } = req.params;
          try {

            const data = await childUseCase.create({name,age,password},email);
            return reply.send(data);

          } catch (error) {
            reply.send(error);
          }
      });
      app.post<{ Body: ChildLogin }>('/children/signin', async (req, reply) => {
        const { name, password} = req.body;
        try {
          const token = await childUseCase.login({name,password});
          return reply.send(token);
        } catch (error) {
          reply.send(error);
        }
      });
      app.put<{Body: ChildUpdate }>('/children',{preHandler:isAuthenticated}, async (req, reply) => {

        const { id ,age, password } = req.body;

        try {
          const data = await childUseCase.update({ id, age ,password});
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      app.get<{ Params: { email: string }}>('/childrenList',{preHandler:isAuthenticated}, async (req, reply) => {
        const { email } = req.params;
  
        try {
          const data = await childUseCase.findByParents(email);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      app.get<{ Params: { name: string }}>('/children',{preHandler:isAuthenticated}, async (req, reply) => {
        const { name } = req.params;
  
        try {
          const data = await childUseCase.findByName(name);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      app.delete<{ Params: { id: string }}>('/children/:id',{preHandler:isAuthenticated}, async (req, reply) => {
        const { id } = req.params;
        try {
 
          const data = await childUseCase.delete(id);
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
}