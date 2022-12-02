import React, {useState, useEffect} from 'react';
import {Badge} from 'react-native-paper';
import {collection, query, onSnapshot, where} from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';

import {database} from '../../utils/firebaseUtil';

const ChatCount = props => {
  const {item, userID} = props;

  const [friend, setFriend] = useState(item);

  //id of user who is chatting with each other
  const chatID = item => {
    const chatIDPre = [];
    chatIDPre.push(item?.ID);
    chatIDPre.push(userID);
    chatIDPre.sort();
    return chatIDPre.join('_');
  };

  console.log({userID});
  const messageCount = async item => {
    // const chatsCol = firestore().collection(`rooms/${chatID(item)}/messages`);

    // // const q = await query(
    // chatsCol
    //   .where('status', '==', 'unread')
    //   .where('user._id', '!=', userID)
    //   // );
    //   .onSnapshot(querySnapshot => {
    //     item = {...item, ...{count: querySnapshot.size}};
    //     setFriend(item);
    //   });

    const chatsCol = await collection(
      database,
      'rooms',
      chatID(item),
      'messages',
    );
    console.log({chatsCol});

    const q = await query(
      chatsCol,
      where('status', '==', 'unread'),
      where('user._id', '!=', userID),
    );
    console.log({q});

    onSnapshot(q, querySnapshot => {
      console.log('snapshot', querySnapshot.size);
      item = {...item, ...{count: querySnapshot.size}};
      setFriend(item);
    });
  };

  useEffect(() => {
    messageCount(item);
  }, []);

  return friend?.count > 0 && <Badge size={25}> {friend?.count}</Badge>;
};

export default ChatCount;
