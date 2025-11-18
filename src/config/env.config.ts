const env = {
    apiUrl: process.env.REACT_APP_API_URL || "",
    wsUrl: process.env.REACT_APP_WS_URL || "",
    auth: {
        renewTime: Number(process.env.REACT_APP_AUTH_RENEW_TIME) || 600,
    }
};

export default env;