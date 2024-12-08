
export interface InvestmentAdmCreatedDB {
    name: string;
    percentage: number;
    sharesLimit: number;
    sharesPurchased: number;
    valueOfShares: number;
    valueOfInitialShares: number;
    totalinvested: number;
    userId:string
}
export interface InvestmentAdmCreated {
    name: string;
    percentage: number;
    valueOfInitialShares: number;
}
export interface InvestmentAdm{
    id: string;
    name: string;
    percentage: number;
    sharesLimit: number;
    sharesPurchased: number;
    valueOfShares: number;
    valueOfInitialShares: number;
    totalinvested: number;
}
export interface InvestmentAdmUpdate {
    id: string;
    sharesPurchased?: number;
    totalinvested?: number;
}
export interface InvestmentAdmUpdateValueOfShares{
    id: string;
    valueOfShares?: number;
}


 export interface InvestmentAdmRepository {
    create(investment: InvestmentAdmCreatedDB): Promise<InvestmentAdm>;
    findById(id: string): Promise<InvestmentAdm | null>;
    findByList(): Promise<InvestmentAdm[]>;
    update(investment: InvestmentAdmUpdate): Promise<InvestmentAdm>;
    updateValueOfShares(investment:InvestmentAdmUpdateValueOfShares): Promise<InvestmentAdm>
    delete(id: string): Promise<InvestmentAdm>;
 }