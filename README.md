# trivoh-js
Trivoh javascript client

### Install

```
npm install trivoh-js
```

### Usage

```javascript
const trivoh = require("./dist/index");

const CLIENT_ID = "X-API-KEY";

trivoh.init(CLIENT_ID, async function (token) {
  if (!token) {
    // error handling
  }

  console.log("your token: " + token);

  /**
   * Function to process response data
   *
   * @param data
   */
  function answerGetter(data) {
    console.log(data);
  }

  trivoh.getAllMeetings(answerGetter);
});
```
