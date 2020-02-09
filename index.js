const BlipSdk = require('blip-sdk');
const WebSocketTransport = require('lime-transport-websocket');
const Lime = require('lime-js');
const fetch = require("node-fetch");

let client = new BlipSdk.ClientBuilder()
    .withIdentifier('meuteste6')
    .withAccessKey('QnA1Nk45V1FxYVpiaWlnZDNrNUY=')
    .withTransportFactory(() => new WebSocketTransport())
    .build();

client.addMessageReceiver(true, function(message) {
    console.log(message);
});

client.connect() 
    .then(async function(session) {
        const url = "https://api.github.com/search/repositories?q=user:takenet";
        const response = await fetch(url);
        const result = await response.json();
        const lista = result.items;

        var listaName = lista
       .sort(function(a, b) {
             return new Date(a.created_at) < new Date(b.created_at)
        })
       .slice(0,5)
       .map(repo => repo.name);

       var listaDesc = lista
       .sort(function(a, b) {
             return new Date(a.created_at) < new Date(b.created_at)
        })
       .slice(0,5)
       .map(repo => repo.description);

       client.addMessageReceiver(function(message){
        return message.content.length > 0;
        }, function(message) {
            var msg = { 
                type: "application/vnd.lime.collection+json",
                to: message.from, 
                id: Lime.Guid(),
                content: {
                    itemType: "application/vnd.lime.document-select+json",
                    items: [
                        {
                            header: {
                                type: "application/vnd.lime.media-link+json",
                                value: {
                                    title: listaName[0],
                                    text: listaDesc[0],
                                    type: "image/jpeg",
                                    uri: "https://avatars1.githubusercontent.com/u/4369522?s=200&v=4"
                                }
                            
                            }
                        },
                        {
                            header: {
                                type: "application/vnd.lime.media-link+json",
                                value: {
                                    title: listaName[1],
                                    text: listaDesc[1],
                                    type: "image/jpeg",
                                    uri: "https://avatars1.githubusercontent.com/u/4369522?s=200&v=4"
                                }
                            }
                        },
                        {

                            header: {
                                type: "application/vnd.lime.media-link+json",
                                value: {
                                    title: listaName[2],
                                    text: listaDesc[2],
                                    type: "image/jpeg",
                                    uri: "https://avatars1.githubusercontent.com/u/4369522?s=200&v=4"
                                }
                            }
                        },
                        {
                            header: {
                                type: "application/vnd.lime.media-link+json",
                                value: {
                                    title: listaName[3],
                                    text: listaDesc[3],
                                    type: "image/jpeg",
                                    uri: "https://avatars1.githubusercontent.com/u/4369522?s=200&v=4"
                                }
                            }
                        },
                        {
                            header: {
                                type: "application/vnd.lime.media-link+json",
                                value: {
                                    title: listaName[4],
                                    text: listaDesc[4],
                                    type: "image/jpeg",
                                    uri: "https://avatars1.githubusercontent.com/u/4369522?s=200&v=4"
                                }
                            }
                        },
                    ]
                }
            };
        client.sendMessage(msg);
    });

           console.log(result);

        //teste.items.forEach(i=> console.log(i.name));
        
    })
    .catch(function(err) { 
        console.log(err);
     });