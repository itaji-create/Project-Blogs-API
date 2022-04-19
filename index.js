const express = require('express');

const app = express();

const userRouter = require('./routers/user');
const loginRouter = require('./routers/login');
const categoriesRouter = require('./routers/categories');
const postRouter = require('./routers/post');

app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
