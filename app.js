const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// مسیر دینامیک با route parameter
app.get("/greet/:name", (req, res) => {
  const userName = req.params.name;
  res.send(`Hello, ${userName}!`);
});

app.get("/calculate/:operation/:number1/:number2", (req, res) => {
  const { operation, number1, number2 } = req.params;
  // تبدیل به عدد
  const num1 = parseFloat(number1);
  const num2 = parseFloat(number2);
  // بررسی ورودی‌ها
  if (isNaN(num1) || isNaN(num2)) {
    return res.send("❌ Error: Both inputs must be valid numbers.");
  }

  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        return res.send("❌ Error: Division by zero is not allowed.");
      }
      result = num1 / num2;
      break;
    default:
      return res.send(
        "❌ Error: Invalid operation. Use add, subtract, multiply, or divide."
      );
  }

  // پاسخ نهایی
  res.send(`✅ Result: ${num1} ${operation} ${num2} = ${result}`);
});

app.get("/file/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "public", fileName);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.status(404).send("❌ Error: File not found.");
      } else {
        return res.status(500).send("❌ Error: Internal server error.");
      }
    }
    res.send(data);
  });
});

// اجرای سرور
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// A new line added for the test.
// A new line added for the test.
// A new line added for the test.
// A new line added for the test.