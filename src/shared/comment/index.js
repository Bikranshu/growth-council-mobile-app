import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';

const Comments = ({comment, replies}) => {
  return (
    <View style={{flexDirection: 'row', margin: 10}}>
      <Image
        style={{width: 50, height: 50, borderRadius: 30}}
        source={{
          uri: 'https:reactnative.dev/img/tiny_logo.png',
        }}
      />
      <View style={{margin: 5}}>
        <View>
          <Text style={{color: 'blue', fontSize: 16}}>
            {comment?.comment_author}
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>
            {comment?.comment_content}
          </Text>
        </View>
        <View>
          {replies?.length > 0 && (
            <View style={{marginLeft: 30}}>
              {replies?.map(reply => (
                <Comments comment={reply} key={reply.id} replies={[]} />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Comments;
const styles = StyleSheet.create({});
