import { InvestmentAdmUpdateValueOfShares } from "../interfaces/investmentsAdm.interface";
import { InvestmentAdmRepositoryDB } from "../repositories/investmentsAdm.repository";

    async function updateValueOfShares(id: string): Promise < void >{
        const investmentAdmRepository = new InvestmentAdmRepositoryDB();

        const investment = await investmentAdmRepository.findById(id);
        if(!investment)throw new Error("Investment not found");

  
        const porcent = investment.sharesPurchased/1000         
        const value = investment.valueOfInitialShares
        const valueOfShares =  Math.round(porcent*value)

        const data: InvestmentAdmUpdateValueOfShares = {
            id: investment.id,
            valueOfShares,
        }

        const investmentUpdate = await investmentAdmRepository.updateValueOfShares(data);
        if(!investmentUpdate)throw new Error("Investment not updated");
    }


export{ updateValueOfShares }