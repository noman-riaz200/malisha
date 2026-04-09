const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://malisha:malisha@malisha0.44r94mh.mongodb.net/edupro';

async function checkUsers() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    
    const db = client.db();
    const users = db.collection('users');
    
    const allUsers = await users.find({}).limit(10).toArray();
    console.log('Users in database:', allUsers.length);
    
    if (allUsers.length > 0) {
      console.log('Sample users:');
      allUsers.forEach(u => {
        console.log(' -', u.email, '| role:', u.role);
      });
    }
    
    // Check specifically for admin
    const admin = await users.findOne({ email: 'admin@malisha.com' });
    console.log('\nAdmin user found:', admin ? 'YES' : 'NO');
    if (admin) {
      console.log('Admin role:', admin.role);
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.close();
  }
}

checkUsers();