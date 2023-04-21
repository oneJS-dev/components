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
    Platform, Animated, Easing, Dimensions, PanResponder
} from 'react-native';
import React from 'react';

//Gradient Imports
import {LinearGradient} from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {SvgXml} from 'react-native-svg';

//External Component Imports
import DateTimePicker from '@react-native-community/datetimepicker';
//https://github.com/react-native-datetimepicker/datetimepicker

import Slider from '@react-native-community/slider';
import ModalSelector from 'react-native-modal-selector';
//https://github.com/peacechen/react-native-modal-selector 

//There are other options for pickers:
//https://github.com/lawnstarter/react-native-picker-select (outdated)
//https://github.com/react-native-picker/picker (does not have a data property, needs indented tags)

//==================================================================================================
// STANDARD COMPONENTS:
// React Native standard components to be used iOS and Android.
// Naming convention: Exact same name as in React Native.
// Remarks: 
//    'Text' is 'RNText'. oneJS provides a Text component with additional functionalities.
//    'View' is 'RNView'. oneJS provides a View component with additional functionalities.
//    'Animated.View' is 'AnimatedView' 
//==================================================================================================

//React Native Components
export const RNActivityIndicator = BaseComponent('ActivityIndicator', false, _RNActivityIndicator);
export const RNButton = BaseComponent('Button', false, _RNButton);
export const RNFlatList = BaseComponent('FlatList', false, _RNFlatList);
export const RNImage = BaseComponent('Image', false, _RNImage);
export const RNImageBackground = BaseComponent('ImageBackground', true, _RNImageBackground);
export const RNKeyboardAvoidingView =
    BaseComponent('KeyboardAvoidingView', true, _RNKeyboardAvoidingView);
export const RNModal = BaseComponent('RNModal', true, _RNModal);
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
const ListPicker = BaseComponent('ModalSelector', false, ModalSelector);
//https://github.com/peacechen/react-native-modal-selector 

const DTPicker = BaseComponent('DateTimePicker', false, DateTimePicker);
//https://github.com/react-native-datetimepicker/datetimepicker

const SliderPicker = BaseComponent('Slider', false, Slider);
//https://github.com/callstack/react-native-slider/

//Gradient Components
const Gradient = BaseComponent('LinearGradient', true, LinearGradient);
const Masked = BaseComponent('MaskedView', true, MaskedView);
const Xml = BaseComponent('SvgXml', false, SvgXml);

//==================================================================================================
// VIEW COMPONENT:
// View: Base component to organize content. Contains features that allow:
//    - Responsive animations when the following properties are modified: 
//      visible and active (current url matches target url).
//    - Intuitive positioning of the content.
//    - Declarative routing just by setting the url property.
//================================================================================================== 

