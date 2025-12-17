import api from "./api.client";
import { Rule } from "../models";

export class RulesClient {
    public static async getAll(): Promise<Rule[]> {
        const { data } = await api.get("/rules/getAll");
        return data;
    }

    public static async add(rule: Rule): Promise<Rule> {
        const { data } = await api.post("/rules/add", rule);
        return data;
    }

    public static async update(rule: Rule): Promise<Rule> {
        const { data } = await api.post("/rules/update", rule);
        return data;
    }

    public static async remove(ruleId: number): Promise<void> {
        await api.delete("/rules/remove?id=" + ruleId);
    }
};