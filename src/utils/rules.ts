import { Operator, Severity } from "models";

export const GetSeverityColor = (severity: Severity) => {
    switch (severity) {
        case Severity.INFO:
            return "#3498db";
        case Severity.WARNING:
            return "#f1c40f";
        case Severity.MINOR:
            return "#2ecc71";
        case Severity.MAJOR:
            return "#e67e22";
        case Severity.CRITICAL:
            return "#e74c3c";
        default:
            return "#7f8c8d";
    }
};

export const GetSeverityText = (severity: Severity) => {
    switch (severity) {
        case Severity.INFO:
            return "Información";
        case Severity.WARNING:
            return "Advertencia";
        case Severity.MINOR:
            return "Menor";
        case Severity.MAJOR:
            return "Mayor";
        case Severity.CRITICAL:
            return "Crítico";
        default:
            return "Desconocido";
    }
};

export const GetOperatorText = (operator: Operator) => {
    switch (operator)
    {
        case Operator.GREATER_THAN:
            return "Mayor que";
        case Operator.GREATER_OR_EQUAL:
            return "Mayor o igual que";
        case Operator.LESS_THAN:
            return "Menor que";
        case Operator.LESS_OR_EQUAL:
            return "Menor o igual que";
        case Operator.EQUAL:
            return "Igual que";
        case Operator.NOT_EQUAL:
            return "Distinto que";
        default:
            return "Desconocido";
    }
};

export const OperatorRequiresNumber = (operator: Operator) => {
    const numericOperators: Operator[] = [
        Operator.GREATER_THAN,
        Operator.GREATER_OR_EQUAL,
        Operator.LESS_THAN,
        Operator.LESS_OR_EQUAL,
    ];

    return numericOperators.includes(operator);
};