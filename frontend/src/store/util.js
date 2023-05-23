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