import "./styles.css";
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

export default function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      console.log("response", result.data.choices[0].text);
      setAnswer(result.data.choices[0].text);
    } catch (e) {
      console.log(e);
      setAnswer("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };
  return (
    <>
      <div class="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            placeholder="Please ask questions..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button disabled={loading || prompt.length === 0} type="submit">
            {loading ? "Generating..." : "Submit"}
          </button>
        </form>
      </div>
      {answer && (
        <div
          class="ans"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p>
            <strong>Answer:</strong>
            {answer}
          </p>
        </div>
      )}
    </>
  );
}
