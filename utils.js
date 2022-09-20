exports.ARAGO_KEY = "arago_pass";

exports.CREDENTIAL_MANIFEST =
    {
        arago: {
            "id":"AragoPass",
            "issuer":{
                "id":"",
                "name":"Arago issuer by Altme"
            },
            "output_descriptors":[
                {
                    "id": "",
                    "schema": "Arago",
                    "display": {
                        "title": {
                            "path": [],
                            "schema": {
                                "type": "string"
                            },
                            "fallback": "Arago Pass"
                        },
                        "subtitle": {
                            "path": [],
                            "schema": {
                                "type": "string"
                            },
                            "fallback": "Le pass de vos activités culturelles"
                        },
                        "description": {
                            "path": [],
                            "schema": {
                                "type": "string"
                            },
                            "fallback": "Vous pouvez utiliser ce pass pour accéder au contenu des sites partenaires d'Arago."
                        },
                        "properties": [


                            {
                                "path": ["$.credentialSubject.issuedBy.name"],
                                "schema": {
                                    "type": "string"
                                },
                                "fallback": "Unknown",
                                "label": "Vérifié par"
                            },
                            {
                                "path": ["$.expirationDate"],
                                "schema": {
                                    "type": "string",
                                    "format" : "date"
                                },
                                "fallback": "None",
                                "label": "Expire"
                            },
                            {
                                "path": ["$.credentialSubject.group"],
                                "schema": {
                                    "type": "string"
                                },
                                "fallback": "Unknown",
                                "label": "Groupe"
                            }
                        ]
                    }
                }
            ],
            "presentation_definition":{}
        }
    }
