var chromeStorage;
try{
    chromeStorage = chrome.storage.sync;
}catch(e){}

module.exports = {
    set: function(key, value){
        module.exports.state[key] = value;
        if(chromeStorage){
            chromeStorage.set({state: JSON.stringify(module.exports.state)});
        }
    },
    state: {}
};

if(chromeStorage){
    chromeStorage.get('state', function(items){
        if(items.state){
            try{
                module.exports.state = JSON.parse(items.state);
            }catch(e){
                console.log('failed to parse saved data.');
            }
        }
    });
} else {
    module.exports.state = localStorage;
}
