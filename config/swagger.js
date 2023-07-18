const swaggerConfig = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Backend for LA Academy",
            version: "1.0.0",
            description: "This is the backend for LA Academy made by Mugisha Yves and Ineza Gloria"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server"
            },
            {
                url: "http://la-academy:5000",
                description: "Production Server"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

export default swaggerConfig;

  

  
