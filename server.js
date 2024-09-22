const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const user_id = "chinni_vamshi_padma_naga_sai_21082003";
const email = "cc6283@srmist.edu.in";
const roll_number = "RA2111028020022";

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    // Input validation: Ensure 'data' is provided and is an array
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. 'data' should be an array.",
      });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (
        typeof item === "string" &&
        item.length === 1 &&
        /[a-zA-Z]/.test(item)
      ) {
        alphabets.push(item);
        if (/[a-z]/.test(item)) {
          if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
            highestLowercaseAlphabet = item;
          }
        }
      }
    });

    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
        ? [highestLowercaseAlphabet]
        : [],
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});