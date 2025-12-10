import { SnmpObjType } from "models";

export const getOidTypeColor = (type: SnmpObjType): any => {
    switch (type) {
		case SnmpObjType.Integer:
		case SnmpObjType.Counter:
		case SnmpObjType.Gauge:
		case SnmpObjType.Counter64:
		case SnmpObjType.TimeTicks:
			return "#1976d2";
		case SnmpObjType.OctetString:
		case SnmpObjType.BitString:
			return "#43aa43";
		case SnmpObjType.Boolean:
			return "#dde93b";
		case SnmpObjType.IpAddress:
			return "#ed6c02";
		case SnmpObjType.OID:
			return "#9c27b0";
		case SnmpObjType.NoSuchObject:
		case SnmpObjType.NoSuchInstance:
		case SnmpObjType.EndOfMibView:
		case SnmpObjType.Error:
			return "#d32f2f";
		default:
			return "#6c757d";
    }
};