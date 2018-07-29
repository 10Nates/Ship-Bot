const eJF = require("edit-json-file");

//ALL Bot Code (exceptions made by those who edit) made by @10Nates / github.com/10Nates.

module.exports = {

    logmsg: function logmsg(msg, message, bot) {
        bot.channels.get('channel ID for log chat').send(`recieved: ${message.author.username} - ${message.content}`);
        bot.channels.get('channel ID for log chat').send(`Sent: ${msg}`);
        console.log(message.author.username + ' - ' + message.content);
        console.log(`sent: ${msg}`);
    },

    shipGen: function shipgen(message) {
        var shiplist = new eJF('./shiplist.json').get('shiplist').split(' ')
        console.log('Shiplist: ' + shiplist)
        var mems = message.channel.members;
        idlist = 'Idlist: '
        for (let [snowflake, guildMember] of mems) {
            idlist = idlist + guildMember.user.id + ' '
        }
        var idlistarray = idlist.replace(message.author.id + ' ', '').split(' ').splice(1)
        var selectid = idlistarray[Math.floor(Math.random() * idlistarray.length)]
        console.log(idlistarray)
        for (i = 0; i < shiplist.length; i++) {
            console.log('Current: ' + shiplist[i])
            if (selectid == shiplist[i]) {
                console.log(`ID ${selectid} found in shiplist #${i}. Resetting...`)
                selectid = idlistarray[Math.floor(Math.random() * idlistarray.length)]
                i = -1
            } else if (selectid == null) {
                console.log('ID selected is undefined.')
                selectid = idlistarray[Math.floor(Math.random() * idlistarray.length)]
                i = -1
            } else {
                console.log(`ID ${selectid} doesn't match ${shiplist[i]}`)
            }
        }
        console.log('ID Picked: ' + selectid)
        return (selectid)
    }

}