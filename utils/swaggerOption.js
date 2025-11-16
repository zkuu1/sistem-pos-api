const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest API System POS Don-Gym",
      version: "1.0.0",
      description: "Dokumentasi REST API System POS Don-Gym with Swagger UI || Dibuat Oleh Zkuu Raja Iblis" ,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./routes/**/*.js"], 
};

module.exports = swaggerOptions;   // <- WAJIB ADA
