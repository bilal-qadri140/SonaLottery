import { db } from '../Firebase/Config';
import { useEffect, useState } from 'react';

const ChannelLinkComponent = () => {
  const [channelLink, setChannelLink] = useState<string>('');

  const getDraw = async () => {
    try {
      const querySnapshot = await db.collection("link").limit(1).get();
      const singleDocument = querySnapshot.docs[0].data();
      const link = singleDocument.url; // firebase feild name 'url'
      setChannelLink(link);

    } catch (error) {
      console.error("Error fetching draw data:", error);
    }
  };

  useEffect(() => {
    getDraw(); // Call the async function within the useEffect

  }, []); // Empty dependency array means this effect runs once when the component mounts
  return channelLink;
};

export default ChannelLinkComponent;
