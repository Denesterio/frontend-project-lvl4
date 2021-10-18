const translation = {
  username: 'Имя пользователя',
  password: 'Пароль',
  login: 'Авторизация',
  signup: 'Регистрация',
  logout: 'Выйти',
  confirmPassword: 'Подтвердите пароль',
  enter: 'Войти',
  register: 'Зарегистрироваться',
  notRegistered: 'Не зарегистрированы?',
  alreadyRegistered: 'Уже зарегистрированы?',

  add: 'Добавить',
  delete: 'Удалить',
  rename: 'Переименовать',
  send: 'Отправить',

  channel: {
    pl: 'Каналы',
    add: 'Добавить канал',
    name: 'Название канала',
    insertName: 'Введите название канала',
    renameChannel: 'Переименовать канал',
    removeChannel: 'Удалить канал?',
  },

  messages: {
    no: 'Сообщений нет',
    messages_one: 'сообщение',
    messages_few: 'сообщения',
    messages_many: 'сообщений',
    messagesWithCount_one: '{{ count }} сообщение',
    messagesWithCount_few: '{{ count }} сообщения',
    messagesWithCount_many: '{{ count }} сообщений',
  },

  'Request failed with status code 401': 'Неверные имя пользователя или пароль',
  'Request failed with status code 409': 'Пользователь с таким именем уже существует',
  errors: {
    requiredError: 'Поле не должно быть пустым',
    notOneOfError: 'Канал с таким названием уже существует',
    notConfirm: 'Пароли не совпадают',
    minErrorWithCount_one: 'Не менее {{ count }} символа',
    minErrorWithCount_few: 'Не менее {{ count }} символов',
    minErrorWithCount_many: 'Не менее {{ count }} символов',
    maxErrorWithCount_one: 'Не более {{ count }} символа',
    maxErrorWithCount_few: 'Не более {{ count }} символов',
    maxErrorWithCount_many: 'Не более {{ count }} символов',
    usernameLenght: 'От {{minimal}} до {{maximal}} символов',
  },

  404: 'Страница не найдена',
};

export default { translation };
