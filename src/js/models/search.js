

const axios = require("axios");

export default class AllRecipes {
    constructor(query) {
        this.query = query
    }
    async getAPIrecipe() {

        try {
            const response = await axios(this.query);
            console.log(response);
            this.responseData = response.data.hits;
            console.log(this.responseData);
        }
        catch (error) {
            alert(error)
        }

    }
}