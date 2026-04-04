import { prisma } from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { RecordType } from "../generated/prisma/enums";

export const createRecord = async (data: any, userId: string) => {
    return prisma.record.create({
        data: {
            ...data,
            date: new Date(data.date),
            createdById: userId,
        },
    });
};

export const getRecords = async () => {
    return prisma.record.findMany({
        orderBy: { date: "desc" },
    });
};

export const getRecordById = async (id: string) => {
    const record = await prisma.record.findUnique({
        where: { id },
    });

    if (!record) {
        throw new ApiError(404, "Record not found");
    }

    return record;
};

export const updateRecord = async (id: string, data: any) => {
    return prisma.record.update({
        where: { id },
        data: {
            ...data,
            date: data.date ? new Date(data.date) : undefined,
        },
    });
};

export const deleteRecord = async (id: string) => {
    return prisma.record.delete({
        where: { id },
    });
};

export const getSummary = async () => {
    const income = await prisma.record.aggregate({
        where: { type: "INCOME" },
        _sum: { amount: true },
    });

    const expense = await prisma.record.aggregate({
        where: { type: "EXPENSE" },
        _sum: { amount: true },
    });

    return {
        totalIncome: income._sum.amount || 0,
        totalExpense: expense._sum.amount || 0,
        netBalance: (income._sum.amount || 0) - (expense._sum.amount || 0),
    };
};

export const getCategorySummary = async () => {
    return prisma.record.groupBy({
        by: ["category", "type"],
        _sum: { amount: true },
    });
};

export const getRecentRecords = async () => {
    return prisma.record.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
    });
};


export const getFilteredRecords = async (type: string, category: string) => {
    type = type.toUpperCase();
    return prisma.record.findMany({
        where: { type: type as RecordType, category },
    });
};
