const get = function getRequest(url) {
  // Return a new promise.
  return new Promise((resolve, reject) => {
    // Do the usual XHR stuff
    const req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
      // This is called even on 404 etc
      // so check the status
      if (req.status === 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = () => {
      reject(Error('Network Error'));
    };

    // Make the request
    req.send();
  });
};

const leftPad = function leftPad(number) {
  let string = number;

  if (number < 10) {
    string = `0${number}`;
  }

  return string;
};

const formattedDate = function formatDate(rawDate, namedMonths = false, time = false, showDay = true, customSeparator = '.', yearFirst) {
  const date = new Date(rawDate);
  const separator = customSeparator;
  let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  if (namedMonths) {
    months = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  }

  const day = leftPad(date.getDate());
  const minutes = leftPad(date.getMinutes());
  const hours = leftPad(date.getHours());

  let dateString = '';
  const timeString = `, ${hours}:${minutes}`;
  const customDate = [day, months[date.getMonth()], date.getFullYear()];

  if (!showDay) {
    customDate.shift();
  }

  if (yearFirst) {
    customDate.reverse();
  }

  dateString = customDate.join(separator);

  if (time) {
    dateString += timeString;
  }

  return dateString;
};

export {
  get,
  formattedDate,
};
