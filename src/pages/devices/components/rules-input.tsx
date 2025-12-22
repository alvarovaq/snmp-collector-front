import * as React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { Rule } from "models";
import { GetSeverityColor } from "utils/rules";

interface RulesInputProps {
    rules: Rule[];
    values: number[];
    onChange: (values: number[]) => void;
}

export const RulesInput = (props: RulesInputProps) => {
    const selectedOptions = React.useMemo(() => {
        return props.rules.filter(rule => props.values.includes(rule.id));
    }, [props.rules, props.values]);
  
    return (
        <Autocomplete
            multiple
            options={props.rules}
            value={selectedOptions}
            getOptionLabel={(rule) => rule.name}
            isOptionEqualToValue={(rule, value) => rule.id === value.id }
            onChange={(_, newValues) => props.onChange(newValues.map(v => v.id))}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((rule, index) => (
                    <Chip
                        label={rule.name}
                        {...getTagProps({ index })}
                        key={rule.id}
                        sx={{
                            backgroundColor: GetSeverityColor(rule.severity)
                        }}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Reglas"
                    placeholder="Escribe para buscar…"
                />
            )}
        />
    );
};
