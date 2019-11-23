const https = require('https');

function start(){
    https.get('https://modus-made.com/about-modus/leadership/', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            const processedData = splitData(data);
            const person = []
            getName(processedData, person)
            getRole(processedData, person)
            getSecretPassion(processedData, person)
            getUrl(processedData, person)
            displayData(person)
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function splitData(string){
    let shortData = string.slice(string.indexOf('<div class="leadership-listing">'))
    shortData = shortData.slice(0, shortData.indexOf('<!-- component end -->'))
    shortData = shortData.split('<li>')
    return shortData
}

function getName(array, person){
    for (let index = 1; index < array.length; index++) {
        let name = array[index]
        const leader = {}
        name = name.slice(name.indexOf('person-name">'))
        name = name.slice(0, name.indexOf("</span>"))
        leader.name = name.slice(name.indexOf('>') + 1)
        person.push(leader)
    }
};

function getRole(array, person){
    for (let index = 1; index < array.length; index++) {
        let role = array[index]
        const leader = {}
        role = role.slice(role.indexOf('person-title">'))
        role = role.slice(0, role.indexOf("</span>"))
        leader.role = role.slice(role.indexOf('>') + 1)
        person[index - 1].role = leader.role
    }
};

function getSecretPassion(array, person){
    for (let index = 1; index < array.length; index++) {
        let secretPassion = array[index]
        const leader = {}
        secretPassion = secretPassion.slice(secretPassion.indexOf('block-row body-copy">'))
        secretPassion = secretPassion.slice(0, secretPassion.indexOf("</div>"))
        leader.secretPassion = secretPassion.slice(secretPassion.indexOf('>') + 1)
        person[index - 1].secretPassion = leader.secretPassion.trim()
    }
};

function getUrl(array, person){
    for (let index = 1; index < array.length; index++) {
        let url = array[index]
        const leader = {}
        url = url.slice(url.indexOf('<img src'))
        url = url.slice(0, url.indexOf("alt="))
        leader.url = url.slice(url.indexOf('=') + 1)
        person[index - 1].url = leader.url.trim()
    }
};

function displayData(array){
    array.forEach(element => {
        console.log(element.name)
        console.log(`> Role: ${element.role}`)
        console.log(`> Secret Passion: ${element.secretPassion}`)
        console.log(`> Image Url: ${element.url}`)
        console.log('')
    });
}

start()