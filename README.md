React chat app with SocketIO
If you what to run this app on your local machine you need to add proxy.

- in public\package.json add "proxy": "http://localhost:5000"
- in public\src\components\ChatPage.js at the line 33 io('') replace with io('http://localhost:5000')
