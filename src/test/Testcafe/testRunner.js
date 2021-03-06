const createTestCafe = require('testcafe');
let testcafe = null;

createTestCafe()
  .then(tc => {
    testcafe = tc;
    const runner = testcafe.createRunner();

    return runner
      .browsers(['chrome'])
      .concurrency(1)
      //.speed(0.75)
      .screenshots('./screenshots', { takeOnFails: true })
      .reporter('spec')
      .src(['./repository_tests/login_create_new_repo.js'])
      .run({
        skipJsErrors: true,
        quarantineMode: false,
        selectorTimeout: 2000,
        assertionTimeout: 1000,
        pageLoadTimeout: 1000,
        speed: 0.9,
        debugOnFail: true,
        stopOnFirstFail: false
      })
  })
  .then(failedCount => {
    console.log('Total tests failed: ' + failedCount);
    testcafe.close();
  });