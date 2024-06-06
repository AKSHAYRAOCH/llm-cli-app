import Groq from "groq-sdk";
import PromptSync from "prompt-sync";
const prompt = PromptSync();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const messagelist = [];

export async function main() {
	let input = prompt();
	messagelist.push({ role: "user", content: input });
	while (input) {
		const chatCompletion = await getGroqChatCompletion();
		// Print the completion returned by the LLM.
		console.log(chatCompletion.choices[0]?.message?.content || "");
		messagelist.push({
			role: "assistant",
			content: chatCompletion.choices[0]?.message?.content,
		});

		input = prompt();
		if (input) {
			messagelist.push({ role: "user", content: input });
		}
	}
}

export async function getGroqChatCompletion() {
	return groq.chat.completions.create({
		messages: messagelist,
		model: "llama3-8b-8192",
	});
}

main();
