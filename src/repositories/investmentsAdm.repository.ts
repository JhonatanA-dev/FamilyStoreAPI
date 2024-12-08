
import { prisma } from "../dataBase/prisma.client";
import {InvestmentAdmCreatedDB, InvestmentAdm, InvestmentAdmUpdate, InvestmentAdmRepository, InvestmentAdmUpdateValueOfShares } from "../interfaces/investmentsAdm.interface";

export class InvestmentAdmRepositoryDB implements InvestmentAdmRepository {


    async create(investment: InvestmentAdmCreatedDB): Promise<InvestmentAdm> {
        const investmentCreated = await prisma.investmentsAdm.create({
            data: investment,
        });
        
        return investmentCreated;
    }
    async findById(id: string): Promise<InvestmentAdm | null> {
        const investmentFindById = await prisma.investmentsAdm.findUnique({
            where: {
                id,
            },
        });
    
        return investmentFindById || null;
    }
    async findByList(): Promise<InvestmentAdm[]> {
        const list = await prisma.investmentsAdm.findMany()
        return list;
    }

    async update(investment: InvestmentAdmUpdate): Promise<InvestmentAdm> {
        const investmentUpdated = await prisma.investmentsAdm.update({
            where: {
                id:investment.id,
            },
            data: investment,
        });
        return investmentUpdated;
    }
    async updateValueOfShares(investment:InvestmentAdmUpdateValueOfShares): Promise<InvestmentAdm> {
        const investmentUpdated = await prisma.investmentsAdm.update({
            where: {
                id:investment.id,
            },
            data: investment,
        });
        return investmentUpdated;
    }
    async delete(id: string): Promise<InvestmentAdm> {
        const investmentDelete = await prisma.investmentsAdm.delete({
            where: {
                id,
            },
        });
        return investmentDelete
        
    }
}