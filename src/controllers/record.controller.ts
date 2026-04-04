import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import * as recordService from "../services/record.service";

export const createRecord = asyncHandler(async (req: Request, res: Response) => {
    const record = await recordService.createRecord(
        req.body,
        req.user!.userId
    );

    res.status(201).json(new ApiResponse(record, "Record created"));
});

export const getRecords = asyncHandler(async (req: Request, res: Response) => {
    const records = await recordService.getRecords();

    res.json(new ApiResponse(records, "Records fetched successfully"));
});

export const getRecord = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const record = await recordService.getRecordById(id);

    res.json(new ApiResponse(record, "Record fetched successfully"));
});

export const updateRecord = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const record = await recordService.updateRecord(id, req.body);

    res.json(new ApiResponse(record, "Record updated"));
});

export const deleteRecord = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await recordService.deleteRecord(id);

    res.json(new ApiResponse(null, "Record deleted"));
});

export const getSummary = asyncHandler(async (req: Request, res: Response) => {
    const summary = await recordService.getSummary();

    res.json(new ApiResponse(summary));
});

export const getCategorySummary = asyncHandler(
    async (req: Request, res: Response) => {
        const summary = await recordService.getCategorySummary();

        res.json(new ApiResponse(summary));
    }
);

export const getRecentRecords = asyncHandler(async (req: Request, res: Response) => {
    const recentRecords = await recordService.getRecentRecords();

    res.json(new ApiResponse(recentRecords, "Recent records fetched successfully"));
});

export const getFilteredRecords = asyncHandler(async (req: Request, res: Response) => {
    const { type, category } = req.query;
    const filteredRecords = await recordService.getFilteredRecords(type as string, category as string);

    res.json(new ApiResponse(filteredRecords, "Filtered records fetched successfully"));
});
