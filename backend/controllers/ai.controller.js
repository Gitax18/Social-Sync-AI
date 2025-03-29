const generateChatCompetion = require("../ai/util.ai");

exports.postGenerate = async (req, res, next) => {
  const mediaType = req.params["mediaType"];
  console.log(mediaType);
  const { inspiration, description } = req.body;
  console.log(description);
  try {
    const response = await generateChatCompetion(
      mediaType,
      description,
      inspiration
    );
    res.json(response.choices[0].message.content);
  } catch (e) {
    res.json({
      error: "Error occured while processing your request: " + e.message,
    });
  }
};
