const { sum, parse_elsa_result } = require('./parse_result');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('parse empty result', () => {
    const entities = [];
    const result = parse_elsa_result(entities);
    expect(result).toEqual([]);
});


const entities = [
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
];

const expect_result = [
    { "entity_name": "Venice", "polarity": "negative", "confidence": 0.45, "type": "Location" },
    { "entity_name": "Sistine Chapel", "polarity": "positive", "confidence": 0.6, "type": "Location" }
];

test('parse normal result', () => {
    const result = parse_elsa_result(entities);
    expect(result).toEqual(expect_result);
});