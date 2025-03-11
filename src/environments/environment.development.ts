export const environment = {
    gptUrl: process.env['OPENAI_API_URL'] || "https://api.openai.com/v1/chat/completions",
    apiKey: process.env['OPENAI_API_KEY']
};
