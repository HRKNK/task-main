import {encoded, translations} from './data.js'

console.log("Let's rock...");
// console.log(encoded, translations);

function decode(encoded, translations) {
    // маппинг исключений
    const exception = {
        groupId: 'groupId', 
        service: 'service', 
        formatSize: 'formatSize',
        ca: 'ca',
    }
    // коллекция уникальных id
    const collection = new Set();

    const decoded = encoded.map(group => {
        for (const key in group) { // перебор объекта

            if (/\d+/g.test(group[key])) // запись числового id
                collection.add(+group[key]);

            if(!(key in exception)) // исключения
                group[key] = translations[group[key]] ? translations[group[key]] : group[key]; // декод + тернарка на "undefined"

        }
        return group; 
    });

    // отсортированная коллекция id (для восприятия)
    const sorted_collection = Array.from(collection).sort((a, b) => a - b);

    return { decoded, sorted_collection };
}

const { decoded, sorted_collection: collection } = decode(encoded, translations);

console.log("...and roll");
console.log(decoded, collection);
