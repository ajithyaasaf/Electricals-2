// Comprehensive User Workflow Test Script for CopperBear E-commerce Platform
// This script tests all major user journeys and features

const BASE_URL = 'http://localhost:5000';

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

// Helper function to log test results
function logTest(testName, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  const result = { testName, passed, details };
  testResults.tests.push(result);
  testResults[passed ? 'passed' : 'failed']++;
  console.log(`${status}: ${testName} ${details}`);
}

// Test API endpoints
async function testAPIEndpoints() {
  console.log('\n=== API ENDPOINT TESTS ===');
  
  const endpoints = [
    { url: '/api/products', name: 'Products API' },
    { url: '/api/categories', name: 'Categories API' },
    { url: '/api/services', name: 'Services API' },
    { url: '/api/products?search=wire', name: 'Product Search' },
    { url: '/api/products?categoryId=1', name: 'Category Filter' }
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint.url}`);
      const data = await response.json();
      
      if (response.ok && data.success && Array.isArray(data.data)) {
        logTest(endpoint.name, true, `(${data.data.length} items)`);
      } else {
        logTest(endpoint.name, false, `Invalid response format`);
      }
    } catch (error) {
      logTest(endpoint.name, false, `Error: ${error.message}`);
    }
  }
}

// Test data integrity
async function testDataIntegrity() {
  console.log('\n=== DATA INTEGRITY TESTS ===');
  
  try {
    // Test product data structure
    const productsResponse = await fetch(`${BASE_URL}/api/products`);
    const productsData = await productsResponse.json();
    
    if (productsData.success && productsData.data.length > 0) {
      const product = productsData.data[0];
      const requiredFields = ['id', 'name', 'price', 'categoryId'];
      const hasAllFields = requiredFields.every(field => product.hasOwnProperty(field));
      
      logTest('Product Data Structure', hasAllFields, 
        hasAllFields ? 'All required fields present' : 'Missing required fields');
    }
    
    // Test categories data
    const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
    const categoriesData = await categoriesResponse.json();
    
    if (categoriesData.success && categoriesData.data.length > 0) {
      const category = categoriesData.data[0];
      const hasRequiredFields = category.hasOwnProperty('id') && category.hasOwnProperty('name');
      
      logTest('Category Data Structure', hasRequiredFields,
        hasRequiredFields ? 'All required fields present' : 'Missing required fields');
    }
    
    // Test services data
    const servicesResponse = await fetch(`${BASE_URL}/api/services`);
    const servicesData = await servicesResponse.json();
    
    if (servicesData.success && servicesData.data.length > 0) {
      const service = servicesData.data[0];
      const hasRequiredFields = ['id', 'name', 'price', 'description'].every(field => 
        service.hasOwnProperty(field));
      
      logTest('Service Data Structure', hasRequiredFields,
        hasRequiredFields ? 'All required fields present' : 'Missing required fields');
    }
    
  } catch (error) {
    logTest('Data Integrity', false, `Error: ${error.message}`);
  }
}

// Test search functionality
async function testSearchFunctionality() {
  console.log('\n=== SEARCH FUNCTIONALITY TESTS ===');
  
  const searchTests = [
    { query: 'wire', expectedMinResults: 1, testName: 'Basic Search' },
    { query: 'switch', expectedMinResults: 1, testName: 'Switch Search' },
    { query: 'xyz123notfound', expectedMinResults: 0, testName: 'No Results Search' }
  ];
  
  for (const test of searchTests) {
    try {
      const response = await fetch(`${BASE_URL}/api/products?search=${encodeURIComponent(test.query)}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        const resultCount = data.data.length;
        const passed = test.expectedMinResults === 0 ? 
          resultCount === 0 : resultCount >= test.expectedMinResults;
        
        logTest(test.testName, passed, `Found ${resultCount} results`);
      } else {
        logTest(test.testName, false, 'API request failed');
      }
    } catch (error) {
      logTest(test.testName, false, `Error: ${error.message}`);
    }
  }
}

// Test error handling
async function testErrorHandling() {
  console.log('\n=== ERROR HANDLING TESTS ===');
  
  const errorTests = [
    { url: '/api/products?categoryId=999', name: 'Invalid Category ID' },
    { url: '/api/nonexistent', name: 'Non-existent Endpoint' }
  ];
  
  for (const test of errorTests) {
    try {
      const response = await fetch(`${BASE_URL}${test.url}`);
      
      if (test.url.includes('nonexistent')) {
        // Should return 404 for non-existent endpoints
        logTest(test.name, response.status === 404, `Status: ${response.status}`);
      } else {
        // Should handle invalid parameters gracefully
        const data = await response.json();
        logTest(test.name, response.ok || data.hasOwnProperty('error'), 
          `Handled gracefully: ${response.ok ? 'Yes' : 'No'}`);
      }
    } catch (error) {
      logTest(test.name, false, `Error: ${error.message}`);
    }
  }
}

// Test performance
async function testPerformance() {
  console.log('\n=== PERFORMANCE TESTS ===');
  
  const performanceTests = [
    { url: '/api/products', maxTime: 100, name: 'Products Load Time' },
    { url: '/api/categories', maxTime: 50, name: 'Categories Load Time' },
    { url: '/api/services', maxTime: 50, name: 'Services Load Time' }
  ];
  
  for (const test of performanceTests) {
    try {
      const startTime = Date.now();
      const response = await fetch(`${BASE_URL}${test.url}`);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const passed = duration <= test.maxTime;
      logTest(test.name, passed, `${duration}ms (max: ${test.maxTime}ms)`);
    } catch (error) {
      logTest(test.name, false, `Error: ${error.message}`);
    }
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Comprehensive CopperBear E-commerce Workflow Tests');
  console.log('=' * 60);
  
  await testAPIEndpoints();
  await testDataIntegrity();
  await testSearchFunctionality();
  await testErrorHandling();
  await testPerformance();
  
  console.log('\n' + '=' * 60);
  console.log('📊 TEST SUMMARY');
  console.log('=' * 60);
  console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ FAILED TESTS:');
    testResults.tests.filter(t => !t.passed).forEach(test => {
      console.log(`- ${test.testName}: ${test.details}`);
    });
  }
  
  return testResults;
}

// Run tests if this script is executed directly
if (typeof window === 'undefined') {
  runAllTests().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  });
}