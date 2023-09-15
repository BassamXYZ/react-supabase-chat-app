# Chat app

This is a chat app built with react and supabase.

## Screenshots

![App Screenshot](https://i.postimg.cc/wvbVXyYh/chat-app.png)

## Feedback

If you have any feedback, please reach out to us at <bassam.essam.ahmad@gmail.com>

## Run Locally

Clone the project

```bash
  git clone https://github.com/BassamXYZ/chat-app.git
```

Go to the project directory

```bash
  cd chat-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run build
  npm run preview
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_SUPABASE_URL`
`VITE_SUPABASE_URL`

## Setup your Supabase project

The following database table messages is required:

| Field | Type |
| ----- | ---- |
| id | int8 |
| text | text |
| username | text |

Note: Don't forget to tick `Enable Realtime` setting after you created the table.

## Demo

[https://bassamchatapp.netlify.app](https://bassamchatapp.netlify.app)

## 🚀 About Me

I'm a full stack developer...

[My portfolio](https://bassamahmad.netlify.app)

## License

[MIT](https://choosealicense.com/licenses/mit/)
