#Starting server

1. `npm install`
2. Create .env file inside root folder with PORT and API_URL
3. Start server by using `npm run dev` to start development server, or `npm run build` => `npm start`

##Testing

- You can run tests using `npm test` (by default only one is available)
- Sending **_POST_** request to `/api/v1/messages/filter` with messages and filter
- Access http://localhost:3001/api/v1/messages/filter and get filtered messages in browser from mock messages and predefined filter

**_Queries for both databases are displayed in console_**
