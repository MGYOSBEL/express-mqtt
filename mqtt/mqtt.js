var mqtt = require('mqtt');
var storage = require('../firebase/firebase');


var mqttClient = mqtt.connect('http://127.0.0.1:11883');


mqttClient.on('connect', function () {
    mqttClient.subscribe('temperatura/#', function (err) {
      if (!err) {
        // mqttClient.publish('presence', 'Hello mqtt')
        console.log('node mqttClient subscribed....');
      }
    })
  })
   
  mqttClient.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic, message.toString());
    const date = new Date();
    const registryPath = `${topic}/${date}`;
    storage.saveRegistry(registryPath, {value: message.toString()});
  })

  module.exports = mqttClient;
  