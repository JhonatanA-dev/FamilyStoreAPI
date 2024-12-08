
import { InvestmentAdmCreated, InvestmentAdm, InvestmentAdmUpdate, InvestmentAdmRepository, InvestmentAdmUpdateValueOfShares } from "../interfaces/investmentsAdm.interface";
import { UserAdmRepository } from "../interfaces/userAdm.interface";
import { InvestmentAdmRepositoryDB } from "../repositories/investmentsAdm.repository";
import { UserAdmRepositoryDb } from "../repositories/userAdm.repository";

class InvestmentAdmUseCase {
    private investmentAdmRepository: InvestmentAdmRepository;
    private userAdmRepository: UserAdmRepository;
    constructor() {
        this.investmentAdmRepository = new InvestmentAdmRepositoryDB();
        this.userAdmRepository = new UserAdmRepositoryDb();
    }
    async create(email:string,data: InvestmentAdmCreated): Promise<InvestmentAdm> {
        // Valida os dados
        if (!data.name || !data.percentage || !data.valueOfInitialShares ) {
            throw new Error("Dados incompletos");}

        // Verifica se o usuário existe
        const user = await this.userAdmRepository.findByEmail(email);
        if (!user) throw new Error("Usuario não encontrado");

        const dataCreated = {
            name: data.name,
            percentage: data.percentage,
            sharesLimit: data.percentage*1000,
            sharesPurchased: 1000,
            valueOfShares: data.valueOfInitialShares,
            valueOfInitialShares: data.valueOfInitialShares,
            totalinvested: 0,
            userId: user.id
        }
        
        const investmentCreated = await this.investmentAdmRepository.create(dataCreated);
        return investmentCreated;
    }
    async findById( id : string): Promise < InvestmentAdm | null >{
        const investment = await this.investmentAdmRepository.findById(id);
        if(!investment)throw new Error("Investment not found");

        return investment;
    }
    async findByList(): Promise < InvestmentAdm[] >{
        const investmentList = await this.investmentAdmRepository.findByList();
        if(!investmentList)throw new Error("Investment list not found");

        return investmentList;
    }
    async delete(id: string): Promise < boolean >{
        const investmentDelete = await this.investmentAdmRepository.delete(id);
        if(!investmentDelete)throw new Error("Investment not deleted");
        return true;
    }

    

}
export{ InvestmentAdmUseCase }