/**
* @typedef  {Object} Animation - The configuration for the animation to be executed on the component
* for the different property value changes.
* @property {Object} keyframes - An object specifying the different values for the style properties 
* for each keyframe. The are two ways to define keyframes:
* ```javascript 
*   //Option A: Object of Arrays
*   const keyframesA = {opacity: [0, 1], scale: [0, 1]};
* 
*   //Option B: Array of objects
*   const keyframesB = [{opacity: 0, scale: 0}, {opacity: 1, scale: 1}];
* ```
* It is preferable to use option A mainly for two reasons: 1) It is more aligned with oneJS 
* definitions. 2) It is less wordy. 
* In React Native transform options differ from Web. The following options are available:
* perspective, rotate, rotateX, rotateY, rotateZ, scale, scaleX, scaleY, translateX, translateY, 
* skewX, skewY
* ```javascript 
*   //Transform on Web
*   const fadeOutLeftKeyframes = {opacity: [1,0], transform: ['translate3d(-100%, 0, 0)', 'none']};
* 
*   //Equivalent transformation on React Native
*   const fadeOutLeftKeyframes = {opacity: [1,0], transform: [{translateX: [0, -100]}]};
* ```
* @property {Object} options - A configuration object specifying the duration and the transition 
* curve (easing).
* Duration: Specifies the duration of the animation in milliseconds
* Easing: Represents the function that the animation follows to transition from one value to
*         another. 
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
*   fadeOutAnimation = {
*       keyframes: {opacity: [1, 0], display: ['flex', 'none']}, 
*       options: {duration: 300, easing: Easing.ease}
*   };
* ```
*/
/** 
* @description A bundle of preset entry and exit animatios for the View component on property 
* changes. These animations are defined following the RN Animations API.
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
* @description Whenever a property that is being observed changes in the View component, the animate
*  function is called. Based on the animation provided, the target component is animated.
* Animations work different on React Native than on the web:
*   - On the web by calling animate the API automatically interpolates the styles of the component 
*     following the keyframes and easing curve.
*   - On native, when the animation starts, it provides a value that is being interpolated from 0 
*     (start) to 1 (end). This value is then used to interpolate the style values and apply them to
*     the target component.
* @param {Array<String> | Array<Animation> | Map} animation - The animation to be executed on the 
* component for the different property value changes. If defined as an array, the first value is the
* animation for the property turning true, while the second is the animation for the property 
* turning false. 
* Each of the individual animation can be defined as string, if one of the preset animations is to 
* be used, or an object following the Animation structure.
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
                console.error("[oneJS]: animation should be in this format: " +
                    "['in-animation', 'out-animation']");
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
            if(!selectedAnimation) {
                console.warn('No such animation: ' + selectedAnimation);
                return;
            }
        }

        //Generate animation
        if(property === 'visible' && newValue) setIsVisible(true);      //To display in animation
        if(property === 'visible' && !newValue && !isVisible) return;   //To avoid initial out animation and flickering
        setSelectedKeyframes(selectedAnimation.keyframes);              //The keyframes that will be used for the interpolation
        animationValue.setValue(0);                                     //Animation is set to always flow from 0 to 1
        let options = {toValue: 1, useNativeDriver: true, ...selectedAnimation.options};
        let completedCallback = (property, newValue) => ({result}) => {

            if(property === 'visible' && !newValue) setIsVisible(false); //To hide element after out animation
        };
        Animated.timing(animationValue, options).start(completedCallback(property, newValue));
    };

/** 
* @description Generates the style interpolated according the animation frames and value.
* @param {Number} animationValue - The value that determines the point in the interpolation. Goes 
* from 0 (start) to 1 (end).
* @param {Object} keyframes - Contains the styles to be interpolated.
* @example
* ```javascript
*   getAnimationStyle(0.5, {opacity: [0, 1], height: [10, 30]}); //Output: {opacity: 0.5, height: 20}
* ```
* @returns {Object} - The result of interpolating the styles in the keyframes according to the
* animation value.
*/
const getAnimationStyle = (animationValue, keyframes) => {
    if(!keyframes) return {};
    let animationStyle = {};
    Object.entries(keyframes).forEach(([key, value]) => {
        if(typeof value[0] === 'number') {
            animationStyle[key] = animationValue.interpolate({
                inputRange: [0, 1], outputRange: value
            });
        }
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
* @typedef  {Object}  Url - The configuration structure required by urlSetup function. It enables
*  displaying or hiding the View based on the url, adding an 'active' attribute or making it 
* clickable redirecting the user to the chosen url.
* Principles: All url-s must start with '/' because all url-s are absolute.
* Naming: '*' represents any value for a given segment. At the end of the url, e.g.'/path/to/end/*'
*         means any number of segments after
* Note: The page root has a url '/'. This can only be matched by target url '/' or '* /'
* Note: Actual url ignores anchors (root/home/#anchor/path === root/home)
* ```javascript
* @example
*   //Actual Url = '/path/to/page'
*   matchUrl('/* /* /page') //Matches
*   matchUrl('/* /to')      //Does not match
*   matchUrl('/* /to/*')    //Matches
* @property {String}  [visible]           - The url for the component to be visible.
* @property {String}  [active]            - The url for the component to be active.
* @property {String}  [link]              - The url to be redirected to when clicking the component.
* @example
* ```javascript 
*   const myUrl = {visible: '/*', active: '/home/*', link: '/home'}
* ```
*/
/** 
* @description A powerful component that acts as a container for other base components. It behaves 
* like React Native view block with some additional features such as routing, positioning,
* animations and lifecycle events.
* @param {Boolean} visible - Determines whether the View is visible on the screen or not.
* @param {Function} onVisibleChange - The function called when the 'visible' property is modified 
* due to url changes. It can be used to update the 'visible' state variable.
* @param {Boolean} active - Determines whether the View is active or not. Being active means that 
* the current url matches the target url of this component.
* @param {Function} onActiveChange - The function called when the 'active' property is modified due
* to url changes. It can be used to update the 'active' state variable.
* @param {Content} content - The configuration specifying the positioning of the component's content.
* @param {Object} self - The configuration specifying the positioning of the component itself with 
* respect to its siblings.
*   - expand: Ability for a flex component to grow if there is extra space (0 CSS default). The 
*     greater the number, the greater the expansion with respect to other sibling components able to
*     expand. 0 means the component is unable to expand.
*   - shrink: Ability for a flex component to shrink if there is not enough space (1 CSS default). 
*     The greater the number, the greater the shrinkage with respect to other sibling components 
*     able to shrink. 0 means the component is unable to shrink.
*   - align:  It allows to override the transversal (perpendicular to the content direction) 
*     positioning set by the parent with the 'content' property.
*     E.g. If the parent sets the content to be aligned in a row on top, with the self property 
*     child element can override this behavior.
* @param {Array<String> | Array<Object> | Map} animation - The animation to be executed on the 
* component for the different property value changes.
* @param {Url} [url] - The configuration structure required to make routing possible. It enables 
* displaying or hiding the View based on the url, adding an 'active' attribute or making it 
* clickable redirecting the user to the chosen url.
*       - Active: Determines when the active attribute is set.
*       - Visible: Determines when the visible attribute is set and therefore displayed on the 
*         screen.
*       - Link: Determines the url where the app is routed to when the element is clicked.
*       - Example: view({url: {visible: '/* /* /events', active: '/* /* /events'}})('content')
* @param {Component} [structure] - The component structure to be rendered inside the view.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables. 
* For view the default flavor is not inherited.
* @example
* ```javascript 
*   View({
*       visible: read('isVisible'), onVisibleChange: update('isVisible'), 
*       url: {visible: '/home1', link: 'home2'}, content: {v: 'top', h: 'left'}, self: {expand: 1}
*   })('hello world');
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
        let externalOnPropertyChange;      //An object with the onPropertyChange attribute set by the user during instantiation.
        let finalOnPropertyChange;          //The result of combining internalOnPropertyChange and externalOnPropertyChange

        if(animation) {
            animationValue = React.useRef(new Animated.Value(0)).current;
            [selectedKeyframes, setSelectedKeyframes] = React.useState({});
            [isVisible, setIsVisible] = React.useState(false);

            animationStyle = getAnimationStyle(animationValue, selectedKeyframes);

            internalOnPropertyChange = {};
            if(animation && typeof animation === 'object') {
                Object.entries(animation).forEach(([property, value]) => {
                    if(value) {
                        internalOnPropertyChange[property] = animate(value, property,
                            animationValue, setSelectedKeyframes, isVisible, setIsVisible);
                    }
                });
            }
            externalOnPropertyChange = attributes['onPropertyChange'];
            finalOnPropertyChange = externalOnPropertyChange ? {
                ...internalOnPropertyChange, ...externalOnPropertyChange
            } : internalOnPropertyChange;//Compose internal and external onPropertyChange
            delete attributes['onPropertyChange'];
        }

        //Final Style
        const externalDisplay = attributes['style']?.display ?? 'flex';
        let contentStyle = {};
        let selfStyle = {};
        let selfAlign = {};
        if(externalDisplay === 'flex') { //Only for 'flex' display property
            contentStyle = {
                display: visible || isVisible ? 'flex' : 'none', //This line of code is immportant to display the fade out animation
                ...positionContent(content)
            };
            selfStyle = {
                display: visible || isVisible ? 'flex' : 'none', //This line of code is immportant to display the fade out animation
                flexGrow: self?.expand ?? 0,              //Ability for a flex item to grow if there is too much space (0 CSS default).
                flexShrink: self?.shrink ?? 1,            //Ability for a flex item to shrink if there is not enough space (1 CSS default).  
            };
            selfAlign = self?.align ? {alignSelf: self.align} : {}; //Transversal positioning of the item overriding parents content positioning.
        }
        const outerStyle = {//Outer style. When there is a gradient it is applied to the Gradient itself.
            borderWidth: flavor?.borderWidth ?? 0,
            borderStyle: flavor?.borderStyle ?? 'solid',
            borderColor: flavor?.borderColor ?? 'transparent',
            borderRadius: flavor?.radius ?? 0,
            ...flavor?.shadow ?? 0,
            ...selfStyle,
            ...selfAlign
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
            if(animation.visible) {
                finalStructure = RNAnimatedView({
                    visible: visible, onPropertyChange: finalOnPropertyChange, ...attributes
                })(isVisible ? structure : null);
            }
            else {
                finalStructure = RNAnimatedView({
                    visible: visible, onPropertyChange: finalOnPropertyChange, ...attributes
                })(visible ? structure : null);
            }
        }
        else finalStructure = RNView({visible: visible, ...attributes})(visible ? structure : null);

        if(flavor?.backgroundGradient) {//In case of backgroundGradient
            finalStructure = Gradient({
                ...flavor.backgroundGradient, style: outerStyle
            })(finalStructure);
        }
        //url property gets substituted in core by onPress = updateUrl(url), this allows to change
        //current url on press
        if(url) finalStructure = RNTouchableOpacity({url: url})(finalStructure);

        //If onPress or onClick is set use TouchableOpacity
        if(attributes['onPress'] || attributes['onClick']) {
            finalStructure = RNTouchableOpacity({
                onPress: attributes['onPress'] ??
                    attributes['onClick']
            })(finalStructure);
        }

        return finalStructure;
    });

//==================================================================================================
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
//================================================================================================== 


/** 
* @description Standard text component to wrap all the texts in the application. It enables creating
* gradient texts setting textGradient theme variable.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @param {Component} [structure] - The component structure to be rendered inside the slider.
* @example
* ```javascript 
*   const myText = Text({
*        flavor: {textGradient: generateGradient({colors: ['red', 'blue']})}
*   })('Hello World!');
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
* @description Wrapper component for all the different types of inputs. It allows to work seamlessly
* with the different types of inputs and react to the change events. It also provides styling
* options through the use of flavors.
* Web input types: 
*   'button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 
*   'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 
*   'time', 'url', 'week'
* Native input types:
*   - Touchable Opacity: 'button'                                                        
*         [React Native]{@link https://reactnative.dev/docs/touchableopacity}
*   - Switch:            'checkbox'                                                      
*         [React Native]{@link https://reactnative.dev/docs/switch}
*   - Text Input:        'email', 'number', 'password', 'tel', 'text', 'textarea', 'url' 
*         [React Native]{@link https://reactnative.dev/docs/textinput}
*   - Slider:            'range'                                                         
*         [Github]{@link https://github.com/callstack/react-native-slider/tree/main/src}
*   - Modal Selector:    'list'    
*         [Github]{@link https://github.com/peacechen/react-native-modal-selector }
*   - Datetime Picker:   'date', 'time', 'datetime'  
*         [Github]{@link https://github.com/react-native-datetimepicker/datetimepicker}
* Change events: Whenever a form field is changed, the event is fired. Works the same as web's 
* 'onInput' event. On oneJS always use 'onChange' for a consistent behavior.
*   - TextInput: 
*       - onChange: Invoked when the user changes the value of the text input.Receives the change
*         event as an argument.
*       - onChangeText: Invoked when the user changes the value of the text input.Receives the 
*         change value as an argument.
*   - Switch: 
*       - onChange: Invoked when the user changes the value of the switch input.Receives the change
*         event as an argument.
*       - onValueChange: Invoked when the user changes the value of the switch input.Receives the 
*         change value as an argument.
* Content types for TextInput in iOS and Android:
*   - Android: 'autoComplete' specifies autocomplete hints for the system, so it can provide 
*     autofill. [React Native]{@link https://reactnative.dev/docs/textinput#autocomplete-android}
*   - iOS: 'textContentType' specifies autocomplete hints for the system, so it can provide 
*     autofill. [React Native]{@link https://reactnative.dev/docs/textinput#textcontenttype-ios}
* @param {String} [type] - The type of input, any of the standard html input types plus 'range', 
* 'list' and 'textarea'.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @example
* ```javascript 
*   const myInput = Input({
*        type: 'list', options: [{value: 'vol', label: 'Volvo'}, {value: 'mer', label: 'Mercedes'}], 
*        flavor: 'danger
*   '});
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
    else if(type === 'number') {
        return RNTextInput({
            keyboardType: 'numeric', textContentType: 'newPassword', ...attributes
        });
    }
    else if(type === 'email') {
        return RNTextInput({
            keyboardType: 'email-address', autoComplete: 'email', textContentType: 'emailAddress',
            ...attributes
        });
    }
    else if(type === 'url') {
        return RNTextInput({
            keyboardType: 'url', textContentType: 'URL', ...attributes
        });
    }
    else if(type === 'tel') {
        return RNTextInput({
            keyboardType: 'phone-pad', autoComplete: 'tel', textContentType: 'telephoneNumber',
            ...attributes
        });
    }
    /*(ios only) paswordRules: 
        When using textContentType as newPassword on iOS we can let the OS know the minimum requirements of the 
        password so that it can generate one that will satisfy them.
    */
    else if(type === 'password') {
        return RNTextInput({
            autoComplete: 'password', textContentType: 'password', secureTextEntry: true,
            ...attributes
        });
    }
    else if(type === 'new-password') {
        return RNTextInput({
            autoComplete: 'password-new', textContentType: 'newPassword', secureTextEntry: true,
            ...attributes
        });
    }//TODO: Insert validations

    /*
    RN multiline: It is important to note that this aligns the text to the top on iOS, and centers it on Android. 
    Use with textAlignVertical set to 'top' for the same behavior in both platforms.
    (android only) numberOfLines: Sets the number of lines for a TextInput
    */
    else if(type === 'textarea') {
        let textAreaStyle = {textAlignVertical: 'top'};
        if(attributes['style'] == null) attributes['style'] = textAreaStyle;
        else if(Array.isArray(attributes['style'])) attributes['style'].unshift(textAreaStyle);
        else if(typeof attributes['style'] === 'object') {
            attributes['style'] = {...textAreaStyle, ...attributes['style']};
        }
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
                icon && Icon({icon: icon, style: iconStyle, flavor: flavor}),
                title && Text({style: titleStyle, flavor: flavor})(title)
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
* @description Icon component for SVG icons. It enables using icons from the oneJS icon gallery or
* your own SVG icons. If you choose to use your own icons, there are two options: 
*   - Use webpack to import the raw SVG. 
*     [Pluralsight]{@link https://www.pluralsight.com/guides/how-to-load-svg-with-react-and-webpack}
*   - Create a .js file exporting the raw SVG as a string. 
*     Example: export myIconFont = {icon1: <svg>...</svg>, icon2: <svg>...</svg>}
* Useful icon fonts:
* [Google]{@link https://fonts.google.com/icons?selected=Material+Icons}
* [FontAwesome]{@link https://fontawesome.com/icons}
* [The Noun Project]{@link https://thenounproject.com}
* @param {String} [icon] - The raw string of the svg icon. E.g.: '<svg>...</svg>'.
* @param {Boolean} [raised] - If true, adds background to the icon simulating a raised button.
* @param {String | Number} [size] - Adjusts the size of the icon. For strings, 'large', 'medium' and
* 'small' options are available. Numbers represent the pixel size of the icon
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @example
* ```javascript 
*   import {myIcon} from './myIcon.svg';        //Configuring webpack to import an .svg. 
*                                               //'icon1' in the example below
*   import {myIconFont} from './myIconFont.js'; //Using external icon font as a JS object. 
*                                               //'icon2' in the example below
*   
*   const icon1 = Icon({icon: myIcon, raised: true, size: 'small'});
*   const icon2 = Icon({icon: myIconFont['myOtherIcon'], iconFont: myIconFont, size: 40});
* ```
* @returns {ReactElement} - The element corresponding to the Icon.
*/
export const Icon = Component('Icon', false, ({icon, size = 32, raised,
    flavor = readFlavor('default'), ...attributes} = {}) => {
    if(!icon) return null;
    //Size can be defined: size = 30 (width=height=30) or size = {width: 30, height: 60}
    if(typeof size === 'number') size = {width: size, height: size};
    else size = {width: size?.width ?? 'auto', height: size?.height ?? 'auto'};
    let padding = Math.floor(parseInt(size) / 4);
    const gradient = flavor?.primaryGradient ? readIconGradient(flavor?.primaryGradient) : null;
    const iconStyle = {
        fill: gradient ? 'url(#' + gradient.id + ')' : flavor.primaryColor ?? 'blue',
        backgroundColor: 'transparent'
    };
    let backgroundStyle = { //Adding padding for the icon
        minWidth: Math.floor(size.width * 1.5),
        minHeight: Math.floor(size.height * 1.5),
        width: Math.floor(size.width * 1.5),
        height: Math.floor(size.height * 1.5)
    };
    if(raised) {
        backgroundStyle = {
            ...backgroundStyle, ...{
                background: flavor?.backgroundColor ?? 'blue',
                borderWidth: flavor?.borderWidth ?? 0,
                borderStyle: flavor?.borderStyle ?? 'solid',
                borderColor: flavor?.borderColor ?? 'transparent',
                borderRadius: flavor?.radius ?? '0px',
                ...flavor?.shadow
            }
        };
    }
    attributes['style'] = mergeStyles(backgroundStyle, attributes['style']);

    const iconWithGradient = gradient ? icon.replace('</svg>', (gradient.value + '</svg>')) : icon;
    return View({
        content: {h: 'center', v: 'center', wrap: false}, flavor: raised ? flavor : undefined,
        ...attributes
    })(Xml({xml: iconWithGradient, style: iconStyle, width: size.width, height: size.height}));
});

/**
 * @description Creates a modal component with customizable header, footer, size, animation, and backdrop.
 * @param {Object} flavor - The component's flavor object, which includes style and color preferences.
 * @param {ReactNode} header - The component's header, if any.
 * @param {ReactNode} footer - The component's footer, if any.
 * @param {boolean} backdrop - Whether to show a backdrop behind the modal.
 * @param {boolean} closeIcon - Whether to show a close icon in the top left corner of the modal.
 * @param {string} size - The size of the modal ('small', 'medium', or 'large').
 * @param {function} onClose - A function to be called when the modal is closed.
 * @param {string} animation - The type of animation to use when showing or hiding the modal.
 * @param {boolean} visible - Whether the modal is currently visible or not.
 * @param {Object} attributes - Additional attributes to pass to the RNModal component.
 * 
 * @returns {ReactNode} A modal component.
 */
// animationType: The animationType prop controls how the modal animates.
// - slide: slides in from the bottom,
// - fade: fades into view,
// - none; appears without an animation
// transparent
// The transparent prop determines whether your modal will fill the entire view. Setting this to true will render the modal over a transparent background.
const modalCloseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,
208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,
16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,
0,1,22.62,22.62L278.63,256Z"/></svg>`;
export const Modal = Component('Modal', true, ({flavor = readFlavor('default'), header, footer,
    backdrop = true, closeIcon = true, size = 'medium', onClose = () => {},
    animation = 'slide', visible, ...attributes} = {}) => structure => {
        animation = attributes['animationType'] || animation;
        // Set the style for the modal's content area based on the size prop.
        const contentStyle = {
            position: 'absolute',
            left: size === 'large' ? '5%' : size === 'small' ? '20%' : '10%',
            top: size === 'large' ? '2.5%' : size === 'small' ? '35%' : '20%',
            width: size === 'large' ? '90%' : size === 'small' ? '60%' : '80%',
            height: size === 'large' ? '95%' : size === 'small' ? '30%' : '60%',
            backgroundColor: 'white' // backgroundColor: 'rgba(255,255,255,0.95)', 
        };
        const closeButtonStyle = {
            background: 'none',
            position: 'absolute',
            top: 4,
            left: 4,
        };
        const headerStyle = {
            paddingVertical: 16,
            width: '100%',
            borderBottomWidth: 1,
            borderColor: '#eee',
        };
        const footerStyle = {
            paddingVertical: 16,
            width: '100%',
            borderTopWidth: 1,
            borderColor: '#eee',
        };
        return RNModal({
            animationType: animation, visible: visible, transparent: true, ...attributes
        })([
            //Show a backdrop behind the modal if the backdrop prop is true.
            backdrop && RNTouchableOpacity({
                style: {backgroundColor: 'black', height: '100%', opacity: 0.5},
                onPress: () => {onClose(false);}
            })(),
            View({
                content: {h: 'center', v: 'space', direction: 'column', wrap: false},
                style: contentStyle, flavor: {...flavor, shadow: {elevation: 20}},
            })([
                header && View({style: headerStyle, content: {h: 'center', v: 'center'}})(header),
                structure,
                footer && View({style: footerStyle, content: {h: 'distribute', v: 'center'}})(footer),
                closeIcon && RNTouchableOpacity({
                    style: closeButtonStyle, onPress: () => {onClose(false);}
                })(Icon({
                    icon: modalCloseIcon, flavor: {primaryColor: flavor?.neutralColor ?? '#999'}
                })),
            ]),
        ]);
    });
/**
 * Swiper component for horizontal scrolling with tabs
 * @typedef {Object} SwiperProps
 * @property {number} [value=0] - Index of the currently active tab.
 * @property {function} [onChange=() => {}] - Callback function called when a tab is pressed.
 * @property {boolean} [bullets=true] - Flag to show/hide tab bullets.
 * @property {string} [direction='row'] - Direction of the swiper, 'row' or 'column'.
 * @property {boolean} [scroll=true] - Flag to enable/disable scrolling.
 * @property {string} [flavor=readFlavor('default')] - Theme flavor.
 * @property {...*} [...attributes] - Additional attributes to be passed to the component.
 * @returns {ReactNode} Higher-order function that accepts an array of child components.
 */
//TODO: Implement direction column
export const Swiper = Component('Swiper', true, ({value = 0, onChange = () => {}, bullets = true,
    direction = 'row', scroll = true, loop = false, flavor = readFlavor('default'),
    ...attributes} = {}) => children => {
        //Navigates (scrolls) to tab on bullet press
        const onBulletPress = (index) => {
            onChange(index);
        };

        //Initializes scroll position during the onCreate function
        const initScroll = index => domRef => {
            //During onCreate domRef.measure(width) is equal to 0, therefore window width is used.
            //This is a workaround and could create incosistencies if the index is not 0 on init.
            domRef.scrollTo({x: index * Dimensions.get('window').width, y: 0, animated: true});
        };

        //Updates scroll position on property 'value' change
        const updateScroll = (index, domRef) => {
            domRef.measure((x, y, width, height, pageX, pageY) => {
                domRef.scrollTo({x: index * width, y: 0, animated: true});
            });
        };

        //Updates active tab on scroll end
        const onScrollEnd = (event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const width = event.nativeEvent.layoutMeasurement.width;
            const page = Math.round(offsetX / width);
            onChange(page);
        };

        const styles = {
            tabsContainer: {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 50
            },
            bullet: {
                fontSize: 20,
                color: flavor?.neutralColor ?? '#333'
            },
            activeBullet: {
                color: flavor?.primaryColor ?? 'blue'
            }
        };
        return View({content: {direction: 'column'}, self: {expand: 1}})([
            //ScrollView
            RNScrollView({
                horizontal: true, pagingEnabled: true, showsHorizontalScrollIndicator: false,
                scrollEnabled: scroll,
                loop: loop,
                onCreate: initScroll(value),
                // onScroll: onScrollEnd,
                onScrollEndDrag: onScrollEnd,
                onMomentumScrollEnd: onScrollEnd,
                value: value,
                onPropertyChange: {value: updateScroll},
                style: {flex: 1, flexDirection: 'column'},
                contentContainerStyle: {flex: 1},
                ...attributes
            })([
                React.Children.map(children, (child, index) => {
                    return View({
                        key: index, self: {expand: 1}, style: {width: '100%'}
                    })(child);
                })
            ]),
            //Bullets
            bullets && View({
                style: styles.tabsContainer, content: {h: 'center', v: 'center', gap: 10},
                self: {expand: 1}
            })([
                React.Children.map(children, (child, index) => {
                    return RNTouchableOpacity({
                        style: {paddingHorizontal: 5}, onPress: () => onBulletPress(index)
                    })(
                        Text({style: [styles.bullet, value === index && styles.activeBullet]})('⬤')
                    );
                })
            ]),
        ]);
    });

const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,
    127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>`;
const heartIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256,448a32,32,0,0,
    1-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63,114.52,98.46,
    64,159.08,64c44.08,0,74.61,24.83,92.39,45.51a6,6,0,0,0,9.06,0C278.31,
    88.81,308.84,64,352.92,64,413.54,64,463.37,114.52,464,176.64c.54,54.21-18.63,104.26-58.61,153-18.77,
    22.87-52.8,59.45-131.39,112.8A32,32,0,0,1,256,448Z"/></svg>`;
const starIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,
    221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,
    29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"/></svg>`;
export const SwipeCards = Component('SwipeCards', true, ({flavor = readFlavor('default'),
    onSwipe = () => {}, icons, upIcon = true, onBack, size = 'medium',
    Left, Right, Up, ...attributes} = {}) => (children) => { //Left, Right and Up are components
        const SCREEN_WIDTH = Dimensions.get('window').width;
        const SCREEN_HEIGHT = Dimensions.get('window').height;
        const SWIPE_THRESHOLD_X = SCREEN_WIDTH * 0.25;
        const SWIPE_THRESHOLD_Y = SCREEN_HEIGHT * 0.25;
        const SWIPE_OUT_DURATION = 250;

        const [index, setIndex] = React.useState(0);
        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy});
            },
            onPanResponderRelease: (event, gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD_X) {
                    swipeCard('right');
                } else if(gesture.dx < -SWIPE_THRESHOLD_X) {
                    swipeCard('left');
                }
                else if(gesture.dy < -SWIPE_THRESHOLD_Y) {
                    swipeCard('up');
                }
                else {
                    resetPosition();
                }
            }
        });

        const swipeCard = (direction) => {
            const x = direction === 'right' ? SCREEN_WIDTH : direction === 'left' ? -SCREEN_WIDTH : 0;
            const y = direction === 'up' ? -SCREEN_HEIGHT : 0;
            Animated.timing(position, {
                toValue: {x: x, y: y},
                duration: SWIPE_OUT_DURATION,
                useNativeDriver: false,
            }).start(() => {
                setIndex(index + 1);
                position.setValue({x: 0, y: 0});
                onSwipe(direction);
            });
        };

        const resetPosition = () => {
            Animated.spring(position, {
                toValue: {x: 0, y: 0},
                friction: 4,
                useNativeDriver: false
            }).start();
        };

        const getCardStyle = () => {
            const rotate = position.x.interpolate({
                inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
                outputRange: ['-120deg', '0deg', '120deg'],
            });
            const opacity = position.x.interpolate({
                inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
            });

            return {
                ...position.getLayout(),
                transform: [{rotate}],
                opacity: opacity
            };
        };

        const getIconStyle = (direction) => {
            if(direction === 'left') {
                const scaleLeft = position.x.interpolate({
                    inputRange: [-SCREEN_WIDTH, -SWIPE_THRESHOLD_X, -SWIPE_THRESHOLD_X * 0.9, 0, SWIPE_THRESHOLD_X * 0.9, SWIPE_THRESHOLD_X, SCREEN_WIDTH],
                    outputRange: [1.4, 1, 1, 1, 1, 0, 0],
                    extrapolate: 'clamp',
                });
                const opacityLeftt = position.x.interpolate({
                    inputRange: [-SCREEN_WIDTH, -SWIPE_THRESHOLD_X * 1.1, -SWIPE_THRESHOLD_X, 0],
                    outputRange: [1, 1, 0.8, 0.8],
                    extrapolate: 'clamp',
                });
                return {opacity: opacityLeftt, transform: [{scale: scaleLeft}]};
            }
            else if(direction === 'right') {
                const scaleRight = position.x.interpolate({
                    inputRange: [-SCREEN_WIDTH, -SWIPE_THRESHOLD_X, -SWIPE_THRESHOLD_X * 0.9, 0, SWIPE_THRESHOLD_X * 0.9, SWIPE_THRESHOLD_X, SCREEN_WIDTH],
                    outputRange: [0, 0, 1, 1, 1, 1, 1.4],
                    extrapolate: 'clamp', 
                });
                const opacityRight = position.x.interpolate({
                    inputRange: [SWIPE_THRESHOLD_X, SWIPE_THRESHOLD_X * 1.1, SCREEN_WIDTH],
                    outputRange: [0.8, 1, 1],
                    extrapolate: 'clamp',
                });
                return {opacity: opacityRight, transform: [{scale: scaleRight}]};
            }
            else if(direction === 'up') {
                const scaleLeftRight = position.x.interpolate({
                    inputRange: [-SCREEN_WIDTH, -SWIPE_THRESHOLD_X, -SWIPE_THRESHOLD_X * 0.9, 0, SWIPE_THRESHOLD_X * 0.9, SWIPE_THRESHOLD_X, SCREEN_WIDTH],
                    outputRange: [0, 0, 1, 1, 1, 0, 0],
                    extrapolate: 'clamp',
                });
                const scaleUp = position.y.interpolate({
                    inputRange: [-SCREEN_HEIGHT, -SWIPE_THRESHOLD_Y, 0],
                    outputRange: [1.4, 1, 1],
                    extrapolate: 'clamp',
                    easing: Easing.back(),
                });
                const opacityUp = position.y.interpolate({
                    inputRange: [-SCREEN_HEIGHT, -SWIPE_THRESHOLD_Y * 1.1, -SWIPE_THRESHOLD_Y, 0],
                    outputRange: [1, 1, 0.8, 0.8],
                    extrapolate: 'clamp',
                    easing: Easing.back(),
                });
                return {opacity: opacityUp, transform: [{scale: Animated.multiply(scaleUp, scaleLeftRight)}]};
            }
        };

        const styles = {
            container: {
                minWidth: 150,
                minHeight: 150,
                width: 350,
                height: 600,
                backgroundColor: 'pink',
                alignSelf: 'stretch'
            },
            cardStyle: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: flavor?.backgroundColor ?? 'white',
                borderRadius: flavor?.radius ?? 0,
                borderWidth: flavor?.borderWidth ?? 1,
                borderStyle: flavor?.borderStyle ?? 'solid',
                borderColor: flavor?.borderColor ?? '#666',
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset: {width: 0, height: 2, },
                elevation: 5
            },
            icons: {
                position: 'absolute',
                bottom: 10,
                width: '100%',
            }
        };

        return View({style: styles.container, ...attributes})([
            React.Children.map(children, (child, i) => {
                // map((item, i) => {
                if(i < index) {
                    return null;
                }
                if(i === index) {
                    return RNAnimatedView({
                        key: i,
                        style: [getCardStyle(), styles.cardStyle],
                        ...panResponder.panHandlers
                    })(child);
                }
                return RNAnimatedView({
                    key: i,
                    style: [styles.cardStyle, (i - index) > 0 && {top: 10}],
                })(child);
            }).reverse(),
            View({style: styles.icons, content: {h: 'center', v: 'center', gap: 10}, self: {expand: 1}})([
                RNAnimatedView({style: [styles.icon, getIconStyle('left')]})(
                    View({
                        flavor: flavor, onPress: () => {swipeCard('left');}
                    })(Icon({
                        icon: closeIcon, size: 48,
                        flavor: {
                            primaryColor: flavor?.rejectColor ?? 'red'
                        }
                    }))
                ),
                RNAnimatedView({style: [styles.icon, getIconStyle('up')]})(
                    View({
                        flavor: flavor, onPress: () => {swipeCard('up');}
                    })(Icon({
                        icon: starIcon, size: 48,
                        flavor: {
                            primaryColor: flavor?.primaryColor ?? 'blue'
                        }
                    }))
                ),
                RNAnimatedView({style: [styles.icon, getIconStyle('right')]})(
                    View({
                        flavor: flavor, onPress: () => {swipeCard('right');}
                    })(Icon({
                        icon: heartIcon, size: 48,
                        flavor: {
                            primaryColor: flavor?.acceptColor ?? 'green'
                        }
                    }))
                ),
                // View({style: styles.icon, flavor: flavor, onPress: () => {swipeCard('up');}})(Icon({icon: starIcon, size: 48, flavor: {primaryColor: flavor?.primaryColor ?? 'blue'}})),
                // View({style: styles.icon, flavor: flavor, onPress: () => {swipeCard('right');}})(Icon({icon: heartIcon, size: 48, flavor: {primaryColor: flavor?.acceptColor ?? 'green'}}))
            ]),
        ]);
    });

const amIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256,118a22,22,0,0,1-22-22V48a22,22,0,0,1,44,0V96A22,22,0,0,1,256,118Z"/>
    <path d="M256,486a22,22,0,0,1-22-22V416a22,22,0,0,1,44,0v48A22,22,0,0,1,256,486Z"/>
    <path d="M369.14,164.86a22,22,0,0,1-15.56-37.55l33.94-33.94a22,22,0,0,1,31.11,31.11l-33.94,
    33.94A21.93,21.93,0,0,1,369.14,164.86Z"/><path d="M108.92,425.08a22,22,0,0,
    1-15.55-37.56l33.94-33.94a22,22,0,1,1,31.11,31.11l-33.94,33.94A21.94,21.94,0,0,1,
    108.92,425.08Z"/><path d="M464,278H416a22,22,0,0,1,0-44h48a22,22,0,0,1,0,44Z"/>
    <path d="M96,278H48a22,22,0,0,1,0-44H96a22,22,0,0,1,0,44Z"/><path d="M403.08,425.08a21.94,
    21.94,0,0,1-15.56-6.45l-33.94-33.94a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,
    1-15.55,37.56Z"/><path d="M142.86,164.86a21.89,21.89,0,0,1-15.55-6.44L93.37,124.48a22,22,0,0,1,
    31.11-31.11l33.94,33.94a22,22,0,0,1-15.56,37.55Z"/><path d="M256,358A102,102,0,1,1,358,256,
    102.12,102.12,0,0,1,256,358Z"/></svg>`;
const pmIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M264,480A232,232,0,0,1,32,248C32,154,86,69.72,169.61,33.33a16,16,0,0,1,21.06,
    21.06C181.07,76.43,176,104.66,176,136c0,110.28,89.72,200,200,200,31.34,0,59.57-5.07,
    81.61-14.67a16,16,0,0,1,21.06,21.06C442.28,426,358,480,264,480Z"/></svg>`;

//TODO: implement modal pop up option
export const Clock = Component('Clock', false, ({value = new Date(), onChange = () => {}, modal,
    valueDisplay = true, onClose = () => {}, flavor = readFlavor('default'), ...attributes} = {}) => {

    const selectedHour = value.getHours().toString().padStart(2, '0');
    const selectedMinute = (Math.ceil(value.getMinutes() / 5) * 5).toString().padStart(2, '0');
    const selectedMeridiem = selectedHour < 12 ? 'am' : 'pm';

    //State is required to update the display on property changes
    const [hourState, setHourState] = React.useState(selectedHour);
    const [minuteState, setMinuteState] = React.useState(selectedMinute);

    const hours = selectedMeridiem === 'am' ?
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'] :
        ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

    const styles = {
        timeText: {
            fontSize: flavor?.textSize * 2 ?? 32,
        },
        hourMinuteContainer: {
            width: 155,
            paddingBottom: 7
        },
        hourMinuteHeader: {
            width: '100%',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: flavor?.borderColor ?? '#ccc'
        },
        hourMinuteHeaderText: {
            fontSize: flavor?.textSize * 1.2 ?? 20,
        },
        pressable: {
            width: 40,
            height: 30,
            backgroundColor: flavor?.lightColor ?? '#ccc',
        },
        pressableSelected: {
            backgroundColor: flavor?.primaryColor ?? 'blue',
            borderColor: flavor?.primaryColor ?? 'blue',
        },
        pressableTextSelected: {
            color: flavor?.lightColor ?? 'white'
        },
        amPmContainer: {
            width: 50,
        },
    };

    return View({content: {direction: 'column', h: 'center', v: 'center'}})([
        //Selected Time
        valueDisplay && View()([
            Icon({icon: selectedMeridiem === 'am' ? amIcon : pmIcon, flavor: flavor}),
            Text({flavor: flavor, style: styles.timeText})(hourState + ':' + minuteState)
        ]),

        //Input Panel
        View({content: {direction: 'row', h: 'center', v: 'center', gap: 5}})([
            //Hours
            View({
                content: {direction: 'row', wrap: true, h: 'center', v: 'top', gap: 7},
                flavor: flavor, style: styles.hourMinuteContainer
            })([
                //Hour header
                View({
                    content: {v: 'center', h: 'center'}, style: styles.hourMinuteHeader
                })(Text({flavor: flavor, style: styles.hourMinuteHeaderText})('hour')),
                //Hour inputs
                hours.map(hour => {
                    return View({
                        content: {h: 'center', v: 'center'}, key: hour, flavor: flavor,
                        style: [styles.pressable, hour === selectedHour && styles.pressableSelected],
                        onPress: () => {
                            if(hour === selectedHour) return;
                            value.setHours(Number(hour));
                            value.setMinutes(Number(selectedMinute));
                            onChange(value);
                            setHourState(hour);
                        }
                    })(Text({
                        flavor: flavor, style: hour === selectedHour && styles.pressableTextSelected
                    })(hour));
                })
            ]),
            //Meridiem
            View({
                content: {direction: 'column', h: 'center', v: 'distribute', gap: 5},
                style: styles.amPmContainer
            })([
                View({
                    content: {direction: 'row', h: 'center', v: 'center', gap: 0}, flavor: flavor,
                    style: [styles.pressable, 'am' === selectedMeridiem && styles.pressableSelected],
                    onPress: () => {
                        if('am' === selectedMeridiem) return;
                        const hourNumber = Number(selectedHour) - 12;
                        const hourString = hourNumber.toString().padStart(2, '0');
                        value.setHours(hourNumber);
                        onChange(value);
                        setHourState(hourString);
                    }
                })([
                    // Icon({icon: icons['sunny']}),
                    Text({
                        flavor: flavor,
                        style: 'am' === selectedMeridiem && styles.pressableTextSelected
                    })('am')
                ]),
                View({
                    content: {direction: 'row', h: 'center', v: 'center', gap: 0}, flavor: flavor,
                    style: [styles.pressable, 'pm' === selectedMeridiem && styles.pressableSelected],
                    onPress: () => {
                        if('pm' === selectedMeridiem) return;
                        const hourNumber = Number(selectedHour) + 12;
                        const hourString = hourNumber.toString().padStart(2, '0');
                        value.setHours(hourNumber);
                        onChange(value);
                        setHourState(hourString);
                    }
                })([
                    // Icon({icon: icons['sunny']}),
                    Text({
                        flavor: flavor,
                        style: 'pm' === selectedMeridiem && styles.pressableTextSelected
                    })('pm')
                ])
            ]),
            //Minutes
            View({
                content: {direction: 'row', wrap: true, h: 'center', v: 'top', gap: 7},
                flavor: flavor, style: styles.hourMinuteContainer
            })([
                //Minute Header
                View({
                    content: {v: 'center', h: 'center'}, style: styles.hourMinuteHeader
                })(Text({flavor: flavor, style: styles.hourMinuteHeaderText})('minute')),
                //Minute input
                minutes.map(minute => {
                    return View({
                        content: {h: 'center', v: 'center'}, key: minute, flavor: flavor,
                        style: [styles.pressable, minute === selectedMinute && styles.pressableSelected],
                        onPress: () => {
                            if(minute === selectedMinute) return;
                            value.setHours(Number(selectedHour));
                            value.setMinutes(Number(minute));
                            onChange(value);
                            setMinuteState(minute);
                        }
                    })(Text({
                        flavor: flavor,
                        style: minute === selectedMinute && styles.pressableTextSelected
                    })(minute));
                })
            ]),
        ])
    ]);
});
// const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));

