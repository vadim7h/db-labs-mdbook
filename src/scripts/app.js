const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const teamRoutes = require('./routes/teamRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();


app.use(cors());
app.use(bodyParser.json());



app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});