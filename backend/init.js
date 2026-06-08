const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

async function init() {
  console.log('Pushing database schema...');
  try {
    // Run prisma db push to create tables
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('Database schema pushed successfully.\n');
  } catch (error) {
    console.error('Failed to push database schema:', error.message);
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  console.log('Seeding initial data...');
  try {
    const adminExists = await prisma.adminUser.findUnique({ 
      where: { email: 'admin@kalasamskruthi.com' } 
    });
    
    if (!adminExists) {
      await prisma.adminUser.create({
        data: {
          name: 'Admin',
          email: 'admin@kalasamskruthi.com',
          password: 'admin123',
          role: 'Super Admin'
        }
      });
      console.log('Admin user created (email: admin@kalasamskruthi.com, password: admin123).');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding data:', error.message);
  } finally {
    await prisma.$disconnect();
  }

  console.log('\nDatabase initialization complete.');
}

init().catch(e => {
  console.error(e);
  process.exit(1);
});
