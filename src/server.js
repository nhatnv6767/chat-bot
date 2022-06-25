import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine"
import webRoutes from "./routes/web"

let app = express();

// config view Engine
viewEngine(app)

// config web routes

webRoutes(app)