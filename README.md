# Messenger
Реализация функционала мессенджера, нацеленная на развитие хардскилов

### PULL REQUESTS
- [Sprint 1 #1](https://github.com/MK-176/middle.messenger.praktikum.yandex/pull/1)

###### Список страниц со ссылкой на Netlify
- [Список контактов](https://cocky-shannon-993c10.netlify.app/index.html)
- [Список контактов и чат](https://cocky-shannon-993c10.netlify.app/chat.html)
- [Страница авторизации](https://cocky-shannon-993c10.netlify.app/auth.html)
- [Страница регистрации](https://cocky-shannon-993c10.netlify.app/register.html)
- [Страница изменения данных пользователя](https://cocky-shannon-993c10.netlify.app/change-data.html)
- [Страница изменения пароля пользователя](https://cocky-shannon-993c10.netlify.app/change-password.html)
- [Страница с данными пользователя](https://cocky-shannon-993c10.netlify.app/profile.html)
- [Ошибка 404](https://cocky-shannon-993c10.netlify.app/404.html)
- [Ошибка 500](https://cocky-shannon-993c10.netlify.app/500.html)

## Sprint 1
Реализовал верстку проекта используя Handlebars + добавил небольшую заготовку для компонентов.
[Это прототип мессенджера в Figma](https://www.figma.com/file/HBucROmcriLA8AMnyJnmvI/Messenger?node-id=0%3A1)

###### Команды для запуска
```
npm run build
npm run start
```
Основная команда для запуска **npm run start** эта команда скомпилирует html файлы и запустит раздачу статических страниц через express



## Sprint 2
Переделал способ рендера страниц, сделал разбивку файлов и перевел все на компоненты. Добавил класс для работы с Api.

###### Команды для запуска
```
npm run serve
npm run build
npm run start
```
Добавил команду **npm run serve** эта команда запустит режим разработки с использованием Parcel
