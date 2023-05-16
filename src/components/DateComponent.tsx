import React from "react";

const DateComponent: React.FC<{ dateString: string | null }> = ({
  dateString,
}) => {
  // If dateString is null or not a valid date, return 'No date provided'
  if (!dateString || isNaN(Date.parse(dateString))) {
    return <span>No date provided</span>;
  }

  // Create a new date object from the string
  const date = new Date(dateString);

  // Array of month names for formatting
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date as you'd like:
  const formattedDate = `${date.getDate().toString().padStart(2, "0")} ${
    monthNames[date.getMonth()]
  }, ${date.getFullYear()}`;

  return <span>{formattedDate}</span>;
};

export default DateComponent;
