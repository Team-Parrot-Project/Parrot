import { useState, useEffect } from 'react';

export default function CurrentDate() {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const currentDate = new Date();
      const options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(currentDate);
      setFormattedDate(formatted);
    };

    updateDate();
  }, []);

  return formattedDate;
};
