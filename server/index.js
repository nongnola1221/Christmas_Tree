import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 3000;

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!databaseUrl) {
  console.warn('DATABASE_URL or POSTGRES_URL is not set. API calls will fail.');
}

const pool = new Pool({
  connectionString: databaseUrl
});

const ensureSchema = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS stats (
      name TEXT PRIMARY KEY,
      count BIGINT NOT NULL DEFAULT 0
    );
  `);
};

const getCount = async () => {
  const result = await pool.query(
    'SELECT count FROM stats WHERE name = $1',
    ['global_installs']
  );
  return result.rows[0]?.count ?? 0;
};

const incrementCount = async () => {
  const result = await pool.query(
    `INSERT INTO stats (name, count)
     VALUES ($1, 1)
     ON CONFLICT (name)
     DO UPDATE SET count = stats.count + 1
     RETURNING count;`,
    ['global_installs']
  );
  return result.rows[0].count;
};

app.use(express.json());

app.get('/api/installs', async (req, res) => {
  try {
    const count = await getCount();
    res.json({ installs: Number(count) });
  } catch (error) {
    console.error('Failed to read installs:', error);
    res.status(500).json({ error: 'Failed to load installs' });
  }
});

app.post('/api/installs/increment', async (req, res) => {
  try {
    const count = await incrementCount();
    res.json({ installs: Number(count) });
  } catch (error) {
    console.error('Failed to increment installs:', error);
    res.status(500).json({ error: 'Failed to update installs' });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

ensureSchema()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to init database:', error);
    process.exit(1);
  });
