const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/usersRoutes');
const eventRoutes = require('./routes/eventRoutes');
const projectRoutes = require('./routes/projectRoutes');
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/projects', projectRoutes);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
