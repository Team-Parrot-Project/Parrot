import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function UserGreeting(  ) {
  const [greeting, setGreeting] = useState('');
  const userName = useSelector(state => state.session.user.username);

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

  return (<>{greeting}, {userName}</>);
};
