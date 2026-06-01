import express from "express";
import cors from "cors";
import generateContent from "./config/gemini.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: '10mb' }));

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { query, profileData, repoData } = req.body;

    const prompt = `
      Analyze this GitHub profile.

      Name: ${profileData.name}
      Username: ${profileData.login}
      Bio: ${profileData.bio}
      Followers: ${profileData.followers}
      Following: ${profileData.following}

      Repositories:
      ${repoData
        .map((repo) => `${repo.name}: ${repo.description || "No description"}`)
        .join("\n")}

      User Question:
      ${query}
    `;

    const result = await generateContent(prompt);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send(`${process.env.GEMINI_API_KEY}`);
});

app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
