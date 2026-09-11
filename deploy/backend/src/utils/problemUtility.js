const axios = require('axios');

const getLanguageById = (lang) => {
    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63
    };

    const langId = language[lang.toLowerCase()];
    
    // Fix: Throw an error if an unsupported language is requested
    if (!langId) {
        throw new Error(`Unsupported language: ${lang}`);
    }
    
    return langId;
}

const submitBatch = async (submissions) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Judge0 Batch Submit Error:", error?.response?.data || error.message);
        throw new Error("Failed to submit code to Judge0");
    }
}

// Fix: Wrap setTimeout in a Promise so 'await' actually pauses execution
const waiting = (timer) => new Promise((resolve) => setTimeout(resolve, timer));

const submitToken = async (resultToken) => {
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultToken.join(","),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    let attempts = 0;
    const maxAttempts = 15; // Max 15 seconds of polling

    // Fix: Replaced while(true) with a capped loop
    while (attempts < maxAttempts) {
        try {
            const response = await axios.request(options);
            const result = response.data;

            const IsResultObtained = result.submissions.every((r) => r.status_id > 2);

            if (IsResultObtained) {
                return result.submissions;
            }

            attempts++;
            await waiting(1000); // Safely pauses for 1 second now

        } catch (error) {
            console.error("Judge0 Fetch Error:", error?.response?.data || error.message);
            throw new Error("Error fetching results from Judge0");
        }
    }

    // If it breaks out of the loop, Judge0 timed out
    throw new Error("Judge0 execution timed out after 15 seconds");
}

module.exports = { getLanguageById, submitBatch, submitToken };