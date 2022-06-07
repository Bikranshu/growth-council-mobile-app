import React from 'react';
import {Platform, Text, View, ScrollView, StyleSheet, StatusBar} from 'react-native';

import {CommonStyles, Colors, Typography} from '../../theme';

const WhoWeAreScreen = () => {

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={"#001D3F"}/>
            <View style={styles.contentWrapper}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.paragraph}>
                    Welcome to Growth Councel Funded in 2017, We are Technology Company.
                </Text>
                <Text style={styles.paragraph}>
                    This Agreement governs your use of Apple’s services (“Services”),
                    through which you can buy, get, license, rent or subscribe to content,
                    Apps (as defined below), and other in-app services (collectively, “Content”).
                    ontent may be offered through the Services by Apple or a third party.
                    Our Services are available for your use in your country or territory of residence (“Home Country”).
                    By creating an account for use of the Services in a particular country or territory you are
                    specifying it as your Home Country.
                    To use our Services, you need compatible hardware, software (latest version recommended and
                    sometimes required) and Internet access (fees may apply).
                </Text>
                <Text style={styles.paragraph1}>
                    Growth Councel is one of our kind.
                </Text>
                <Text style={[styles.paragraph1, {paddingLeft: 7}]}>Let's connect on to go</Text>
                <Text style={styles.paragraph}>
                    This Agreement governs your use of Apple’s services (“Services”),
                    through which you can buy, get, license, rent or subscribe to content,
                    Apps (as defined below), and other in-app services (collectively, “Content”).
                    ontent may be offered through the Services by Apple or a third party.
                    Our Services are available for your use in your country or territory of residence (“Home Country”).
                    By creating an account for use of the Services in a particular country or territory you are
                    specifying it as your Home Country.
                    To use our Services, you need compatible hardware, software (latest version recommended and
                    sometimes required) and Internet access (fees may apply).
                </Text>

                <Text style={styles.paragraph}>
                    This Agreement governs your use of Apple’s services (“Services”),
                    through which you can buy, get, license, rent or subscribe to content,
                    Apps (as defined below), and other in-app services (collectively, “Content”).
                    ontent may be offered through the Services by Apple or a third party.
                    Our Services are available for your use in your country or territory of residence (“Home Country”).
                    By creating an account for use of the Services in a particular country or territory you are
                    specifying it as your Home Country.
                    To use our Services, you need compatible hardware, software (latest version recommended and
                    sometimes required) and Internet access (fees may apply).
                </Text>

            </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    contentWrapper: {
        marginTop: Platform.OS === 'ios' ? 100 : 50,
        backgroundColor: Colors.QUIDENARY_BACKGROUND_COLOR,
    },
    scrollContainer: {
        height: '20%',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 0,
    },
    contentContainer: {
        paddingBottom: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        lineHeight: 24,
        marginTop: 15,
        marginBottom: 15,
        color: Colors.PRIMARY_TEXT_COLOR,
        textAlign: 'left',
    },
    paragraph1: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        lineHeight: 24,
        color: Colors.PRIMARY_TEXT_COLOR,
        textAlign: 'left',
    },
});
export default WhoWeAreScreen;
