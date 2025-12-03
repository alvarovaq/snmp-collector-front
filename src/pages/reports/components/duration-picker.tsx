import React, { useState, useEffect } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export interface DurationPickerProps {
  value?: number;
  onChange?: (seconds: number) => void;
  disabled?: boolean;
  label?: string;
}

// Escala de pasos en segundos
const steps = [
  1, 10, 30, 60, 5 * 60, 15 * 60, 30 * 60,
  3600, 2 * 3600, 12 * 3600, 24 * 3600, 2 * 24 * 3600
];

// Parsear string humano a segundos
function parseDuration(input: string): number {
  if (!input) return 0;
  let total = 0;
  const regex = /(\d+)\s*(w|d|h|m|s)/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
      case "w": total += value * 7 * 24 * 3600; break;
      case "d": total += value * 24 * 3600; break;
      case "h": total += value * 3600; break;
      case "m": total += value * 60; break;
      case "s": total += value; break;
    }
  }
  return total;
}

// Formatear segundos a string humano
function formatDuration(seconds: number): string {
  const w = Math.floor(seconds / (7 * 24 * 3600));
  seconds %= 7 * 24 * 3600;
  const d = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const h = Math.floor(seconds / 3600);
  seconds %= 3600;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  let result = "";
  if (w) result += `${w}w `;
  if (d) result += `${d}d `;
  if (h) result += `${h}h `;
  if (m) result += `${m}m `;
  if (s || result === "") result += `${s}s`;

  return result.trim();
}

// Ajuste al step más cercano
function stepRight(seconds: number) {
  return steps.find(s => s > seconds) ?? steps[steps.length - 1];
}

function stepLeft(seconds: number) {
  return [...steps].reverse().find(s => s < seconds) ?? steps[0];
}

export const DurationPicker = (props: DurationPickerProps) => {
  const { value, onChange, disabled = false } = props;
  const [internalValue, setInternalValue] = useState<string>("");

  // Sincroniza valor externo (segundos) con string interno
  useEffect(() => {
    if (value == null) setInternalValue("");
    else setInternalValue(formatDuration(value));
  }, [value]);

  const seconds = parseDuration(internalValue);

  const handleStepRight = () => {
    const next = stepRight(seconds);
    const formatted = formatDuration(next);
    setInternalValue(formatted);
    onChange?.(next);
  };

  const handleStepLeft = () => {
    const next = stepLeft(seconds);
    const formatted = formatDuration(next);
    setInternalValue(formatted);
    onChange?.(next);
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    const secs = parseDuration(val);
    onChange?.(secs);
  };

  return (
    <TextField
      label={props.label}
      size="small"
      value={internalValue}
      onChange={handleManualChange}
      sx={{ minWidth: 180 }}
      disabled={disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={(e) => { e.stopPropagation(); handleStepLeft(); }}
              disabled={disabled}
              size="small"
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={(e) => { e.stopPropagation(); handleStepRight(); }}
              disabled={disabled}
              size="small"
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
