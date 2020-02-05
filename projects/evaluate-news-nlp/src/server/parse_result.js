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
            {"entity": "Venice", "polarity": "negative", "confidence": 0.45, "type": "Location"},
            {"entity": "Sistine Chapel", "polarity": "positive", "confidence": 0.6, "type": "Location"}
        ]
*/

function parse_elsa_result(entities) {
    if ( entities.length == 0) {
        return [];
    }
    let ret = [];
    for (let i=0; i<entities.length; i++) {
        const entity = entities[i];
        const item = {

        }
        ret.
    }
}