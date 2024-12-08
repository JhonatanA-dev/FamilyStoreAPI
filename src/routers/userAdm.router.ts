import { FastifyInstance} from "fastify";
import { UserAdmCreate, UserAdmLogin, UserAdmUpdate } from "../interfaces/userAdm.interface";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { UserAdmUseCase } from "../useCases/userAdm.usecase";

export async function UserAdmRouter(app: FastifyInstance) {

    const userAdmUseCase = new UserAdmUseCase()

    app.post<{ Body: UserAdmCreate }>('/userAdm/signup', async (req, reply) => {
        const { name, email, password} = req.body;
        try {
          const created = await userAdmUseCase.create({
            name,
            email,
            password,
          });
          return reply.send(created);
        } catch (error) {
          reply.send(error);
        }
      });

      app.post<{ Body: UserAdmLogin }>('/userAdm/signin', async (req, reply) => {
        const { email, password} = req.body;
        try {
          const token = await userAdmUseCase.login({email,password});
          return reply.send(token);
        } catch (error) {
          reply.send(error);
        }
      });
      app.put<{Params:{email:string} ,Body: UserAdmUpdate }>('/editProfile',{preHandler:isAuthenticated}, async (req, reply) => {

        const { name, password } = req.body;
        const { email }= req.params
        try {
          const data = await userAdmUseCase.update({
            name,
            email,
            password,
          });
          return reply.send(data);
        } catch (error) {
          reply.send(error);
        }
      });
      
      app.get<{Params:{email:string}}>('/userAdm',{preHandler:isAuthenticated}, async (req, reply) => {
        const {email} = req.params 
        try {
          if (email == undefined) throw Error("Usuario não autorisado ")
          const user = await userAdmUseCase.findByEmail(email);
          return reply.send(user);
        } catch (error) {
          reply.send(error);
        }
      });
}