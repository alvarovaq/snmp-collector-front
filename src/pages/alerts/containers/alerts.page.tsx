import { Rule } from "models";
import { useSelector } from "react-redux";
import { ReduxState } from "store";

const selectRules = (state: ReduxState): Rule[] => state.rules;

export const AlertsPage = () => {
    const rules = useSelector(selectRules);
    
    return (
        <div>
            <p>Página de alertas</p>
            <p>Reglas:</p>
            {rules.map(rule => (
                <p>{rule.name} {rule.severity} {rule.operator}</p>
            ))}
        </div>
    );
};