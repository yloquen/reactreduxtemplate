import React, { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Animated, Button, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "./src/store";
import { getUsers } from "./src/features/users/usersSlice";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { Dimensions } from 'react-native';
import { vw } from "./src/Layout";

type RootStackParamList =
{
    Home: undefined;
    Users: undefined;
    UserDetailsScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>;
type NavType = Props['navigation'];

const Stack = createNativeStackNavigator<RootStackParamList>();

console.log("Starting app ... ");

function App():JSX.Element
{
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} options={{title:'Welcome'}}/>
                    <Stack.Screen name="Users" component={UsersScreen}/>
                    <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}


const HomeScreen = ({navigation}:Props) =>
{
    return (<View>
            <Text>Home</Text>
            <Image source={require("./static/img/flare.png")} style={{width:100, height:100}}/>
            <Button title="Users" onPress={() => {navigation.navigate('Users')}}/>
        </View>)
};


const UsersScreen = ({navigation}:Props, userId:number) =>
{
    const users:any = useSelector((state:RootState) => state.users.users);
    const dispatch = useDispatch<AppDispatch>();

    const userComps = users.map( (user:any) => (<UserInfoSmall user={user} navigation={navigation} key={user.id}/>) );

    const styles = StyleSheet.create({
        scrollContainer:
        {
            padding: '1%',
            height: "100%",
            backgroundColor: '#f0f'
        },
        scrollContentContainer:
        {
            alignItems: 'center'
        }
    });

    return (<View >
        <Button title="Get Users" onPress={() => dispatch(getUsers()) }/>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
            {userComps}
        </ScrollView>
    </View>)
};


const UserInfoSmall = (props:{user:any, navigation:any}) =>
{
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => { Animated.timing(fadeAnim, { toValue: 1, duration: 5000, useNativeDriver: true }).start(); };

    const fadeOut = () => { Animated.timing(fadeAnim, { toValue: 0, duration: 3000, useNativeDriver: true }).start(); };

    const styles = StyleSheet.create({
        userContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: "1%",
            backgroundColor: '#bcd',
            width: vw(90),
            height: vw(20),
            paddingLeft:10
        },
        name:
        {
            paddingLeft: 10
        },
        img:
        {
            position: 'absolute',
            right: vw(2),
            width: vw(15),
            height: vw(15)
        }
    });

    fadeIn();

    return (<View style={styles.userContainer}>
        <Button title="View" onPress={()=> props.navigation.navigate('UserDetailsScreen', props.user)}/>
        <Text style={styles.name}>{props.user.name}</Text>
        <Animated.Image
            source={{uri:"https://gravatar.com/wavatar/" + props.user.id }}
            style={[styles.img, {opacity:fadeAnim}]}/>
    </View>)
};


const UserDetailsScreen = ({navigation, route}:Props)=>
{
    const params:any = route.params;
    return <Text>{params.name}</Text>;
};


export default App;
