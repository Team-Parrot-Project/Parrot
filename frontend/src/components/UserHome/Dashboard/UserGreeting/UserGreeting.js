import { useState, useEffect } from 'react';

export default function UserGreeting( userName ) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      let greetingMessage = '';

      if (currentHour >= 4 && currentHour < 12) {
        greetingMessage = 'Good morning';
      } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = 'Good afternoon';
      } else {
        greetingMessage = 'Good evening';
      }

      setGreeting(greetingMessage);
    };

    getGreeting();
  }, []);

  return ({greeting}, {userName});
};
