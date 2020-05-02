
export const rotatingIcon = `
<div class="loader">
<svg >
<use href="img/icons.svg#icon-cw"></use>
</svg>
</div>`



export let query = {
    "method": "GET",
    "url": "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search",
    "headers": {
        'Access-Control-Allow-Origin': '*',
    },
    "params": //this is what you can change as user

    {
        // "FAT_KCALMax": "1000",
        // "maxTotalTimeInSeconds": "7200",
        "app_id": "9fffc8db",
        "app_key": "aaf61d6796a3fd60f9da090d98b484f6",
        "from": 0,
        "to": 100,

    }
}