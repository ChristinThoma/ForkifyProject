import { query } from "./views/base";


export default class recipes {
    constructor(query) {
        this.query = query
    }
    async getAPIrecipe(inputID) {

        try {
            this.params.r = inputID;
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

const searchedRec = new recipes(query); 