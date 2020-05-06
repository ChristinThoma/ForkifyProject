const axios = require("axios");

export class OneRecipe {
    constructor(query) {
        this.query = query
    }
    async getAPIrecipe(inputID) {

        try {
            this.query.params.r = inputID;
            const response = await axios(this.query);
            console.log(response);
            this.responseData = response.data[0];
            console.log(this.responseData);
        }
        catch (error) {
            alert(error)
        }

    }
}

