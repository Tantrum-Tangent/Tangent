import moment from "moment";

export function timestampToDate(timestamp) {
    var formattedTime = moment(timestamp).format("MMMM Do YYYY, h:mm ");
    return formattedTime;
  }