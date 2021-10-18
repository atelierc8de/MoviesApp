import {Dimensions, StatusBar} from "react-native";
import {getStatusBarHeight, getBottomSpace} from "react-native-iphone-x-helper";

export default class UStyle {

    static deviceHeight = Dimensions.get('window').height;
    static deviceWidth = Dimensions.get('window').width;

    static shadow = {elevation: 2, shadowOffset: {width: 0, height: 2}, shadowRadius:6, shadowColor: '#000000', shadowOpacity: 0.3};

    static statusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
    static bottomSpace = getBottomSpace();
    static topBarHeight = Platform.OS === 'ios' ? 44:56;

    static topBarAndStatusBarHeight = Platform.OS === 'ios' ? UStyle.topBarHeight + UStyle.statusBarHeight : UStyle.topBarHeight + UStyle.statusBarHeight;
}
