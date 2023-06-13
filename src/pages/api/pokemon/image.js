const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const body = JSON.parse(req.body);
    const { description } = body || {};
    const response = await openai.createImage({
        prompt: `reate an image of a new pokemon with no background objects or text from this description: ${description}`,
        n: 2,
        size: "1024x1024", 
    });
    res.status(200).json({ image: response.data.data[0]})
};   