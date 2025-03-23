// app.js file:

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const adminRouter = require("./routes/adminRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const globalErrorHandler = require("./controllers/errorController");
/* const { validateImages } = require("./utils/validateImages");*/
const { getError } = require("./controllers/viewsController");
// Rate limiter för att förhindra missbruk från en enda IP-adress
const limiter = rateLimit({
	max: 400,
	window: 60 * 60 * 1000,
	message: "För många förfrågningar från denna IP, försök igen om en timme.",
	skip: (req) => req.headers["x-forwarded-for"] === undefined,
});

//validateImages(); //Tar bort alla bilder som inte används till produkterna, och laddar ned alla bilder

//app.enable("trust proxy");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cors({ origin: "*" }));

app.options("*", cors());

// Servera statiska filer från den offentliga katalogen
app.use(express.static(path.join(__dirname, "public")));
// Använd Helmet middleware för att ställa in grundläggande säkerhetsrubriker

app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", `${process.env.URL}`, "https://cdnjs.cloudflare.com"],
		},
	})
);
// Använd Morgan middleware för loggning i utvecklingsläge
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Middleware-stack
app.use("/api", limiter); // Tillämpa rate limiting på API-rutter
app.use(express.json({ limit: "10kb" })); // Analysera JSON-förfrågningar med storleksbegränsning
app.use(cookieParser()); //
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize()); // Sanera data för att förhindra NoSQL-injektion
app.use(xss()); // Sanera data för att förhindra XSS-attacker
app.use(hpp()); // Förhindra HTTP Parameter Pollution

// Anpassad middleware för att lägga till en tidsstämpel för varje förfrågan
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

/* app.use((req, res, next) => {
	next();
}); */

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/", viewRouter);
app.use("/admin", adminRouter);

// Hantera odefinierade rutter med en enkel 404-felhanterare
app.all("*", (req, res, next) => {
	if (req.originalUrl.startsWith("/api")) {
		next(new AppError("Sidan kunde inte hittas!", 404));
	} else {
		const statusCode = 404;

		const message = "Sidan kunde inte hittas!";

		getError(req, res, message, statusCode);
	}
});

// Global felhanterare för att hantera alla fel i applikationen
app.use(globalErrorHandler);

module.exports = app;
