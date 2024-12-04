import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/user.interface";
import { UserRepositoryDb } from "../repositories/user.repository";

class UserUseCase {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepositoryDb();
    }

    async create(user: UserCreate): Promise<User> {
        // Verifica se o usuário já existe
        const userExists = await this.userRepository.findByEmail(user.email);
        if (userExists) {
            throw new Error("User already exists");
        }
        // Cria o usuário
        const userCreated = await this.userRepository.create(user);
      
        return userCreated;
    }

    async findById(id: string): Promise<User> {
        // Verifica se o usuário existe
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        // Retorna o usuário
        return user ;
    }

    async update(user: UserUpdate): Promise<User> {
        // Verifica se o usuário existe
        const userExists = await this.userRepository.findById(user.id);
        if (!userExists) {
            throw new Error("User not found");
        }
        // Atualiza o usuário
        const userUpdated = await this.userRepository.update(user);

        return userUpdated;
    }

}
export{ UserUseCase }