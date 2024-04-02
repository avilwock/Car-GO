module.exports = {
    // Function to format a date as MM/DD/YYYY
    format_date: (date) => {
      return date.toLocaleDateString(); // Using toLocaleDateString() method to format date
    },
    // Function to format large numbers with commas
    format_amount: (amount) => {
      return parseInt(amount).toLocaleString(); // Parsing amount to integer and using toLocaleString() method to format large numbers with commas
    }
  };
  