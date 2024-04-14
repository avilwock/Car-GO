module.exports = {
    // Function to format a date as MM/DD/YYYY
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      console.log('Input date:', date);
      if (!date || isNaN(new Date(date))) {
        return 'Invalid Date';
      }
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
      return formattedDate;
    },
    // Function to format large numbers with commas
    format_amount: (amount) => {
      return parseInt(amount).toLocaleString(); // Parsing amount to integer and using toLocaleString() method to format large numbers with commas
    }
  };

  //added commnet to commit