require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const models = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const router = require("./routers/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000;
const app = express();

//app.use(cors());
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use("/api", router);
app.use(errorHandler);

app.get("/test", (req, res) => {
  res.send({ message: "work" });
});

const start = async () => {
  try {
    try {
      await sequelize.authenticate();
      console.log(`Установлено подключение к базе данных.`);
    } catch (error) {
      console.error(`Не удалось установить подключение к базе данных:`, error);
    } // Подключение к БД

    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Сервер запущен на http://localhost:${PORT}`),
    );
    console.log(`Проверь здесь http://localhost:${PORT}/test`);
  } catch (e) {
    console.log(e);
  }
};

start();
