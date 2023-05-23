export function formatDate(dateString) {
    if(dateString) {
      const date = dateString.split("T");
      return date[0];
    }
    else {
      return null;
    }
  }