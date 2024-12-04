import fastify from "fastify";
import { UserRouter } from "./routers/user.router";
import { TaskRouter } from "./routers/task.router";
import { ChildRouter } from "./routers/child.router";
import { Adm } from "./routers/adm";

const app = fastify({
    logger:true
})
app.register(Adm)

app.register(UserRouter)
app.register(TaskRouter)
app.register(ChildRouter)

app.listen({port:3333}).then(()=>{
    console.log("Server ");
})