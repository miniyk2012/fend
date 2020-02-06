/*
    entities: 
    "entities": [
        {
            "mentions": [
                {
                    "offset": 37,
                    "confidence": 1,
                    "text": "Venice",
                    "sentiment": {
                        "polarity": "negative",
                        "confidence": 0.45
                    }
                }
            ],
            "overall_sentiment": {
                "polarity": "negative",
                "confidence": 0.45
            },
            "type": "Location",
            "links": [
                {
                    "uri": "http://dbpedia.org/resource/Venice",
                    "provider": "dbpedia",
                    "types": [
                        "http://dbpedia.org/ontology/Settlement",
                        "http://schema.org/Place",
                        "http://dbpedia.org/ontology/Place",
                        "http://dbpedia.org/ontology/City",
                        "http://dbpedia.org/ontology/PopulatedPlace",
                        "http://dbpedia.org/ontology/Location"
                    ],
                    "confidence": 1.17
                }
            ]
        },
        {
            "mentions": [
                {
                    "offset": 4,
                    "confidence": 1,
                    "text": "Sistine Chapel",
                    "sentiment": {
                        "polarity": "positive",
                        "confidence": 0.6
                    }
                }
            ],
            "overall_sentiment": {
                "polarity": "positive",
                "confidence": 0.6
            },
            "type": "Location",
            "links": [
                {
                    "uri": "http://dbpedia.org/resource/Sistine_Chapel",
                    "provider": "dbpedia",
                    "types": [
                        "http://dbpedia.org/ontology/Museum",
                        "http://schema.org/Place",
                        "http://dbpedia.org/ontology/Chapel",
                        "http://dbpedia.org/ontology/Place",
                        "http://dbpedia.org/ontology/Building",
                        "http://dbpedia.org/ontology/ArchitecturalStructure",
                        "http://dbpedia.org/ontology/Location",
                        "http://dbpedia.org/ontology/ReligiousBuilding"
                    ],
                    "confidence": 0.05
                }
            ]
        }
    ]

    return:
        [
            {"entity_name": "Venice", "polarity": "negative", "confidence": 0.45, "type": "Location"},
            {"entity_name": "Sistine Chapel", "polarity": "positive", "confidence": 0.6, "type": "Location"}
        ]
*/

function parse_elsa_result(entities) {
    if ( entities.length == 0) {
        return [];
    }
    const ret = [];
    for (let i=0; i<entities.length; i++) {
        const entity = entities[i];
        const polarity = entity.overall_sentiment.polarity;
        const confidence = entity.overall_sentiment.confidence;
        const type = entity.type;
        const entity_name = entity.mentions[0].text;
        const item = {entity_name, polarity, confidence, type};
        ret.push(item);
    }
    return ret;
}

function sum(a, b) {
    return a + b;
  }

module.exports = {sum, parse_elsa_result};