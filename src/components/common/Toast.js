import Toast from 'react-native-root-toast';


export const toast = (text = '') => Toast.show(text, {
    duration: Toast.durations.LONG,
    position: 50,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 100,
    onShow: () => {},
    onShown: () => {},
    onHide: () => {},
    onHidden: () => {}
});

setTimeout(function () {
    Toast.hide(toast);
}, 500);
