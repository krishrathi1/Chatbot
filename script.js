async function sendMessage() {
    const input = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    if (!input) {
        responseDiv.innerHTML = 'Please enter a message.';
        return;
    }

    responseDiv.innerHTML = '<div class="typing-animation"></div>';

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ', // Your API Key
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-r1:free',
                messages: [{ role: 'user', content: input }],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);  // Log to check the structure of the response

        const markdownText = data.choices?.[0]?.message?.content || 'No valid response received.';
        responseDiv.innerHTML = marked.parse(markdownText);
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = `Error: ${error.message}`;
    }
}
