export function formatDate(dateString) {
  if (dateString) {
    let date;
    try {
      date = dateString.split("T");
    } catch (error) {
      // debugger;
      date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    return date[0];
  }
  else {
    return null;
  }
}

export function addDaysToDate(dateString, daysToAdd) {

  const dateComponents = dateString.split("-");
  const year = parseInt(dateComponents[0], 10);
  const month = parseInt(dateComponents[1], 10);
  const day = parseInt(dateComponents[2], 10);

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + daysToAdd);

  const updatedYear = date.getFullYear();
  const updatedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const updatedDay = String(date.getDate()).padStart(2, '0');

  return `${updatedYear}-${updatedMonth}-${updatedDay}`;
}