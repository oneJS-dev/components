//ONEJS Internal Imports
import {
    BaseComponent, Component, readFlavor, readIconGradient, positionContent, mergeStyles
} from '@onejs-dev/core';

//React Imports
import {
    ActivityIndicator as _RNActivityIndicator, Button as _RNButton, FlatList as _RNFlatList,
    Image as _RNImage, ImageBackground as _RNImageBackground,
    KeyboardAvoidingView as _RNKeyboardAvoidingView, Modal as _RNModal, Pressable as _RNPressable,
    RefreshControl as _RNRefreshControl, ScrollView as _RNScrollView, SectionList as _RNSectionList,
    StatusBar as _RNStatusBar, Switch as _RNSwitch, Text as _RNText, TextInput as _RNTextInput,
    TouchableHighlight as _RNTouchableHighlight, TouchableOpacity as _RNTouchableOpacity,
    TouchableWithoutFeedback as _RNTouchableWithoutFeedback, View as _RNView,
    VirtualizedList as _RNVirtualizedList, DrawerLayoutAndroid as _RNDrawerLayoutAndroid,
    TouchableNativeFeedback as _RNTouchableNativeFeedback,
    InputAccessoryView as _RNInputAccessoryView, SafeAreaView as _RNSafeAreaView,
    Platform, Animated, Easing
} from 'react-native';
import React from 'react';

//Gradient Imports
import {LinearGradient} from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {SvgXml} from 'react-native-svg';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'; //To be able to fetch Icon svg file

//External Component Imports
import DateTimePicker from '@react-native-community/datetimepicker';//https://github.com/react-native-datetimepicker/datetimepicker
import Slider from '@react-native-community/slider';
import ModalSelector from 'react-native-modal-selector'; //https://github.com/peacechen/react-native-modal-selector 
//There are other options for pickers:
//https://github.com/lawnstarter/react-native-picker-select (outdated)
//https://github.com/react-native-picker/picker (does not have a data property, needs indented tags)

//=============================================================================
// STANDARD COMPONENTS:
// React Native standard components to be used iOS and Android.
// Naming convention: Exact same name as in React Native.
// Remarks: 
//    'Text' is 'RNText'. oneJS provides a Text component with additional functionalities.
//    'View' is 'RNView'. oneJS provides a View component with additional functionalities.
//    'Animated.View' is 'AnimatedView' 
//=============================================================================

//React Native Components
export const RNActivityIndicator = BaseComponent('ActivityIndicator', false, _RNActivityIndicator);
export const RNButton = BaseComponent('Button', false, _RNButton);
export const RNFlatList = BaseComponent('FlatList', false, _RNFlatList);
export const RNImage = BaseComponent('Image', false, _RNImage);
export const RNImageBackground = BaseComponent('ImageBackground', true, _RNImageBackground);
export const RNKeyboardAvoidingView =
    BaseComponent('KeyboardAvoidingView', true, _RNKeyboardAvoidingView);
export const RNModal = BaseComponent('Modal', true, _RNModal);
export const RNPressable = BaseComponent('Pressable', true, _RNPressable);
export const RNRefreshControl = BaseComponent('RefreshControl', false, _RNRefreshControl);
export const RNScrollView = BaseComponent('ScrollView', true, _RNScrollView);
export const RNSectionList = BaseComponent('SectionList', false, _RNSectionList);
export const RNStatusBar = BaseComponent('StatusBar', false, _RNStatusBar);
export const RNSwitch = BaseComponent('Switch', false, _RNSwitch);
export const RNText = BaseComponent('_RNText', true, _RNText);
export const RNTextInput = BaseComponent('TextInput', false, _RNTextInput);
export const RNTouchableHighlight =
    BaseComponent('TouchableHighlight', true, _RNTouchableHighlight);
export const RNTouchableOpacity = BaseComponent('TouchableOpacity', true, _RNTouchableOpacity);
export const RNTouchableWithoutFeedback =
    BaseComponent('TouchableWithoutFeedback', true, _RNTouchableWithoutFeedback);
export const RNView = BaseComponent('_RNView', true, _RNView);
export const RNVirtualizedList = BaseComponent('VirtualizedList', false, _RNVirtualizedList);
export const RNDrawerLayoutAndroid =
    BaseComponent('DrawerLayoutAndroid', true, _RNDrawerLayoutAndroid);
export const RNTouchableNativeFeedback =
    BaseComponent('TouchableNativeFeedback', true, _RNTouchableNativeFeedback);
export const RNInputAccessoryView =
    BaseComponent('InputAccessoryView', true, _RNInputAccessoryView);
export const RNSafeAreaView = BaseComponent('SafeAreaView', true, _RNSafeAreaView);
export const RNAnimatedView = BaseComponent('Animated.View', true, Animated.View);

//External Compoenets
const ListPicker = BaseComponent('ModalSelector', false, ModalSelector);    //https://github.com/peacechen/react-native-modal-selector 
const DTPicker = BaseComponent('DateTimePicker', false, DateTimePicker);    //https://github.com/react-native-datetimepicker/datetimepicker
const SliderPicker = BaseComponent('Slider', false, Slider);                //https://github.com/callstack/react-native-slider/

