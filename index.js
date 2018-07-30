const Discord = require('discord.js');
const bot = new Discord.Client();
const extras = require('./extras');
//halfstr taken from the  n e t
function halfstr(str) {
    var middle = Math.ceil(str.length / 2);
    var s1 = str.slice(0, middle);
    var s2 = str.slice(middle);
    return [s1, s2]
};

//ALL Bot Code (exceptions made by those who edit) made by @10Nates / github.com/10Nates.

bot.on('message', (message) => {
    const args = message.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const eJF = new require("edit-json-file");
    const jfile = eJF('./shiplist.json')

    if (command === '-=ship') {
        var shiplist = jfile.get('shiplist')
        var idrem = shiplist.replace(`${message.author.id}`, '')
        if (shiplist == idrem) {
            if (message.mentions.members.array().length == 1) {
                if (message.isMentioned(message.author.id)) {
                    message.channel.send("You can't date yourself!")
                    extras.logmsg("You can't date yourself!")
                } else {
                    if (extras.reladet(args[0].replace(/<@|>/g, '')) == false) {
                    var namecombine = halfstr(message.author.username)[0] + halfstr(bot.users.get(args[0].replace(/<@|>/g, '')).username)[1]
                    message.channel.send(`<@${message.author.id}> and ${args[0]} are now dating! Welcome, ${namecombine}!`)
                    extras.logmsg(`<@${message.author.id}> and ${args[0]} are now dating! Welcome, ${namecombine}!`, message, bot)
                    var fileadd = `${jfile.get('shiplist')}${message.author.id} ${args[0].replace(/<@|>/g, '')} `
                    var fileadd2 = `${jfile.get('inship')}${message.author.id}+${args[0].replace(/<@|>/g, '')} `
                    jfile.set('shiplist', fileadd)
                    jfile.set('inship', fileadd2)
                    jfile.save()
                    shiplist = jfile.get('shiplist')
                    } else {
                        message.channel.send(`${args[0]} is already in a relationship!`)
                        extras.logmsg(`${args[0]} is already in a relationship!`, message, bot)
                    }
                }
            } else {
                var selectid = extras.shipGen(message)
                var namecombine = halfstr(message.author.username)[0] + halfstr(bot.users.get(selectid).username)[1]
                    message.channel.send(`<@${message.author.id}> and <@${selectid}> are now dating! Welcome, ${namecombine}!`)
                extras.logmsg(`<@${message.author.id}> and <@${selectid}> are now dating! Welcome, ${namecombine}!`, message, bot)
                var fileadd = `${jfile.get('shiplist')}${message.author.id} ${selectid} `
                var fileadd2 = jfile.get('inship') + message.author.id + '+' + selectid + ' '
                jfile.set('shiplist', fileadd)
                jfile.set('inship', fileadd2)
                jfile.save()
            }
        } else {
            console.log(jfile.get('inship'))
            var inshipfind = jfile.get('inship').split('+').join(' ').split(' ').findIndex(function findauth(element) {
                console.log(element)
                return element == message.author.id
            })
            inshipfind = Math.floor(inshipfind / 2)
            console.log(inshipfind)
            inshipid = jfile.get('inship').split(' ')[inshipfind].replace(message.author.id, '').replace('+', '')
            console.log(inshipid)
            message.channel.send(`You're already in a relationship with <@${inshipid}>!`)
            extras.logmsg(`You're already in a relationship with <@${inshipid}>!`, message, bot)
        }
    }

    if (command === '-=breakup') {
        var shiplist = jfile.get('shiplist')
        console.log(shiplist)
        var idrem = shiplist.replace(`${message.author.id}`, '')
        if (shiplist != idrem) {
            var inshipfind = jfile.get('inship').split('+').join(' ').split(' ').findIndex(function findauth(element) {
                console.log(element)
                return element == message.author.id
            })
            inshipfind = Math.floor(inshipfind / 2)
            console.log(inshipfind)
            inshipid = jfile.get('inship').split(' ')[inshipfind].replace(message.author.id, '').replace('+', '')
            inship = jfile.get('inship').split(' ')[inshipfind]
            inshipreplace = jfile.get('inship').replace(inship + ' ', '') 
            shiplistreplace = jfile.get('shiplist').replace(message.author.id + ' ', '').replace(inshipid + ' ', '')
            console.log(inshipreplace)
            console.log(shiplistreplace)
            jfile.set('inship', inshipreplace)
            jfile.set('shiplist', shiplistreplace)
            jfile.save()
            message.channel.send(`<@${message.author.id}> and <@${inshipid}> have broken up!`)
            extras.logmsg(`<@${message.author.id}> and <@${inshipid}> have broken up!`, message, bot)
        } else {
            message.channel.send("You're not in a relationship yet!")
            extras.logmsg("You're not in a relationship yet!", message, bot)
        }

    }

});

bot.login(process.env.Token);
