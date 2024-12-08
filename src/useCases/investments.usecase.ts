import { ChildRepository } from "../interfaces/child.interface";
import { InvestmentCreated, Investment, InvestmentUpdate, InvestmentRepository, InvestmentRes} from "../interfaces/investments.interface";
import { InvestmentAdmRepository } from "../interfaces/investmentsAdm.interface";
import { ChildRepositoryDb } from "../repositories/child.repository";
import { InvestmentRepositoryDB } from "../repositories/investments.repository";
import { InvestmentAdmRepositoryDB } from "../repositories/investmentsAdm.repository";
import { updateValueOfShares } from "../scripts/updateValueOfShares";




class InvestmentUseCase {
    private investmentRepository: InvestmentRepository;
    private investmentAdmRepository: InvestmentAdmRepository;
    private childRepository: ChildRepository;
    constructor() {
        this.investmentRepository = new InvestmentRepositoryDB();
        this.investmentAdmRepository = new InvestmentAdmRepositoryDB();
        this.childRepository = new ChildRepositoryDb();
    }
    async findById( idInvestment : string): Promise < InvestmentRes | null >{
        const investment = await this.investmentAdmRepository.findById(idInvestment);
        if(!investment)throw new Error("Investment not found");

        const { id, name, valueOfShares, valueOfInitialShares, totalinvested} = investment;
        const data ={id,name,valueOfShares,valueOfInitialShares,totalinvested}
        return data;
    }
    async findByList(): Promise < InvestmentRes[] >{
        const investmentList = await this.investmentAdmRepository.findByList();
        if(!investmentList)throw new Error("Investment list not found");

        const data = investmentList.map(({ id, name, valueOfShares, valueOfInitialShares, totalinvested}) => (
            {id,name,valueOfShares,valueOfInitialShares,totalinvested})
        )
        return data;
    }
    async buyShares(name:string,data: InvestmentCreated): Promise<{buyShares:boolean}> {
        // Valida os dados
        if (!data.idInvestment || !data.numberOfShares ) {
            throw new Error("Dados incompletos");}

        // Verifica se o filho existe
        const child = await this.childRepository.findByName(name);
        if (!child) throw new Error("Filho não encontrado");

        // Verifica se o investimento existe
        const investment = await this.investmentAdmRepository.findById(data.idInvestment);
        if(!investment)throw new Error("Investment not found");

        // Registrando o investimento do filho
        const investmentSearch = await this.investmentRepository.findByUserId(child.id);
        const amountPaid = data.numberOfShares * investment.valueOfShares

        const  investmentUser  =  investmentSearch.find(iten=> iten.idInvestment === data.idInvestment)
  
        if(investmentUser){
            const res = await this.investmentRepository.update({
                id: investmentUser.id,
                numberOfShares: investmentUser.numberOfShares + data.numberOfShares,
                amountPaid: investmentUser.amountPaid + amountPaid
            });
            if(!res)throw new Error("Error updating investment");
        }
        if(!investmentUser){
            const res = await this.investmentRepository.create({
                idInvestment: investment.id,
                name: investment.name,
                numberOfShares: data.numberOfShares,
                amountPaid,
                userId: child.id
            });
            if(!res)throw new Error("Error creating investment");
        }

        const totalinvested = investment.valueOfShares * data.numberOfShares;
        // Atualiza o saldo do filho
        const coins = child.coins - totalinvested;
        if(coins <= 0)throw new Error("Saldo insuficiente");
        await this.childRepository.update({id: child.id, coins});

        // Atualiza o investimento
        await this.investmentAdmRepository.update({
            id: investment.id,
            sharesPurchased: investment.sharesPurchased + data.numberOfShares,
            totalinvested:investment.totalinvested + totalinvested 
        });
        await updateValueOfShares(investment.id)
        return {buyShares:true};
    }     

    async sellShares(name:string,idInvestment: string): Promise<{coins: number}> {
        // Valida os dados
        if (!idInvestment) {throw new Error("Dados incompletos");}

        // Verifica se o filho existe
        const child = await this.childRepository.findByName(name);
        if (!child) throw new Error("Filho não encontrado");

        // Verifica se o investimento existe
        const investments = await this.investmentAdmRepository.findById(idInvestment);
        if(!investments)throw new Error("Investment not found")
        

        // Busca o investimento na carteira do filho
        const investmentList = await this.investmentRepository.findByUserId(child.id);
        const investmentSearch = investmentList.find(iten=> iten.idInvestment === idInvestment)
        if(!investmentSearch)throw new Error("Investment not found");

        // Atualiza o investimento 
        const investmentAdmUpdate = await this.investmentAdmRepository.update({
            id: investments.id,
            sharesPurchased: investments.sharesPurchased - investmentSearch.numberOfShares,
            totalinvested:investments.totalinvested - investmentSearch.amountPaid 
        });
        if(!investmentAdmUpdate)throw new Error("Investment not found");

        // Atualiza o saldo do filho
        const coins = investmentSearch.numberOfShares*investments.valueOfShares;
        const childUpdate = await this.childRepository.update({id: child.id, coins: child.coins + coins});
        if(!childUpdate)throw new Error("Investment not found");

        //delete o investimento da carteira do filho
        const investmentDelete= await this.investmentRepository.delete(investmentSearch.id);

        await updateValueOfShares(investments.id)
        return {coins};
    } 
}
export{ InvestmentUseCase }