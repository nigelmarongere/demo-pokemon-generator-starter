const { Configuration, OpenAIApi } = require("openai");
const { POKEMON_ATTRIBUTES } = require("@/data/pokemon");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user", 
            content: `
                Create a new pokemon character with the following attributes:
                - Name
                - Short description less than 80 characters
                - The type of Pokemon
                - The category of Pokemon it is
                - Number of Hit Points or health
                - The Pokemon's lenght in inches
                - The Pokemon's weight in pounds
                - The Pokemon's power name and description
                - The Pokemon's attack name with description and Hit Points it would cause in damage
                - The type of Pokemon it is weak against
                - The type of Pokemon it is resistant against
                - The retreat cost of the Pokemon
                - The Pokemon's appearance in less than 600 characters
                - The Pokemon's backstory in less than 600 characters 
                Format the response in the following JSON object: ${JSON.stringify(POKEMON_ATTRIBUTES)}
            `
        }],
    });
    const attributes = JSON.parse(completion.data.choices[0].message.content);

    res.status(200).json({ attributes })
};  