export const Calendar = Component('Calendar', false, ({value = new Date(), onChange = () => {},
    modal, valueDisplay, mondayFirst = true, onClose = () => {}, flavor = readFlavor('default'),
    ...attributes} = {}) => {
    //Get month names in local language
    const monthNames = Array.from({length: 12},
        (_, i) => new Date(0, i + 1).toLocaleString(undefined, {month: 'long', year: undefined}));

    const weekdayNames = Array.from({length: 7},
        (_, i) => new Intl.DateTimeFormat(undefined,
            {weekday: 'short'}).format(new Date(2000, 0, i + (mondayFirst ? 3 : 2))));

    //Generates the date array
    const dataGenerator = (year, month) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const date = new Date(year, month, 1);
        const weekday = date.getDay(); //0 is Sunday, 1 Monday, etc.
        const weekdayStart = mondayFirst ? (weekday === 0 ? 6 : weekday - 1) : weekday;
        const key = year + '-' + month;
        const dateArray = Array.from({length: weekdayStart},
            () => 0).concat(Array.from({length: daysInMonth}, (_, i) => i + 1));
        return {key: key, dateArray: dateArray, month: date.getMonth(), year: date.getFullYear()};
    };

    //Get value date's month and year
    const year = value.getFullYear();
    const month = value.getMonth();
    const selectedDate = value.getDate();
    const [data, setData] = React.useState(dataGenerator(year, month));

    const styles = {
        calendarPage: {
            width: 360,
            // height: 340,
            paddingLeft: 5,
            paddingVertical: 5,
            columnGap: 10,
            rowGap: 5
        },
        header: {
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: flavor?.borderColor ?? '#ccc',
            padding: 5
        },
        footer: {
            borderTopWidth: 1,
            borderTopStyle: 'solid',
            borderTopColor: flavor?.borderColor ?? '#ccc',
            padding: 5
        },
        headerFooterText: {
            fontSize: flavor?.textSize * 1.2 ?? 20,
        },
        pressable: {
            width: 40,
            height: 30,
            backgroundColor: flavor?.lightColor ?? '#ccc',
        },
        pressableSelected: {
            backgroundColor: flavor?.primaryColor ?? 'blue',
            borderColor: flavor?.primaryColor ?? 'blue',
        },
        pressableTextSelected: {
            color: flavor?.lightColor ?? 'white'
        },
        nextPrev: {
            backgroundColor: flavor?.lightColor ?? '#ccc',
            color: flavor.primaryColor,
            width: 120,
            minHeight: 30
        },
        weekday: {
            width: 40,
        },
        weekdayText: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: Math.round(flavor.textSize * 0.9)
        }
    };

    const changeData = (monthDelta) => {
        setData(dataGenerator(data.year, data.month + monthDelta));
    };

    const isSelected = (date) => {
        if(data.year !== value.getFullYear()) return false;
        if(data.month !== value.getMonth()) return false;
        if(selectedDate !== date) return false;
        return true;
    };

    return View({
        style: styles.container, content: {direction: 'column', h: 'stretch', v: 'top'},
        flavor: flavor, ...attributes
    })([
        View({content: {h: 'space', v: 'center'}, style: styles.header})([
            Input({
                type: 'button', title: 'previous', flavor: flavor, style: styles.nextPrev,
                onPress: () => {changeData(-1);}
            }),
            Text({flavor: flavor, style: styles.headerFooterText})(monthNames[data.month]),
            Input({
                type: 'button', title: 'next', flavor: flavor, style: styles.nextPrev,
                onPress: () => {changeData(+1);}
            })
        ]),
        View({
            content: {direction: 'row', h: 'left', v: 'distribute', wrap: true},
            style: styles.calendarPage
        })([
            weekdayNames.map((weekday, index) => {
                return View({
                    style: styles.weekday,
                    key: weekday,
                    content: {h: 'center', v: 'center'},
                })(
                    Text({flavor: flavor, style: styles.weekdayText})(weekday)
                );

            }),
            data.dateArray.map((date, index) => {
                if(date < 1) return View({
                    key: index, style: {...styles.pressable, backgroundColor: 'transparent'}
                })();
                else return View({
                    style: [styles.pressable, isSelected(date) && styles.pressableSelected],
                    key: index, onPress: () => {
                        const newDate = new Date(data.year, data.month, date);
                        //Maintain the time from the value
                        newDate.setHours(value.getHours());
                        newDate.setMinutes(value.getMinutes());
                        onChange(newDate);
                    },
                    content: {h: 'center', v: 'center'}, flavor: flavor
                })(
                    Text({
                        flavor: flavor, style: isSelected(date) && styles.pressableTextSelected
                    })(date)
                );
            })
        ]),
        View({content: {h: 'space', v: 'center'}, style: styles.footer})([
            Input({
                type: 'button', title: data.year - 1, flavor: flavor, style: styles.nextPrev,
                onPress: () => {changeData(-12);}
            }),
            Text({flavor: flavor, style: styles.headerFooterText})(data.year),
            Input({
                type: 'button', title: data.year + 1, flavor: flavor, style: styles.nextPrev,
                onPress: () => {changeData(+12);}
            })
        ]),
    ]);
});