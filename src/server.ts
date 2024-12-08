import { Adm } from "./dev/adm";

import 'dotenv/config'; 
import fastify from "fastify";
import { UserRouter } from "./routers/user.router";
import { UserAdmRouter } from "./routers/userAdm.router";
import { TaskRouter } from "./routers/task.router";
import { ChildRouter } from "./routers/child.router";
import { TaskAnalysisRouter } from './routers/taskAnalysis.router';
import { InvestmentRouter } from './routers/investments.router';

const app = fastify()

app.register(Adm)

app.register(UserRouter)
app.register(UserAdmRouter)
app.register(TaskRouter)
app.register(ChildRouter)
app.register(TaskAnalysisRouter)
app.register(InvestmentRouter)

app.listen({port:3333}).then( ()=>console.log({server:"UP"})) 