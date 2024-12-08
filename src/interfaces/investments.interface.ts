
export interface InvestmentCreated {
    idInvestment: string;
    name: string;
    numberOfShares: number;
    amountPaid:number;
    userId:string
}
export interface Investment{
    id: string;
    idInvestment: string;
    name: string;
    numberOfShares: number;
    amountPaid:number;
    userId:string
}
export interface InvestmentRes{
    id: string;
    name: string;
    valueOfShares: number;
    valueOfInitialShares:number;
    totalinvested:number
}
export interface InvestmentUpdate {
    id: string;
    numberOfShares: number;
    amountPaid:number;
}



 export interface InvestmentRepository {
    create(investment: InvestmentCreated): Promise<Investment>;
    findById(id: string): Promise<Investment | null>;
    findByUserId(userId: string): Promise<Investment[]>;
    findByList(): Promise<Investment[] | null>;
    update(investment: InvestmentUpdate): Promise<Investment>;
    delete(id: string): Promise<Investment>;
 }