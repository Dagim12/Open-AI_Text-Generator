import { Configuration, OpenAIApi } from "openai";

// api key on .env
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  // error handling for the user response needs to improve
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "Please try again latter",
      },
    });
    console.log(
      "Error: OpenAI API key not configured, please follow instructions in README.md"
    );
    return;
  }
  debugger;
  // read request text
  const text = req.body.text || "";
  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a text",
      },
    });
    return;
  }
  debugger;
  //create the open AI request
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text),
      temperature: 0.9,
      top_p: 0.8,
      max_tokens: 150,
    });
    console.log("Result is: " + completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // new exception handling to be done
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(input) {
  const prompt = `Chat with person. Suggest topics about stories, poetry, technical articles, dialogues of fictional characters, etc. ${
    "\n" + input
  }`;
  return prompt;
}
