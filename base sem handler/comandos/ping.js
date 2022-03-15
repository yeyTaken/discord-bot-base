module.exports =  {
    name: "ping",
    description: "Veja meu ping",

    run: async (client, message, args) => {
        
        
        message.reply({content: `Meu ping é ${client.ws.ping}`})}}