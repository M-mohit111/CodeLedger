const axios = require("axios");

const submitCode = async (req, res) => {
console.log("SUBMIT CODE FUNCTION CALLED");
    const { code, language, input } = req.body;

    // console.log(code);
    // console.log(language);
    // console.log(input);

    // const response = await axios.post(
    //     "https://api.jdoodle.com/v1/execute",
    //     {
    //         clientId: process.env.JDOODLE_CLIENT_ID,
    //         clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    //         script: code,
    //         stdin: input,
    //         language: language,
    //         versionIndex: "0"
    //     }
    // );
    // console.log(response.data);

};

module.exports = { submitCode };