import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";

const secret = 'jhow'
const expiresIn = {expiresIn:'1d'}



export async function isAuthenticated(req:FastifyRequest,reply:FastifyReply,done:HookHandlerDoneFunction) {
    const {authorization}  = req.headers 

    const token = authorization?.split(" ")[1]
    if (!token) {
        reply.code(401).send({ message: 'Token não informado' });
    }

    const auth = jwt.verify(token || "",secret)

    const {id} = req.params as { id: string }
    if (!id) {req.params = auth}
  
}
export  function signUser(email: string):string {
    const token = jwt.sign({ email, }, secret, expiresIn);
    if (!token) {throw Error("Usuario não autorisado ")}
   return token
}
export  function signChild(name: string):string {
    const token = jwt.sign({ name, }, secret, expiresIn);
    if (!token) {throw Error("Usuario não autorisado ")}
   return token
}