const { PostgreSqlContainer } = require('@testcontainers/postgresql');
const supertest = require('supertest');
const { execSync } = require('child_process');

let app, container, request, server;
jest.setTimeout(60000);
beforeAll(async () => {
  container = await new PostgreSqlContainer('postgres')
    .withDatabase('testdb')
    .withUsername('test')
    .start();

  process.env.DATABASE_URL = container.getConnectionUri();
  process.env.JWT_SECRET = 'testsecret';
  await new Promise(resolve => setTimeout(resolve, 5000));
  execSync(`npx prisma migrate deploy`, {
    stdio: 'inherit',
    env: {
      ...process.env,
    }
  });
  app = require('../src/app');
  server = app.listen(); // Start the server
  request = supertest(app);

  // Optionally run migrations here
});

afterAll(async () => {
  if (server) server.close();
  await container.stop();
});

test('register and login', async () => {
  const user = { name: 'Test', email: 'test@example.com', password: 'password123' };
  const regRes = await request.post('/route/v1/register').send(user);
  expect(regRes.status).toBe(201);

  const loginRes = await request.post('/route/v1/login').send({ email: user.email, password: user.password });
  expect(loginRes.status).toBe(200);
  expect(loginRes.body.token).toBeDefined();
});