require('dotenv').config();
const { getDesignFromUrl } = require('./src/services/figmaService');

async function test() {
  console.log('🧪 Testing Figma Service...\n');
  
  const testUrl = 'https://www.figma.com/design/F2lkYCId2xMqcd9RuXL20B/API-Portal?node-id=278-6038&m=dev';
  
  console.log(`📐 Figma URL: ${testUrl}`);
  console.log(`🔑 Figma Token: ${process.env.FIGMA_TOKEN ? '✅ Set' : '❌ Not set'}\n`);
  
  try {
    const result = await getDesignFromUrl(testUrl);
    console.log('✅ Success!');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

test();

