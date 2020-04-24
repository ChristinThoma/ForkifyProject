

const axios = require("axios");

export default class recipes {
    constructor(query) {
        this.query = query
    }
    async getAPIrecipe() {

        try {
            const response = await axios(this.query);
            this.responseData = response.data.feed;
            console.log(this.responseData);
        }
        catch (error) {
            alert(error)
        }

    }
}