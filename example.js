/*
 * Trivoh REST API Usage Example
 *
 * Documentation
 * https://api.trivoh.com/api-docs/
 */

// import trivoh from "trivoh-js"
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
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
  trivoh.getMeetingById("meeting-id", answerGetter);
  // password created with hash if not provided
  trivoh.createMeeting(
    { title: "New Meeting", schedule: true, end_time: "", start_time: "" },
    answerGetter,
  );
  trivoh.updateMeeting(
    "meeting-id",
    {
      title: "New Meeting Updated Title",
      schedule: true,
      end_time: "",
      start_time: "",
    },
    answerGetter,
  );
  trivoh.deleteMeeting("meeting-id", answerGetter);
});
