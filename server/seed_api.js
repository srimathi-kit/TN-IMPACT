const axios = require('axios');

const seedViaApi = async () => {
  const industries = [
    {
      industryName: 'Textile Hub Inc.',
      industryType: 'Textile',
      location: 'Mumbai, India',
      email: 'textile@example.com',
      password: 'password123'
    },
    {
      industryName: 'EcoPlastic Solutions',
      industryType: 'Manufacturing',
      location: 'Bangalore, India',
      email: 'plastic@example.com',
      password: 'password123'
    },
    {
      industryName: 'Steel Forge Corp',
      industryType: 'Heavy Industry',
      location: 'Chennai, India',
      email: 'steel@example.com',
      password: 'password123'
    }
  ];

  for (const industry of industries) {
    try {
      let user;
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', industry);
        user = response.data;
        console.log(`Registered: ${industry.industryName}`);
      } catch (err) {
        if (err.response?.data?.message === 'User already exists') {
          const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: industry.email,
            password: industry.password
          });
          user = loginRes.data;
          console.log(`Logged in: ${industry.industryName}`);
        } else {
          throw err;
        }
      }

      // Add one waste item for each
      const wasteData = {
        wasteType: industry.industryType === 'Textile' ? 'Fabric' : 
                   industry.industryType === 'Manufacturing' ? 'Plastic' : 'Metal',
        quantity: '1000 kg',
        location: industry.location,
        description: `Premium industrial ${industry.industryType} waste for circular exchange.`
      };

      await axios.post('http://localhost:5000/api/waste', wasteData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      console.log(`Added waste for: ${industry.industryName}`);
    } catch (error) {
      console.error(`Failed for ${industry.industryName}:`, error.response?.data?.message || error.message);
    }
  }
};

seedViaApi();
