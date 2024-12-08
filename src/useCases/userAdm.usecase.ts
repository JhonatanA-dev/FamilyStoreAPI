

import bcrypt from "bcrypt";
import { UserAdm, UserAdmCreate, UserAdmLogin, UserAdmRepository, UserAdmUpdate } from "../interfaces/userAdm.interface";
import { signUser } from "../middlewares/isAuthenticated";
import { UserAdmRepositoryDb } from "../repositories/userAdm.repository";
import { validateEmail, validatePassword } from "../scripts/validateLogin";

class UserAdmUseCase {
    private userAdmRepository: UserAdmRepository;
    constructor() {
        this.userAdmRepository = new UserAdmRepositoryDb();
    }
    
    async findByEmail(email: string): Promise<UserAdm> {

        if (!email) throw new Error("Usuario não encontrado");
        
        // Verifica se o usuário existe
        const user = await this.userAdmRepository.findByEmail(email);
        if (!user) {
            throw new Error("Usuario não encontrado");
        }
        const data = {id: user.id,name: user.name,email: user.email}
        return data ;
    }

    async create(user: UserAdmCreate): Promise<{created:boolean}> {
        // Valida os dados
        if (!user.name || !user.email  || !user.password) throw new Error("Dados incompletos");
        
        if (!validateEmail(user.email)) throw new Error("Dados incorretos");
        if (!validatePassword(user.password)) throw new Error("Dados incorretos");

        // Verifica se o usuário já existe
        const userExists = await this.userAdmRepository.findByEmail(user.email);
        if (userExists) throw new Error("Usuário já existe");

        // Criptografar a senha
        const password = await bcrypt.hash(user.password, 10);
        user.password = password;
        
        // Cria o usuário
        const userCreated = await this.userAdmRepository.create(user);
        if (userCreated.email !== user.email) throw new Error("Usuário não criado");

        return {created:true};
    }
    async login(user: UserAdmLogin): Promise<{token:string}> {
        
        if (!user.email || !user.password) throw new Error("Dados incompletos")

        // Verifica se o usuário existe
        const userData = await this.userAdmRepository.findByEmail(user.email);
        if (!userData) throw new Error("Usuario não encontrado");

        // Verifica se a senha está correta
        const passwordMatch = await bcrypt.compare(user.password, userData.password);
        if (!passwordMatch) throw new Error("Dados incorretos");

        // Retorna o token
        const token = signUser(userData.email);
        return {token} ;
    }
    async update(user: UserAdmUpdate): Promise<{updated : boolean}> {

        // Valida os dados
        if (!user.email)  throw new Error("Dados incompletos");

        if (user.password) {
            if (!validatePassword(user.password)) throw new Error("Dados incorretos");
            user.password = await bcrypt.hash(user.password, 10);
        }
        // Verifica se o usuário existe
        const userExists = await this.userAdmRepository.findByEmail(user.email);
        if (!userExists) throw new Error("Usuário não encontrado");

        // Atualiza o usuário
        const userUpdated = await this.userAdmRepository.update(user);
        if (userUpdated.email !== user.email) throw new Error("Usuário não atualizado");
        

        return {updated:true};
        
    }


}
export{ UserAdmUseCase }