const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5287068351:AAGIyBS5ErEAZs7ZOE4XoVxfBOnmSZcpWjQ'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const statrGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру Анварик от 0 до 9, а ты должен её отгадать`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Отгадывай Анварик;)`, gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Информация о пользователе'},
        {command: '/game', description: 'Анварик угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/11.webp');
            return bot.sendMessage(chatId,`Добро пожаловать в телеграм бот Анварик, автора Fahrishtm aka Star_Lord`);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId,`Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text === '/game') {
            return statrGame(chatId);

        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю Анварик, поробуй еще раз!')


    })

    bot.on('callback_query', async msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return statrGame(chatId)

        }
        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю хороший мальчик Анвар;) ты отгадал ${chats[chatId]}`, againOptions)
        } else {
            return await bot.sendMessage(chatId, `Эх Анварик, ты не угадал, но ничего, повезет в любви, бот загадал цифру ${chats[chatId]}`, againOptions)
        }
    })

}

start()


