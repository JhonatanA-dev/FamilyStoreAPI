

import bcrypt from "bcrypt";
import { User, UserCreate, UserLogin, UserRepository, UserUpdate } from "../interfaces/user.interface";
import { signUser } from "../middlewares/isAuthenticated";
import { UserRepositoryDb } from "../repositories/user.repository";
import { validateEmail, validatePassword } from "../scripts/validateLogin";

class UserUseCase {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepositoryDb();
    }
    
    async findByEmail(email: string): Promise<User> {

        if (!email) throw new Error("Usuario não encontrado");
        
        // Verifica se o usuário existe
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Usuario não encontrado");
        }
        const data = {id: user.id,name: user.name,email: user.email}
        return data ;
    }

    async create(user: UserCreate): Promise<{created:boolean}> {
        // Valida os dados
        if (!user.name || !user.email  || !user.password) throw new Error("Dados incompletos");
        
        if (!validateEmail(user.email)) throw new Error("Dados incorretos");
        if (!validatePassword(user.password)) throw new Error("Dados incorretos");

        // Verifica se o usuário já existe
        const userExists = await this.userRepository.findByEmail(user.email);
        if (userExists) throw new Error("Usuário já existe");

        // Criptografar a senha
        const password = await bcrypt.hash(user.password, 10);
        user.password = password;
        
        // Cria o usuário
        const userCreated = await this.userRepository.create(user);
        if (userCreated.email !== user.email) throw new Error("Usuário não criado");

        return {created:true};
    }
    async login(user: UserLogin): Promise<{token:string}> {
        
        if (!user.email || !user.password) throw new Error("Dados incompletos")

        // Verifica se o usuário existe
        const userData = await this.userRepository.findByEmail(user.email);
        if (!userData) throw new Error("Usuario não encontrado");

        // Verifica se a senha está correta
        const passwordMatch = await bcrypt.compare(user.password, userData.password);
        if (!passwordMatch) throw new Error("Dados incorretos");

        // Retorna o token
        const token = signUser(userData.email);
        return {token,} ;
    }
    async update(user: UserUpdate): Promise<{updated : boolean}> {

        // Valida os dados
        if (!user.email)  throw new Error("Dados incompletos");

        if (user.password) {
            if (!validatePassword(user.password)) throw new Error("Dados incorretos");
            user.password = await bcrypt.hash(user.password, 10);
        }
        // Verifica se o usuário existe
        const userExists = await this.userRepository.findByEmail(user.email);
        if (!userExists) throw new Error("Usuário não encontrado");

        // Atualiza o usuário
        const userUpdated = await this.userRepository.update(user);
        if (userUpdated.email !== user.email) throw new Error("Usuário não atualizado");
        

        return {updated:true};
        
    }


}
export{ UserUseCase }