const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function calculate(operation, a, b) {
    switch (operation) {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "multiply":
            return a * b;

        case "divide":
            if (b === 0) {
                throw new Error("Cannot divide by zero");
            }
            return a / b;

        default:
            throw new Error("Invalid operation");
    }
}

// Home page
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Richerd Daniel's Calculator</title>

            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }

                h1 {
                    font-size: 48px;
                    text-align: center;
                }
            </style>
        </head>

        <body>
            <h1>Richerd Daniel's Calculator</h1>
        </body>
        </html>
    `);
});

// Calculator API
app.get("/calculate/:operation/:a/:b", (req, res) => {

    const { operation, a, b } = req.params;

    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({
            error: "Both values must be numbers"
        });
    }

    try {
        const result = calculate(operation, numA, numB);

        res.json({
            operation: operation,
            a: numA,
            b: numB,
            result: result
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "UP"
    });
});

app.listen(PORT, () => {
    console.log(`Calculator app running on port ${PORT}`);
});