//Gradient Components
const Gradient = BaseComponent('LinearGradient', true, LinearGradient);
const Masked = BaseComponent('MaskedView', true, MaskedView);
const Xml = BaseComponent('SvgXml', false, SvgXml);

//=============================================================================
// VIEW COMPONENT:
// View: Base component to organize content. Containes features that allow:
//    - Responsive animations when the following properties are modified: 
//      visible and active (current url matches target url).
//    - Intuitive positioning of the content.
//    - Declarative routing just by setting the url property.
//============================================================================= 

/**
* @typedef  {Object} Animation - The configuration for the animation to be executed on the component for the different property value changes.
* @property {Object} keyframes - An object specifying the different values for the style properties for each keyframe. The are two ways to define keyframes:
* ```javascript 
*   //Option A: Object of Arrays
*   const keyframesA = {opacity: [0, 1], scale: [0, 1]};
* 
*   //Option B: Array of objects
*   const keyframesB = [{opacity: 0, scale: 0}, {opacity: 1, scale: 1}];
* ```
* It is preferable to use option A mainly for two reasons: 1) It is more aligned with oneJS definitions. 2) It is less wordy. 
* In React Native transform options differ from Web. The following options are available:
* perspective, rotate, rotateX, rotateY, rotateZ, scale, scaleX, scaleY, translateX, translateY, skewX, skewY
* ```javascript 
*   //Transform on Web
*   const fadeOutLeftKeyframes = {opacity: [1,0], transform: ['translate3d(-100%, 0, 0)', 'none']};
* 
*   //Equivalent transformation on React Native
*   const fadeOutLeftKeyframes = {opacity: [1,0], transform: [{translateX: [0, -100]}]};
* ```
* @property {Object} options - A configuration object specifying the duration and the transition curve (easing).
* Duration: Specifies the duration of the animation in mililiseconds
* Easing: Represents the function that the animation follows to transition from one value to another. 
*   - Predefined animations: bounce, ease, elastic(),
*   - Standard functions: linear, quad, cubic,
*   - Additional functions: bezier(), circle, sin, exp,
* ```javascript 
*   //Options object
*   const options = {duration: 300, easing: Easing.ease};
* ```
* @example
* ```javascript 
*   //Fade Out animation
*   fadeOutAnimation = {keyframes: {opacity: [1, 0], display: ['flex', 'none']}, options: {duration: 300, easing: Easing.ease}};
* ```
*/
/** 
* @description A bundle of preset entry and exit animatios for the View component on property changes. These animations are defined following the RN Animations API.
* Reference: [React Native]{@link https://reactnative.dev/docs/animations}
* @example
* ```javascript 
*   const myView = View({animation: {visible: ['fade-in', 'shrink']}})(Text()('Hello World!'));
* ```
*/
const animations = {
    'none': {keyframes: {}, options: {duration: 0}},
    'appear': {style: {display: 'flex'}},
    'disappear': {style: {display: 'none'}},
    'fade-in': {
        keyframes: {opacity: [0, 1]},
        options: {duration: 300, easing: Easing.ease}
    },
    'fade-in-left': {
        keyframes: {opacity: [0, 1], transform: [{translateX: [-100, 0]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'fade-in-right': {
        keyframes: {opacity: [0, 1], transform: [{translateX: [100, 0]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'fade-out': {
        keyframes: {opacity: [1, 0], display: ['flex', 'none']},
        options: {duration: 300, easing: Easing.ease}
    },
    'fade-out-left': {
        keyframes: {opacity: [1, 0], transform: [{translateX: [0, -100]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'fade-out-right': {
        keyframes: {opacity: [1, 0], transform: [{translateX: [0, 100]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'slide-in-left': {
        keyframes: {transform: [{translateX: [-100, 0]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'slide-in-right': {
        keyframes: {transform: [{translateX: [100, 0]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'slide-in-up': {
        keyframes: {transform: [{translateY: [-100, 0]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'slide-in-down': {
        keyframes: {transform: [{translateY: [100, 0]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'slide-out-left': {
        keyframes: {transform: [{translateX: [0, -100]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'slide-out-right': {
        keyframes: {transform: [{translateX: [0, 100]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'slide-out-up': {
        keyframes: {transform: [{translateY: [0, -100]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'slide-out-down': {
        keyframes: {transform: [{translateY: [0, 100]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'expand': {
        keyframes: {transform: [{scale: [0, 1]}]},
        options: {duration: 300, easing: Easing.bounce}
    },
    'shrink': {
        keyframes: {transform: [{scale: [1, 0]}]},
        options: {duration: 300, easing: Easing.bounce}
    },
    'vertical-expand': {
        keyframes: {transform: [{scaleY: [0, 1]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'vertical-shrink': {
        keyframes: {transform: [{scaleY: [1, 0]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'horizontal-expand': {
        keyframes: {transform: [{scaleX: [0, 1]}]},
        options: {duration: 300, easing: Easing.ease}
    },
    'horizontal-shrink': {
        keyframes: {transform: [{scaleX: [1, 0]}]},
        options: {duration: 300, easing: Easing.ease}
    },
};

/** 
* @description Whenever a property that is being observed changes in the View component, the animate function is called. Based on the animation
* provided, the target component is animated.
* Animations work different on React Native than on the web:
*   - On the web by calling animate the API automatically interpolates the styles of the component following the keyframes and easing curve.
*   - On native, when the animation starts, it provides a value that is being interpolated from 0 (start) to 1 (end). This value is then used to interpolate
*     the style values and apply them to the target component.
* @param {Array<String> | Array<Animation> | Map} animation - The animation to be executed on the component for the different property value changes. If defined
* as an array, the first value is the animation for the property turning true, while the second is the animation for the property turning false. 
* Each of the individual animation can be defined as string, if one of the preset animations is to be used, or an object following the Animation structure.
* The animation can also be a Map object, relating the property values to the different animations.
* ```javascript 
*   const myAnimation = Map();
*   myAnimation.setValue(1, 'fade-in'); //Fades in when the property turns 1
*   myAnimation.setValue(5, 'shrink');  //Shrinks when the property turns 5
* ```
* @param {String} property - The property changed triggering the animation.
* @param {String} animationValue - The property changed triggering the animation.
* @param {String} setSelectedKeyframes - The property changed triggering the animation.
* @param {String} isVisible - The property changed triggering the animation.
* @param {String} setIsVisible - The property changed triggering the animation.
* @param {*} newValue - The property's new value.
* @example
* ```javascript 
*   animate(['fade-in', 'shrink'], 'visible')(false, myComponent);
* ```
*/
const animate = (animation, property, animationValue, setSelectedKeyframes, isVisible,
    setIsVisible) => (newValue) => {
        let selectedAnimation = {}; //Default for visible 

        //Check the animation is formated correctly
        if(Array.isArray(animation)) {
            try {selectedAnimation = newValue ? animation[0] : animation[1];}
            catch(error) {
                console.error("[oneJS]: animation should be in this format: ['in-animation', 'out-animation']");
                return;
            }
        }
        else if(animation && typeof animation === 'object') {
            try {selectedAnimation = animation instanceof Map ? animation[newValue] : undefined;}
            catch(error) {console.error('No animation set for ' + newValue); return;}
        }
        else {console.error('[oneJS]: animation should be an Array or Map: ' + animation); return;}

        //Setup selected animation for string (take it from the predesigned animations)
        if(typeof selectedAnimation === 'string') {
            selectedAnimation = animations[selectedAnimation];
            if(!selectedAnimation) {console.warn('No such animation: ' + selectedAnimation); return;}
        }

        //Generate animation
        if(property === 'visible' && newValue) setIsVisible(true);      //To display in animation
        if(property === 'visible' && !newValue && !isVisible) return;   //To avoid initial out animation and flickering
        setSelectedKeyframes(selectedAnimation.keyframes);              //The keyframes that will be used for the interpolation
        animationValue.setValue(0);                                      //Animation is set to always flow from 0 to 1
        let options = {toValue: 1, useNativeDriver: true, ...selectedAnimation.options};
        let completedCallback = (property, newValue) => ({result}) => {
            if(property === 'visible' && !newValue) setIsVisible(false); //To hide element after out animation
        };
        Animated.timing(animationValue, options).start(completedCallback(property, newValue));
    };

/** 
* @description Generates the style interpolated according the animation frames and value.
* @param {Number} animationValue - The value that determines the point in the interpolation. Goes from 0 (start) to 1 (end).
* @param {Object} keyframes - Contains the styles to be interpolated.
* @example
* ```javascript
*   getAnimationStyle(0.5, {opacity: [0, 1], height: [10, 30]}); //Output: {opacity: 0.5, height: 20}
* ```
* @returns {Object} - The result of interpolating the styles in the keyframes according to the animation value.
*/
const getAnimationStyle = (animationValue, keyframes) => {
    if(!keyframes) return {};
    let animationStyle = {};
    Object.entries(keyframes).forEach(([key, value]) => {
        if(typeof value[0] === 'number')
            animationStyle[key] = animationValue.interpolate({
                inputRange: [0, 1], outputRange: value
            });
        else if(typeof value[0] === 'object') {//Required for transform property (array of objects)
            animationStyle[key] = [];
            value.forEach((item, index) => {
                Object.entries(item).forEach(([subkey, subvalue]) => {
                    animationStyle[key][index] = {
                        [subkey]: animationValue.interpolate({
                            inputRange: [0, 1], outputRange: subvalue
                        })
                    };
                });
            });
        }
    });
    return animationStyle;
};

/**
* @typedef  {Object}  Url - The configuration structure required by urlSetup function. It enables displaying or hiding the View based on the url, adding an
* 'active' attribute or making it clickable redirecting the user to the chosen url.
* Principles: All url-s must start with '/' because all url-s are absolute.
* Naming: '*' represents any value for a given segment. At the end of the url, e.g.'/path/to/end/*' means any number of segments after
* Note: The page root has a url '/'. This can only be matched by target url '/' or '* /'
* Note: Actual url ignores anchors (root/home/#anchor/path === root/home)
* ```javascript
* @example
*   //Actual Url = '/path/to/page'
*   matchUrl('/* /* /page') //Matches
*   matchUrl('/* /to')      //Does not match
*   matchUrl('/* /to/*')    //Matches
* @property {String}  [visible]             - The url for the component to be visible.
* @property {String}  [active]              - The url for the component to be active.
* @property {String}  [link]                - The url to be redirected to when clicking the component.
* @example
* ```javascript 
*   const myUrl = {visible: '/*', active: '/home/*', link: '/home'}
* ```
*/
/** 
* @description A powerful component that acts as a container for other base components. It behaves like React Native view block with some additional features such as
* routing, positioning, animations and lifecycle events.
* @param {Boolean} visible - Determines whether the View is visible on the screen or not.
* @param {Function} onVisibleChange - The function called when the 'visible' property is modified due to url changes. 
* It can be used to update the 'visible' state variable.
* @param {Boolean} active - Determines whether the View is active or not. Being active means that the current url matches the target url of this component.
* @param {Function} onActiveChange - The function called when the 'active' property is modified due to url changes. 
* It can be used to update the 'active' state variable.
* @param {Content} content - The configuration specifying the positioning of the component's content.
* @param {Object} self - The configuration specifying the positioning of the component itself with respect to its siblings.
*   - expand: Ability for a flex component to grow if there is extra space (0 CSS default). The greater the number, the greater the expansion 
*             with respect to other sibling components able to expand. 0 means the component is unable to expand.
*   - shrink: Ability for a flex component to shrink if there is not enough space (1 CSS default). The greater the number, the greater the shrinkage 
*             with respect to other sibling components able to shrink. 0 means the component is unable to shrink.
*   - align:  It allows to override the transversal (perpendicular to the content direction) positioning set by the parent with the 'content' property.
*             E.g. If the parent sets the content to be aligned in a row on top, with the self property child element can override this behaviour.
* @param {Array<String> | Array<Object> | Map} animation - The animation to be executed on the component for the different property value changes.
* @param {Url} [url] - The configuration structure required to make routing possible. It enables displaying or hiding the View based on the url, adding an
* 'active' attribute or making it clickable redirecting the user to the chosen url.
*       - Active: Determines when the active attribute is set.
*       - Visible: Determines when the visible attribute is set and therefore displayed on the screen.
*       - Link: Determines the url where the app is routed to when the element is clicked.
*       - Example: view({url: {visible: '/* /* /events', active: '/* /* /events'}})('content')
* @param {Component} [structure] - The component structure to be rendered inside the view.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables. For view the default flavor is not inherited.
* @example
* ```javascript 
*   View({visible: read('isVisible'), onVisibleChange: update('isVisible'), url: {visible: '/home1', link: 'home2'}, content: {v: 'top', h: 'left'}, expand: 1})('hello world');
* ```
* @returns {ReactElement} - The element corresponding to the View.
*/
export const View = Component('View', true, ({visible = true, content = {h: 'left', v: 'top'}, self,
    animation, url, flavor, ...attributes} = {}) => structure => {
        //Animations module
        let animationValue;                  //The animation value being interpolated. Being a useRef object persists its value even if the function is called with different parameters.
        let selectedKeyframes;              //State variable that stores the keyframes used during the animation. This allows animation to be changed as an input parameter.
        let setSelectedKeyframes;            //Sets selectedKeyframes value.
        let isVisible;                      //State variable that stores whether the component is visible or is hidden due to the animation.
        let setIsVisible;                   //Sets isVisible value.
        let animationStyle = {};             //The style computed as an interpolation from the keyframes and the animationValue.
        let internalOnPropertyChange = {};   //An object with the animate functions to be called for the selected properties in the animation configuration.
        let exeternalOnPropertyChange;      //An object with the onPropertyChange attribute set by the user during instantiation.
        let finalOnPropertyChange;          //The result of combining internalOnPropertyChange and externalOnPropertyChange

        if(animation) {
            animationValue = React.useRef(new Animated.Value(0)).current;
            [selectedKeyframes, setSelectedKeyframes] = React.useState({});
            [isVisible, setIsVisible] = React.useState(false);

            animationStyle = getAnimationStyle(animationValue, selectedKeyframes);

            internalOnPropertyChange = {};
            if(animation && typeof animation === 'object') {
                Object.entries(animation).forEach(([property, value]) => {
                    if(value) internalOnPropertyChange[property] = animate(value, property,
                        animationValue, setSelectedKeyframes, isVisible, setIsVisible);
                });
            }
            exeternalOnPropertyChange = attributes['onPropertyChange'];
            finalOnPropertyChange = exeternalOnPropertyChange ? {
                ...internalOnPropertyChange, ...exeternalOnPropertyChange
            } : internalOnPropertyChange;//Compose internal and external onPropertyChange
            delete attributes['onPropertyChange'];
        }

        //Final Style
        const externalDisplay = attributes['style']?.display ?? 'flex';
        let contentStyle = {};
        let selfStyle = {};
        if(externalDisplay === 'flex') { //Only for 'flex' display property
            contentStyle = {
                display: visible ? 'flex' : 'none',
                ...positionContent(content)
            };
            selfStyle = {
                display: visible ? 'flex' : 'none',
                flexGrow: self?.expand ?? 0,              //Ability for a flex item to grow if there is too much space (0 CSS default).
                flexShrink: self?.shrink ?? 1,            //Ability for a flex item to shrink if there is not enough space (1 CSS default).  
                // alignSelf: self?.align ?? 'auto',         //Transversal positioning of the item overriding parents content positioning.
            };
        }
        const outerStyle = {//Outer style. When there is a gradient it is applied to the Gradient itself.
            borderWidth: flavor?.borderWidth ?? 0,
            borderStyle: flavor?.borderStyle ?? 'solid',
            borderColor: flavor?.borderColor ?? 'transparent',
            borderRadius: flavor?.radius ?? 0,
            ...flavor?.shadow ?? 0,
            ...selfStyle
        };
        const innerStyle = {//Inner style for the View
            backgroundColor: flavor?.backgroundGradient ?
                'transparent' : (flavor?.backgroundColor ?? 'transparent'),
            borderRadius: flavor?.radius ?? 0,
            ...contentStyle,
            ...animationStyle
        };
        attributes['style'] = flavor?.backgroundGradient ?
            mergeStyles(innerStyle, attributes['style']) :
            mergeStyles(innerStyle, outerStyle, attributes['style']);

        //Final Structure
        let finalStructure;

        if(animation) {//In case of animation
            if(animation.visible) finalStructure = RNAnimatedView({
                visible: visible, onPropertyChange: finalOnPropertyChange, ...attributes
            })(isVisible ? structure : null);
            else finalStructure = RNAnimatedView({
                visible: visible, onPropertyChange: finalOnPropertyChange, ...attributes
            })(visible ? structure : null);
        }
        else finalStructure = RNView({visible: visible, ...attributes})(visible ? structure : null);

        if(flavor?.backgroundGradient) finalStructure = Gradient({
            ...flavor.backgroundGradient, style: outerStyle
        })(finalStructure);//In case of backgroundGradient
        if(url) finalStructure = RNTouchableOpacity({url: url})(finalStructure);//In case of url links

        return finalStructure;
    });

//=============================================================================
// CUSTOM COMPONENTS:
// Provides reusable components similar to native components. Consists of the 
// following components:
// Text: All the text inside of 'View'-s should be wrapped inside 'Text' component.
//       Gradient texts are supported.
// Input: Consolidates the different HTML types of inputs, including: textarea, 
//        select (optgroup and option) and range.
// Icon: Displays and icon from the svg gallery.
//       Gradient icons are supported.
// Modal: Base component to display overlaying content.
// Slider: Creates stacked views that allow the user to slide across the component's
//         children.
//============================================================================= 


/** 
* @description Standard text component to wrap all the texts in the application. It enables creating gradient texts setting textGradient theme variable.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @param {Component} [structure] - The component structure to be rendered inside the slider.
* @example
* ```javascript 
*   const myText = Text({flavor: {textGradient: generateGradient({colors: ['red', 'blue']})}})('Hello World!');
* ```
* @returns {ReactElement} - The element corresponding to the Text.
*/
export const Text = ({flavor = readFlavor('default'), ...attributes} = {}) => structure => {
    const flavorStyle = {
        color: flavor?.textGradient ? 'transparent' : (flavor?.textColor ?? '#333'),
        fontSize: flavor?.textSize ?? 16,
        fontFamily: flavor?.textFamily ?? undefined,
        fontWeight: flavor?.textWeight ?? 'normal',
        // textAlign: 'center', //default is 'auto'
        // textAlignVertical: 'center', //default is 'auto'
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        // lineHeight: 1.5
    };
    attributes['style'] = mergeStyles(flavorStyle, attributes['style']);
    if(!flavor?.textGradient) return RNText(attributes)(structure);
    const textMaskStyle = mergeStyles(attributes['style'], {
        backgroundColor: 'transparent', color: 'black'
    });
    return Masked({
        style: {flexDirection: 'row'}, maskElement: RNText({
            ...attributes, ...{style: textMaskStyle}
        })(structure)
    })(Gradient({...flavor.textGradient, style: {flex: 0, flexWrap: 'wrap'}})(
        RNText(attributes)(structure)));
};

/** 
* @description Wrapper component for all the different types of inputs. It allows to work seamlessly with the different types of inputs and 
* react to the change events. It also provides styling options through the use of flavors.
* Web input types: 
*   'button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 
*   'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'
* Native input types:
*   - Touchable Opacity: 'button'                                                        [React Native]{@link https://reactnative.dev/docs/touchableopacity}
*   - Switch:            'checkbox'                                                      [React Native]{@link https://reactnative.dev/docs/switch}
*   - Text Input:        'email', 'number', 'password', 'tel', 'text', 'textarea', 'url' [React Native]{@link https://reactnative.dev/docs/textinput}
*   - Slider:            'range'                                                         [Github]{@link https://github.com/callstack/react-native-slider/tree/main/src}
*   - Modal Selector:    'list'                                                          [Github]{@link https://github.com/peacechen/react-native-modal-selector }
*   - Datetime Picker:   'date', 'time', 'datetime'                                      [Github]{@link https://github.com/react-native-datetimepicker/datetimepicker}
* Change events: Whenever a form field is changed, the event is fired. Works the same as web's 'onInput' event. On oneJS always use 'onChange' for a consisten behavior.
*   - TextInput: 
*       - onChange: Invoked when the user changes the value of the text input.Receives the change event as an argument.
*       - onChangeText: Invoked when the user changes the value of the text input.Receives the change value as an argument.
*   - Switch: 
*       - onChange: Invoked when the user changes the value of the switch input.Receives the change event as an argument.
*       - onValueChange: Invoked when the user changes the value of the switch input.Receives the change value as an argument.
* Content types for TextInput in iOS and Android:
*   - Android: 'autoComplete' specifies autocomplete hints for the system, so it can provide autofill. [React Native]{@link https://reactnative.dev/docs/textinput#autocomplete-android}
*   - iOS: 'textContentType' specifies autocomplete hints for the system, so it can provide autofill. [React Native]{@link https://reactnative.dev/docs/textinput#textcontenttype-ios}
* @param {String} [type] - The type of input, any of the standard html input types plus 'range', 'list' and 'textarea'.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @example
* ```javascript 
*   const myInput = Input({type: 'list', options: [{value: 'vol', label: 'Volvo'}, {value: 'mer', label: 'Mercedes'}], flavor: 'danger'})
* ```
* @returns {ReactElement} - The element corresponding to the input.
*/
export const Input = ({type, options, title, titleStyle, icon, iconStyle, content,
    flavor = readFlavor('default'), ...attributes} = {}) => {
    //Set a consistent behaviour for onChange attribute
    if(attributes['onChange']) {
        if(type === 'checkbox' || type === 'switch' || type === 'range' || type === 'date' ||
            type === 'time' || type === 'datetime') {//Non-TextInputs
            attributes['onValueChange'] = attributes['onChange'];
        }
        else if(type === 'list') {
            //onChange event returns options object: {key: 'value1', label: 'label1'}. To make it consistent with web only keys are returned
            const onListChange = (onChange) => (options) => {onChange(options.key);};
            attributes['onListChange'] = onListChange(attributes['onChange']);
        }
        else {//TextInput
            attributes['onChangeText'] = attributes['onChange'];
        }
        delete attributes['onChange'];
    }
    //Setup text input style
    if(!type || type === 'text' || type === 'number' || type === 'email' || type === 'url' ||
        type === 'tel' || type === 'password' || type === 'new-password' || type === 'textarea' ||
        type === 'list' || type === 'button') {
        const textInputStyle = {
            color: flavor?.textColor ?? '#666',
            fontSize: flavor?.textSize ?? 16,
            fontFamily: flavor?.textFamily ?? undefined,
            fontWeight: flavor?.textWeight ?? 'normal',
            backgroundColor: flavor?.backgroundColor ?? 'white',
            borderWidth: flavor?.borderWidth ?? 1,
            borderStyle: flavor?.borderStyle ?? 'solid',
            borderColor: flavor?.borderColor ?? '#ccc',
            borderRadius: flavor?.radius ?? 0,
            minHeight: 50,
            minWidth: (type === 'button' || type === 'submit' || type === 'reset') ? 0 : 200,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 15,
            paddingRight: 15,
            ...flavor?.shadow ?? 0
        };
        attributes['style'] = mergeStyles(textInputStyle, attributes['style']);
    }
    if(!type || type === 'text') {//Regular TextInput
        return RNTextInput(attributes);
    }
    //Standard RN RNTextInput-s
    else if(type === 'number') return RNTextInput({
        keyboardType: 'numeric', textContentType: 'newPassword', ...attributes
    });
    else if(type === 'email') return RNTextInput({
        keyboardType: 'email-address', autoComplete: 'email', textContentType: 'emailAddress',
        ...attributes
    });
    else if(type === 'url') return RNTextInput({
        keyboardType: 'url', textContentType: 'URL', ...attributes
    });
    else if(type === 'tel') return RNTextInput({
        keyboardType: 'phone-pad', autoComplete: 'tel', textContentType: 'telephoneNumber',
        ...attributes
    });
    /*(ios only) paswordRules: 
        When using textContentType as newPassword on iOS we can let the OS know the minimum requirements of the 
        password so that it can generate one that will satisfy them.
    */
    else if(type === 'password') return RNTextInput({
        autoComplete: 'password', textContentType: 'password', secureTextEntry: true, ...attributes
    });
    else if(type === 'new-password') return RNTextInput({
        autoComplete: 'password-new', textContentType: 'newPassword', secureTextEntry: true,
        ...attributes
    });//TODO: Insert validations

    /*
    RN multiline: It is important to note that this aligns the text to the top on iOS, and centers it on Android. 
    Use with textAlignVertical set to 'top' for the same behavior in both platforms.
    (android only) numberOfLines: Sets the number of lines for a TextInput
    */
    else if(type === 'textarea') {
        let textAreaStyle = {textAlignVertical: 'top'};
        if(attributes['style'] == null) attributes['style'] = textAreaStyle;
        else if(Array.isArray(attributes['style'])) attributes['style'].unshift(textAreaStyle);
        else if(typeof attributes['style'] === 'object') attributes['style'] = {
            ...textAreaStyle, ...attributes['style']
        };
        return RNTextInput({
            multiline: true, numberOfLines: (attributes['numberOfLines'] ?
                attributes['numberOfLines'] : 5), ...attributes
        });
    }

    //Button Input: It can use same properties as View
    else if(type === 'button') {
        content = content ?? {h: 'center', v: 'center', direction: 'row', gap: 10, wrap: false};//Positions Title and Icon
        const url = attributes['url']; delete attributes['url'];
        const onPress = attributes['onPress'] ?? (attributes['onClick'] ?? undefined);
        if(flavor?.backgroundGradient) delete attributes['style'].backgroundColor;
        return RNTouchableOpacity({onPress: onPress, url: url})(
            View({content: content, flavor: flavor, ...attributes})([
                (icon) && Icon({icon: icon, style: iconStyle, flavor: flavor}),
                Text({style: titleStyle, flavor: flavor})(title)
            ]));
        //Note: elevation/shadow does not work well with TouchableOpacity, opacity is inconsistent when pressed 
    }

    /*
    Checkbox uses RN Switch:
    <Switch trackColor={{ false: 'grey', true: 'blue' }} thumbColor={isEnabled ? 'yellow' : "white"} ios_backgroundColor='black' onValueChange={toggleSwitch} value={isEnabled}/>
    */
    else if(type === 'checkbox' || type === 'switch') {
        let trackColor = {
            'false': flavor?.neutralColor ?? '#ccc', 'true': flavor?.primaryColor ?? 'blue'
        };
        let ios_backgroundColor = flavor?.neutralColor ?? '#ccc'; //Equivalent to 'false' trackColor
        let thumbColor = 'white';
        return RNSwitch({
            trackColor: trackColor, ios_backgroundColor: ios_backgroundColor,
            thumbColor: thumbColor, ...attributes
        });
    }

    /*
    Slider: https://github.com/callstack/react-native-slider/
    onValueChange: Callback continuously called while the user is dragging the slider. No 'onChange' callback.
    JSX Example:
        <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
        />
    */
    else if(type === 'range') {
        if(attributes['min']) {
            attributes['minimumValue'] = attributes['min'];
            delete attributes['min'];
        }
        if(attributes['max']) {
            attributes['maximumValue'] = attributes['max'];
            delete attributes['max'];
        }
        minimumTrackTintColor = flavor?.primaryColor ?? 'blue';
        maximumTrackTintColor = flavor?.neutralColor ?? "#666";
        thumbTintColor = 'white';
        attributes['style'] = mergeStyles({minWidth: 200}, attributes['style']);
        return SliderPicker({
            minimumTrackTintColor: minimumTrackTintColor,
            maximumTrackTintColor: maximumTrackTintColor,
            thumbTintColor: thumbTintColor, ...attributes
        });
    }

    /*Modal Selector: https://github.com/peacechen/react-native-modal-selector 
    Each item in the items array should be in the following format:  {label: 'Orange', key: 'orange'}

    Unwrapped usage:
    <ModalSelector  data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />

    Wrapped usage:
    <ModalSelector  data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{alert(`${option.label} (${option.key}) nom nom nom`)}} >
        <TextInput editable={false} placeholder="Select something yummy!" value={this.state.textInputValue} />
    </ModalSelector>

    Useful properties: data, onChange, onModalOpen, onModalClose, visible, closeOnChange, initValue, cancelText, disabled, listType, animationType, styling options...
    */
    else if(type === 'list') {
        //Style
        const textStyle = {
            color: flavor?.textColor ?? '#666',
            fontSize: flavor?.textSize ?? 16,
            fontFamily: flavor?.textFamily ?? undefined,
            fontWeight: flavor?.textWeight ?? 'normal',
        };
        const selectStyle = {paddingTop: 12, borderWidth: 0, borderColor: 'transparent'};
        const selectTextStyle = textStyle;
        const selectedItemTextStyle = {...textStyle, color: flavor?.primaryColor ?? 'blue'};
        const optionTextStyle = textStyle;
        const initValueTextStyle = textStyle;
        const cancelStyle = {backgroundColor: flavor?.dangerColor ?? 'red'};
        const cancelTextStyle = {...textStyle, color: 'white'};

        const value = attributes['value']; delete attributes['value'];
        //const cancelText = 'Cancel'; //Text for the cancel button

        //Modal Selector does not implement onBlur and onFocus methods. The closest event functions are onModalOpen and onModalClose
        if(attributes['onFocus']) {
            attributes['onModalOpen'] = attributes['onFocus']; delete attributes['onFocus'];
        }
        if(attributes['onBlur']) {
            attributes['onModalClose'] = attributes['onBlur']; delete attributes['onBlur'];
        }

        //onChange event returns options object: {key: 'value1', label: 'label1'}. To make it consistent with web only keys are returned
        if(attributes['onListChange']) {
            attributes['onChange'] = attributes['onListChange']; delete attributes['onListChange'];
        }

        if(options) {
            //options (array): ['Volvo', 'Mercedes', 'Rolex', 'Cartier'];                           //For simple scenarios    
            //options (array): [{value: 'vol', label: 'Volvo'}, {value: 'mer', label: 'Mercedes'}]; //This is the standard definition 
            attributes['data'] = options.map(item => {
                return {
                    key: (typeof item === 'string') ? item : item.value,
                    label: (typeof item === 'string') ? item : item.label
                };
            });
        }
        return ListPicker({
            selectedKey: value, backdropPressToClose: true, selectStyle: selectStyle,
            selectTextStyle: selectTextStyle, selectedItemTextStyle: selectedItemTextStyle,
            optionTextStyle: optionTextStyle, initValueTextStyle: initValueTextStyle,
            cancelStyle: cancelStyle, cancelTextStyle: cancelTextStyle, ...attributes
        });
    }

    /*
    DateTimePicker: https://github.com/react-native-datetimepicker/datetimepicker
    mode: "date" (default for iOS and Android and Windows), "time", "datetime" (iOS only), "countdown" (iOS only)
    onChange: Date change handler. This is called when the user changes the date or time in the UI. It receives the event and the date as parameters
    maximumDate: Defines the maximum date that can be selected. Note that on Android, this only works for date mode because TimePicker does not support this.
    minimumDate: Defines the minimum date that can be selected. Note that on Android, this only works for date mode because TimePicker does not support this.
    */
    else if(type === 'date') return DTPicker({mode: 'date', ...attributes});
    else if(type === 'time') return DTPicker({mode: 'time', ...attributes});
    else if(type === 'datetime') return DTPicker({mode: 'datetime', ...attributes});
    //@TODO: else if(type === 'image')
    //@TODO else if(type === 'file')
};

/** 
* @description Icon component for SVG icons. It enables using icons from the oneJS icon gallery or your own SVG icons. If you choose to use your own icons, there are
* three options: 
*   - Use webpack to import the raw SVG. [Pluralsight]{@link https://www.pluralsight.com/guides/how-to-load-svg-with-react-and-webpack}
*   - Create a .js file exporting the raw SVG as a string. Example: export myIconFont = {icon1: <svg>...</svg>, icon2: <svg>...</svg>}
*   - Use require() to fetch the icon. This option may delay the loading of the icon after the first paint.
* Useful icon fonts:
* [Google]{@link https://fonts.google.com/icons?selected=Material+Icons}
* [FontAwesome]{@link https://fontawesome.com/icons}
* [The Noun Project]{@link https://thenounproject.com}
* @param {String} [icon] - The name of the icon to be selected from the iconFont object.
* @param {Object} [iconFont] - An object containing the different icon names as property keys whose value is the raw SVG in a string.
* @param {Object} [iconFile] - The path to the .svg icon to be loaded using the 'require' function.
* @param {Boolean} [raised] - If true, adds background to the icon simulating a raised button.
* @param {String | Number} [size] - Adjusts the size of the icon. For strings, 'large', 'medium' and 'small' options are available. Numbers represent the pixel size of the icon
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @example
* ```javascript 
*   import {myIconFont} from './myIconFont.js'; //Using external icon font as a JS object. 'icon2' in the example below
*   
*   const icon1 = Icon({iconFile: require('./path/to/icon/icon.svg'), raised: true, size: 'small'});
*   const icon2 = Icon({icon: 'icon2', iconFont: myIconFont, size: 40});
*   const icon3 = Icon({icon: 'oneJS', flavor: 'danger'});
* ```
* @returns {ReactElement} - The element corresponding to the Icon.
*/
export const Icon = Component('Icon', false, ({icon, size = 32, raised,
    flavor = readFlavor('default'), ...attributes} = {}) => {
    if(!icon) return null;
    size = flavor?.iconSize ?? size === 'large' ? 64 : size === 'small' ? 16 : size;
    let padding = Math.floor(parseInt(size) / 4);
    const gradient = flavor?.primaryGradient ? readIconGradient(flavor?.primaryGradient) : null;
    const iconStyle = {
        width: size,
        height: size,
        fill: gradient ? 'url(#' + gradient.id + ')' : flavor.primaryColor ?? 'blue',
        backgroundColor: 'transparent'
    };
    const backgroundStyle = {
        minWidth: size + padding * 2,
        minHeight: size + padding * 2,
        width: size + padding * 2,
        height: size + padding * 2
    };
    attributes['style'] = mergeStyles(backgroundStyle, attributes['style']);

    const iconWithGradient = gradient ? icon.replace('</svg>', (gradient.value + '</svg>')) : icon;
    return View({
        content: {h: 'center', v: 'center', wrap: false}, flavor: raised ? flavor : undefined,
        ...attributes
    })(Xml({xml: iconWithGradient, style: iconStyle}));
});