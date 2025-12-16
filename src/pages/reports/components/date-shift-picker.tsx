import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export interface DateShiftPickerProps {
	value: Date | null;
	onChange: (value: Date | null) => void;
	step?: number;
	disabled?: boolean;
	label?: string;
}

export const DateShiftPicker = (props: DateShiftPickerProps) => {
	const { value, onChange, step = 60 * 60 * 1000, disabled = false } = props;

	const [open, setOpen] = useState(false);

	const shift = (dir: 1 | -1) => {
		const baseDate = value ?? new Date();
		const next = new Date(baseDate.getTime() + dir * step);
		onChange(next);
	};

	const clear = () => onChange(null);

	return (
		<DateTimePicker
			label={props.label}
			open={open}
			value={value}
			onChange={(newValue) => onChange(newValue as Date | null)}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			ampm={false}
			views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
			slotProps={{
				textField: {
					size: "small",
					onClick: () => setOpen(true),
					inputProps: { readOnly: true },
					sx: { minWidth: 220 },
					InputProps: {
						startAdornment: (
							<InputAdornment position="start">
								<IconButton onClick={(e) => { e.stopPropagation(); shift(-1); }} disabled={disabled} size="small">
									<ArrowBackIosNewIcon fontSize="small" />
								</IconButton>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={(e) => { e.stopPropagation(); shift(1); }} disabled={disabled} size="small">
									<ArrowForwardIosIcon fontSize="small" />
								</IconButton>
								{value && (
									<IconButton size="small" onClick={clear}>
										<ClearIcon fontSize="small" />
									</IconButton>
								)}
							</InputAdornment>
						),
					},
				},
			}}
		/>
	);
};
