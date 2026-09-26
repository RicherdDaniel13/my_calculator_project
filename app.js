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
        <h1>Node.js Calculator</h1>
        <p>Use the API to perform calculations.</p>

        <h3>Example:</h3>
        <p>/calculate/add/10/5</p>
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
