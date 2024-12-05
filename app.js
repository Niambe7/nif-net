// le bon


// const express = require("express");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const sequelize = require("./models/db");

// // Import des routes
// const utilisateurRoutes = require("./routes/utilisateurRoutes");
// const contenuRoutes = require("./routes/contenuRoutes");
// const mediaRoutes = require("./routes/mediaRoutes");
// const commentaireRoutes = require("./routes/commentaireRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");

// // Import du service de synchronisation
// const synchronizeDatabase = require("./services/databaseService");

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.use("/utilisateurs", utilisateurRoutes);
// app.use("/contenus", contenuRoutes);
// app.use("/medias", mediaRoutes);
// app.use("/commentaires", commentaireRoutes);
// app.use("/notifications", notificationRoutes);

// // Lancement du serveur avec synchronisation de la base de données
// (async () => {
//   try {
//     await synchronizeDatabase(); // Synchronisation des tables
//     app.listen(PORT, () => {
//       console.log(`Server running on https://nfi-mondial-net-guhdd8fhcxgxh7gz.northeurope-01.azurewebsites.net`);
//     });
//   } catch (error) {
//     console.error("Erreur au démarrage de l'application :", error);
//   }
// })();


// sequelize.authenticate()
//   .then(() => {
//     console.log("Connexion à la base de données Azure réussie !");
//   })
//   .catch((error) => {
//     console.error("Erreur de connexion à la base de données :", error);
//   });




// à tester 


// const express = require("express");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const sequelize = require("./models/db");
// const swaggerUi = require("swagger-ui-express");
// const fs = require("fs");
// const path = require("path");

// // Vérification si le fichier Swagger existe
// let swaggerDocument;
// try {
//   const swaggerFilePath = path.resolve(__dirname, "swagger.yaml");
//   if (fs.existsSync(swaggerFilePath)) {
//     swaggerDocument = require(swaggerFilePath);
//   } else {
//     console.warn("⚠️ Le fichier swagger.yaml est introuvable. La documentation Swagger ne sera pas disponible.");
//   }
// } catch (error) {
//   console.error("Erreur lors du chargement de swagger.yaml :", error.message);
// }

// // Import des routes
// const utilisateurRoutes = require("./routes/utilisateurRoutes");
// const contenuRoutes = require("./routes/contenuRoutes");
// const mediaRoutes = require("./routes/mediaRoutes");
// const commentaireRoutes = require("./routes/commentaireRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");

// // Import du service de synchronisation
// const synchronizeDatabase = require("./services/databaseService");

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware
// app.use(bodyParser.json());

// // Swagger documentation (seulement si le fichier existe)
// if (swaggerDocument) {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// } else {
//   console.log("Swagger non configuré, car le fichier swagger.yaml est introuvable.");
// }

// // Routes
// app.use("/utilisateurs", utilisateurRoutes);
// app.use("/contenus", contenuRoutes);
// app.use("/medias", mediaRoutes);
// app.use("/commentaires", commentaireRoutes);
// app.use("/notifications", notificationRoutes);

// // Lancement du serveur avec synchronisation de la base de données
// (async () => {
//   try {
//     await synchronizeDatabase(); // Synchronisation des tables
//     app.listen(PORT, () => {
//       console.log(`✅ Serveur en cours d'exécution sur https://nfi-mondial-net-guhdd8fhcxgxh7gz.northeurope-01.azurewebsites.net`);
//       if (swaggerDocument) {
//         console.log(`✅ Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
//       }
//     });
//   } catch (error) {
//     console.error("❌ Erreur au démarrage de l'application :", error);
//   }
// })();

// sequelize.authenticate()
//   .then(() => {
//     console.log("✅ Connexion à la base de données Azure réussie !");
//   })
//   .catch((error) => {
//     console.error("❌ Erreur de connexion à la base de données :", error);
//   });



  // dernier 


const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./models/db");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const cors = require("cors");

// Import des routes
const utilisateurRoutes = require("./routes/utilisateurRoutes");
const contenuRoutes = require("./routes/contenuRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const commentaireRoutes = require("./routes/commentaireRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Import du service de synchronisation
const synchronizeDatabase = require("./services/databaseService");

// Chargement de Swagger YAML
const swaggerDocument = yaml.load("./swagger.yaml");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Activer CORS

// Swagger Documentation
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/utilisateurs", utilisateurRoutes);
app.use("/contenus", contenuRoutes);
app.use("/medias", mediaRoutes);
app.use("/commentaires", commentaireRoutes);
app.use("/notifications", notificationRoutes);

// Lancement du serveur avec synchronisation de la base de données
(async () => {
  try {
    await synchronizeDatabase(); // Synchronisation des tables
    app.listen(PORT, () => {
      console.log(`Server running on https://nfi-mondial-net-guhdd8fhcxgxh7gz.northeurope-01.azurewebsites.net`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Erreur au démarrage de l'application :", error);
  }
})();

sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la base de données Azure réussie !");
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données :", error);
  });
