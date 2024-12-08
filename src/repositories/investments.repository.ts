
import { prisma } from "../dataBase/prisma.client";
import {InvestmentCreated, Investment, InvestmentUpdate, InvestmentRepository } from "../interfaces/investments.interface";

export class InvestmentRepositoryDB implements InvestmentRepository {


    async create(investment: InvestmentCreated): Promise<Investment> {
        const investmentCreated = await prisma.investments.create({
            data: investment,
        });
        
        return investmentCreated;
    }
    async findById(id: string): Promise<Investment | null> {
        const investmentFindById = await prisma.investments.findUnique({
            where: {
                id,
            },
        });
    
        return investmentFindById || null;
    }
    async findByUserId(userId: string): Promise<Investment[]> {
        const investmentFindById = await prisma.investments.findMany({
            where: {
                userId,
            },
        });
    
        return investmentFindById || null;
    }
    async findByList(): Promise<Investment[]> {
        const list = await prisma.investments.findMany()
        return list;
    }

    async update(investment: InvestmentUpdate): Promise<Investment> {
        const investmentUpdated = await prisma.investments.update({
            where: {
                id:investment.id,
            },
            data: investment,
        });
        return investmentUpdated;
    }

    async delete(id: string): Promise<Investment> {
        const investmentDelete = await prisma.investments.delete({
            where: {
                id,
            },
        });
        return investmentDelete
        
    }
}