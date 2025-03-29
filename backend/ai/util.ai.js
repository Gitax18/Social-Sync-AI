const { Groq } = require("groq-sdk");
require("dotenv").config();
const systemPropmts = require("./prompts/systems.json");

const GROQ_API =
  process.env.GROQ_API ||
  "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";

const groq = new Groq({
  apiKey: GROQ_API,
});

async function generateChatCompetion(mediaType, userPrompt, inspiration = "") {
  const system = systemPropmts.find(
    (sysPm) => sysPm["mediaType"] === mediaType
  );
  // process.exit(0);
  const prompt =
    inspiration.length > 0
      ? userPrompt + ". Please use this inspiration:" + inspiration
      : userPrompt;
  const messages = [
    { role: "system", content: system.system },
    { role: "user", content: prompt },
  ];

  return groq.chat.completions.create({
    messages,
    model: "llama-3.3-70b-versatile",
    temperature: 1.1,
  });
}

module.exports = generateChatCompetion;
