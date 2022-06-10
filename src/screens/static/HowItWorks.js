import React from 'react';
import {Platform, Text, View, ScrollView, StatusBar, StyleSheet} from 'react-native';

import {CommonStyles, Colors, Typography} from '../../theme';

const HowItWorksScreen = () => {

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={"#001D3F"}/>

            <View style={styles.header}>
                <Text style={styles.headingText1}>How It Works</Text>
            </View>

            <ScrollView style={{
                height: Platform.OS === 'ios' ? 400 : 350,
            }}>
                <View style={styles.list}>
                    <View style={styles.listItem}>
                        <View style={styles.listItemInner}>
                            <View style={styles.circleListItem}>
                                <Text style={styles.listNumber}>1</Text>
                            </View>
                            <Text style={styles.listDescription}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
                                when an unknown
                            </Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.listItemInner}>
                            <View style={styles.circleListItem}>
                                <Text style={styles.listNumber}>2</Text>
                            </View>
                            <Text style={styles.listDescription}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
                                when an unknown
                            </Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.listItemInner}>
                            <View style={styles.circleListItem}>
                                <Text style={styles.listNumber}>3</Text>
                            </View>
                            <Text style={styles.listDescription}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
                                when an unknown
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
    },
    header: {
        ...CommonStyles.header,
        marginTop: Platform.OS === 'ios' ? 120 : 62,
        width: '100%',
        marginLeft: 32,
        marginRight: 32,
    },
    headingText1: {
        ...CommonStyles.headingText1,
        fontFamily: Typography.FONT_SEMI_BOLD,
        lineHeight: 36,
        textAlign: 'left',
    },
    list: {
        paddingTop: 45,
        paddingBottom: 45,
        marginLeft: 32,
        marginRight: 32,
    },
    listItem: {
        ...CommonStyles.listItem,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 60,

    },
    listItemInner: {
        ...CommonStyles.listItemInner,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    circleListItem: {
        ...CommonStyles.circleListItem,
        height: 51,
        width: 51,
        borderRadius: 25.5,
        borderWidth: 0,
        backgroundColor: Colors.QUATERNARY_BACKGROUND_COLOR,
        position: 'absolute',
        top: -50,
    },
    listNumber: {
        color: Colors.PRIMARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_DOUBLE_EXTRA_LARGE,
        fontFamily: Typography.FONT_BOLD,
        lineHeight: 36,
    },
    listDescription: {
        fontSize: Typography.FONT_SIZE_MEDIUM,
        fontFamily: Typography.FONT_MEDIUM,
        lineHeight: 21,
        color: Colors.TERTIARY_TEXT_COLOR,
        paddingTop: 25,
        paddingBottom: 25,
    },

});

export default HowItWorksScreen;


