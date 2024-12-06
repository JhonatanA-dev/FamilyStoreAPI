import 'dotenv/config'; 
import fastify from "fastify";
import { UserRouter } from "./routers/user.router";
import { TaskRouter } from "./routers/task.router";
import { ChildRouter } from "./routers/child.router";
import { TaskAnalysisRouter } from './routers/taskAnalysis.router';


import { Adm } from "./routers/adm";

const app = fastify()
app.register(Adm)

app.register(UserRouter)
app.register(TaskRouter)
app.register(ChildRouter)
app.register(TaskAnalysisRouter)

app.listen({port:3333}).then( ()=>console.log({server:"UP"})) 