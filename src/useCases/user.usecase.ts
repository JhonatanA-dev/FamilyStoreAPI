


import { User, UserCreate, UserLogin, UserRepository, UserUpdate } from "../interfaces/user.interface";
import {  sign} from "../middlewares/isAuthenticated";
import { UserRepositoryDb } from "../repositories/user.repository";
import bcrypt from "bcrypt";

class UserUseCase {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepositoryDb();
    }
    async findByEmail(email: string): Promise<User> {
        if (!email) {
            throw new Error("User not found");
        }
        // Verifica se o usuário existe
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        // Retorna o usuário
        return user ;
    }

    async create(user: UserCreate): Promise<{created:boolean}> {
        // Verifica se o usuário já existe
        const userExists = await this.userRepository.findByEmail(user.email);
        if (userExists) {
            throw new Error("User already exists");
        }

        // Criptografa a senha
        const password = await bcrypt.hash(user.password, 10);
        user.password = password;
        
        // Cria o usuário
        const userCreated = await this.userRepository.create(user);
        
        if (userCreated.email === user.email){
            return {created:true};
            
        }
        return {created:false};
    }
    async login(user: UserLogin): Promise<{token:string}> {
        // Verifica se o usuário existe
        if (!user.email || !user.password) {
            throw new Error("Email or password incorrect");
        }
        const userData = await this.userRepository.findByEmail(user.email);
        if (!userData) {
            throw new Error("Email or password incorrect");
        }
        // Verifica se a senha está correta
        const passwordMatch = await bcrypt.compare(user.password, userData.password);
        if (!passwordMatch) {
            throw new Error("Email or password incorrect");
        }

        // token
        const token = sign(userData.email);
                
        // Retorna o usuário
        return {token,} ;
    }
    async update(user: UserUpdate): Promise<User> {
        // Verifica se o usuário existe
        const userExists = await this.userRepository.findByEmail(user.email);
        if (!userExists) {
            throw new Error("User not found");
        }
        // Atualiza o usuário
        const userUpdated = await this.userRepository.update(user);

        return userUpdated;
    }

}
export{ UserUseCase }