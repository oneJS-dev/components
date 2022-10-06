import {matchUrl, Component, BaseComponent, readFlavor, readIconGradient, positionContent, mergeStyles} from '@onejs-dev/core';

//=============================================================================
// STANDARD COMPONENTS:
// Html standard components to be used on the web.
// Naming convention: Starts with 'Html' followed by the exact same name as the 
// corresponding html tag in CamelCase.
// Remarks: 
//    <iframe> is HtmlIFrame
//    <tbody> is HtmlTBody 
//=============================================================================

/** 
* @description Standard Html tags transformed into React elements and enhanced to provide additional options.
* Additional properties and differences with standard elements:
*   - structure: For non-self closing tags, structure represents the children elements that can be embeded into the element.
*   - flavor: A string indicating the id of the flavor object to be used to style the element.
*   - style: The style object in JS that will be compiled by emotion into CSS and added as a class into the element.
*   - inlineStyle: The style object in JS that will be added as inline CSS. The styling options are more limited and in general it should be avoided.
*   - onInit: Called once, when the component function is called for the first time.
*   - onCreate: Called once, when the component is attached to the DOM.
*   - onDestroy: Called once, when the component is removed from the DOM.
*   - onPropertyChange: Called everytime the target property changes.
* @example
* ```javascript 
*   const myDiv = H1({id: 'id1', flavor: 'danger', style: {background: 'pink'}, onCreate: ()=>{alert('myDiv created!')}})('Hello World!');
* ```
* @type {Object} 
*/
export const HtmlA = BaseComponent('HtmlA', true, 'a');
export const HtmlAbbr = BaseComponent('HtmlAbbr', true, 'abbr');
export const HtmlAddress = BaseComponent('HtmlAddress', true, 'address');
export const HtmlArea = BaseComponent('HtmlArea', false, 'area');
export const HtmlArticle = BaseComponent('HtmlArticle', true, 'article');
export const HtmlAside = BaseComponent('HtmlAside', true, 'aside');
export const HtmlAudio = BaseComponent('HtmlAudio', true, 'audio');
export const HtmlB = BaseComponent('HtmlB', true, 'b');
export const HtmlBase = BaseComponent('HtmlBase', false, 'base');
export const HtmlBdi = BaseComponent('HtmlBdi', true, 'bdi');
export const HtmlBdo = BaseComponent('HtmlBdo', true, 'bdo');
export const HtmlBlockquote = BaseComponent('HtmlBlockquote', true, 'blockquote');
export const HtmlBody = BaseComponent('HtmlBody', true, 'body');
export const HtmlBr = BaseComponent('HtmlBr', false, 'br');
export const HtmlButton = BaseComponent('HtmlButton', true, 'button');
export const HtmlCanvas = BaseComponent('HtmlCanvas', true, 'canvas');
export const HtmlCaption = BaseComponent('HtmlCaption', true, 'caption');
export const HtmlCite = BaseComponent('HtmlCite', true, 'cite');
export const HtmlCode = BaseComponent('HtmlCode', true, 'code');
export const HtmlCol = BaseComponent('HtmlCol', false, 'col');
export const HtmlColgroup = BaseComponent('HtmlColgroup', false, 'colgroup');
export const HtmlData = BaseComponent('HtmlData', true, 'data');
export const HtmlDatalist = BaseComponent('HtmlDatalist', true, 'datalist');
export const HtmlDd = BaseComponent('HtmlDd', true, 'dd');
export const HtmlDel = BaseComponent('HtmlDel', true, 'del');
export const HtmlDetails = BaseComponent('HtmlDetails', true, 'details');
export const HtmlDfn = BaseComponent('Html', true, 'dfn');
export const HtmlDialog = BaseComponent('Html', true, 'dialog');
export const HtmlDiv = BaseComponent('HtmlDiv', true, 'div');
export const HtmlDl = BaseComponent('HtmlDl', true, 'dl');
export const HtmlDt = BaseComponent('HtmlDt', true, 'dt');
export const HtmlEm = BaseComponent('HtmlEm', true, 'em');
export const HtmlEmbed = BaseComponent('HtmlEmbed', false, 'embed');
export const HtmlFieldset = BaseComponent('HtmlFieldset', true, 'fieldset');
export const HtmlFigcaption = BaseComponent('HtmlFigcaption', true, 'figcaption');
export const HtmlFigure = BaseComponent('HtmlFigure', true, 'figure');
export const HtmlFooter = BaseComponent('HtmlFooter', true, 'footer');
export const HtmlForm = BaseComponent('HtmlForm', true, 'form');
export const HtmlH1 = BaseComponent('HtmlH1', true, 'h1');
export const HtmlH2 = BaseComponent('HtmlH2', true, 'h2');
export const HtmlH3 = BaseComponent('HtmlH3', true, 'h3');
export const HtmlH4 = BaseComponent('HtmlH4', true, 'h4');
export const HtmlH5 = BaseComponent('HtmlH5', true, 'h5');
export const HtmlH6 = BaseComponent('HtmlH6', true, 'h6');
export const HtmlHead = BaseComponent('HtmlHead', true, 'head');
export const HtmlHeader = BaseComponent('HtmlHeader', true, 'header');
export const HtmlHr = BaseComponent('HtmlHr', false, 'hr');
export const Html = BaseComponent('Html', true, 'html');
export const HtmlI = BaseComponent('HtmlI', true, 'i');
export const HtmlIFrame = BaseComponent('HtmlIFrame', true, 'iframe');
export const HtmlImg = BaseComponent('HtmlImg', false, 'img');
export const HtmlInput = BaseComponent('HtmlInput', false, 'input'); //"Input" is defined later in a custom way
export const HtmlIns = BaseComponent('HtmlIns', true, 'ins');
export const HtmlKbd = BaseComponent('HtmlKbd', true, 'kbd');
export const HtmlLabel = BaseComponent('HtmlLabel', true, 'label');
export const HtmlLegend = BaseComponent('HtmlLegend', true, 'legend');
export const HtmlLi = BaseComponent('HtmlLi', true, 'li');
export const HtmlLink = BaseComponent('HtmlLink', false, 'link');
export const HtmlMain = BaseComponent('HtmlMain', true, 'main');
export const HtmlMap = BaseComponent('HtmlMap', true, 'map'); //"Map", is it colliding with any reserved word?
export const HtmlMark = BaseComponent('HtmlMark', true, 'mark');
export const HtmlMeta = BaseComponent('HtmlMeta', true, 'Meta', false, 'meta');
export const HtmlMeter = BaseComponent('HtmlMeter', true, 'meter');
export const HtmlNav = BaseComponent('HtmlNav', true, 'nav');
export const HtmlNoscript = BaseComponent('HtmlNoscript', true, 'noscript');
export const HtmlObject = BaseComponent('HtmlObject', true, 'object'); //"Obj", otherwise collides with "Object" reserved word
export const HtmlOl = BaseComponent('HtmlOl', true, 'ol');
export const HtmlOptgroup = BaseComponent('HtmlOptgroup', true, 'optgroup');
export const HtmlOption = BaseComponent('HtmlOption', true, 'option');
export const HtmlOutput = BaseComponent('HtmlOutput', true, 'output');
export const HtmlP = BaseComponent('HtmlP', true, 'p');
export const HtmlParam = BaseComponent('HtmlParam', false, 'param');
export const HtmlPicture = BaseComponent('Html', true, 'picture');
export const HtmlPre = BaseComponent('HtmlPre', true, 'pre');
export const HtmlProgress = BaseComponent('HtmlProgress', true, 'progress');
export const HtmlQ = BaseComponent('HtmlQ', true, 'q');
export const HtmlRp = BaseComponent('HtmlRp', true, 'rp');
export const HtmlRt = BaseComponent('HtmlRt', true, 'rt');
export const HtmlRuby = BaseComponent('HtmlRuby', true, 'ruby');
export const HtmlS = BaseComponent('HtmlS', true, 's');
export const HtmlSamp = BaseComponent('HtmlSamp', true, 'samp');
export const HtmlScript = BaseComponent('HtmlScript', true, 'script');
export const HtmlSection = BaseComponent('HtmlSection', true, 'section');
export const HtmlSelect = BaseComponent('HtmlSelect', true, 'select');
export const HtmlSmall = BaseComponent('HtmlSmall', true, 'small');
export const HtmlSource = BaseComponent('HtmlSource', false, 'source');
export const HtmlSpan = BaseComponent('HtmlSpan', true, 'span');
export const HtmlStrong = BaseComponent('HtmlStrong', true, 'strong');
export const HtmlStyle = BaseComponent('HtmlStyle', true, 'style');
export const HtmlSub = BaseComponent('HtmlSub', true, 'sub');
export const HtmlSummary = BaseComponent('HtmlSummary', true, 'summary');
export const HtmlSup = BaseComponent('HtmlSup', true, 'sup');
export const HtmlSvg = BaseComponent('HtmlSvg', true, 'svg');
export const HtmlTable = BaseComponent('HtmlTable', true, 'table');
export const HtmlTBody = BaseComponent('HtmlTBody', true, 'tbody');
export const HtmlTd = BaseComponent('HtmlTd', true, 'td');
export const HtmlTemplate = BaseComponent('HtmlTemplate', true, 'template');
export const HtmlTextarea = BaseComponent('HtmlTextarea', true, 'textarea');
export const HtmlTFoot = BaseComponent('HtmlTFoot', true, 'tfoot');
export const HtmlTh = BaseComponent('HtmlTh', true, 'th');
export const HtmlThead = BaseComponent('HtmlThead', true, 'thead');
export const HtmlTime = BaseComponent('HtmlTime', true, 'time');
export const HtmlTitle = BaseComponent('HtmlTitle', true, 'title');
export const HtmlTr = BaseComponent('HtmlTr', true, 'tr');
export const HtmlTrack = BaseComponent('HtmlTrack', false, 'track');
export const HtmlU = BaseComponent('HtmlU', true, 'u');
export const HtmlUl = BaseComponent('HtmlUl', true, 'ul');
export const HtmlVar = BaseComponent('HtmlVar', true, 'var');
export const HtmlVideo = BaseComponent('HtmlVideo', true, 'video');
export const HtmlWbr = BaseComponent('HtmlWbr', false, 'wbr');

//=============================================================================
// VIEW COMPONENT:
// View: Base component to organize content. Containes features that allow:
//    - Responsive animations when the following properties are modified: 
//      visible and active (current url matches target url).
//      Note: Previously selected property was supported but React uses it internally.
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
* @property {Object} [style] - Style to be applied to the component after the animation has ended. Frequently used to hide the component.
* @example
* ```javascript 
*   //Fade Out animation
*   fadeOutAnimation = {keyframes: {opacity: [1, 0], display: ['flex', 'none']}, options: {duration: 300, easing: Easing.ease}};
* ```
*/
/** 
* @description A bundle of preset entry and exit animatios for the View component on property changes. These animations are defined following the Web Animations API.
* Reference: [Mozilla]{@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API}
* @example
* ```javascript 
*   const myView = View({animation: {visible: ['fade-in', 'shrink']}})(Text()('Hello World!'));
* ```
*/
export const animations = {
    'appear': {style: {display: 'flex'}},
    'disappear': {style: {display: 'none'}},
    'fade-in': {keyframes: {opacity: [0,1], 'webkit-transform': 'none'}, options: {duration: 300, easing: 'ease-in-out'}},
    'fade-in-left': {keyframes: {opacity: [0,1], transform: ['translate3d(-100%, 0, 0)', 'none']}, options: {duration: 300, easing: 'ease-in-out'}},
    'fade-in-right': {keyframes: {opacity: [0,1], transform: ['translate3d(100%, 0, 0)', 'none']}, options: {duration: 300, easing: 'ease-in-out'}},
    'fade-out': {keyframes: {opacity: [1,0], 'webkit-transform': 'none'}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'fade-out-left': {keyframes: {opacity: [1,0], transform: ['translate3d(-100%, 0, 0)', 'none']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'fade-out-right': {keyframes: {opacity: [1,0], transform: ['translate3d(100%, 0, 0)', 'none']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'slide-in-left': {keyframes: {transform: ['translate3d(-100%, 0, 0)', 'none']}, options: {duration: 300, easing: 'ease-in-out'}},
    'slide-in-right': {keyframes: {transform: ['translate3d(100%, 0, 0)', 'none']}, options: {duration: 300, easing: 'ease-in-out'}},
    'slide-in-up': {keyframes: {transform: ['translate3d(0, 100%, 0)', 'none']}, options: {duration: 300, easing: 'ease-in-out'}},
    'slide-in-down': {keyframes: {transform: ['translate3d(0, -100%, 0)', 'none']}, options: {duration: 300, easing: 'ease-in-out'}},
    'slide-out-left': {keyframes: {transform: ['none', 'translate3d(-100%, 0, 0)']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'slide-out-right': {keyframes: {transform: ['none', 'translate3d(100%, 0, 0)']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'slide-out-up': {keyframes: {transform: ['none', 'translate3d(0, -100%, 0)']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'slide-out-down': {keyframes: {transform: ['none', 'translate3d(0, 100%, 0)']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'expand': {keyframes: {transform: ['scale(0)', 'scale(1.3)', 'scale(1)']}, options: {duration: 300, easing: 'ease-in-out'}},
    'shrink': {keyframes: {transform: ['scale(1)', 'scale(0)']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'vertical-expand': {keyframes: {transform: ['scaleY(0)', 'none'], margin: ['10px', 0]}, options: {duration: 300, easing: 'ease-in-out'}},
    'vertical-shrink': {keyframes: {transform: ['none', 'scaleY(0)']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}},
    'horizontal-expand': {keyframes: {transform: ['scaleX(0)', 'none'],  margin: ['10px', 0]}, options: {duration: 300, easing: 'ease-in-out'}},
    'horizontal-shrink': {keyframes: {transform: ['none', 'scaleX(0)']}, options: {duration: 300, easing: 'ease-in-out'}, style: {display: 'none'}}
};

/** 
* @description Whenever a property that is being observed changes in the View component, the animate function is called. Based on the animation
* provided, the target component is animated.
* @param {Array<String> | Array<Object> | Map} animation - The animation to be executed on the component for the different property value changes. If defined
* as an array, the first value is the animation for the property turning true, while the second is the animation for the property turning false. 
* Each of the individual animation can be defined as string, if one of the preset animations is to be used, or an object following the Animation structure.
* The animation can also be a Map object, relating the property values to the different animations.
* ```javascript 
*   const myAnimation = Map();
*   myAnimation.setValue(1, 'fade-in'); //Fades in when the property turns 1
*   myAnimation.setValue(5, 'shrink');  //Shrinks when the property turns 5
* ```
* @param {String} property - The property changed triggering the animation. (Deprecated, not used insided the function)
* @param {*} newValue - The property's new value.
* @param {Object} component - The DOM component to be animated.
* @example
* ```javascript 
*   animate(['fade-in', 'shrink'], 'visible')(false, myComponent);
* ```
*/
const animate = (animation, property) => (newValue, component) => { 
    //This is the approach for complex animations where to each value we assign an animation object.
    let selectedAnimation = {}; //Default for visible 

    //Avoid displaying fade out animation for components that should not be visible
    if(property === 'visible' && component?.style?.display === 'none' && !newValue) {
        return;
    }

    //Check the animation is formatted correctly. Example: animation: {visible: ['fade-in', 'fade-out']}
    if(Array.isArray(animation)) {
        if(newValue == null) return;
        try{selectedAnimation = newValue ? animation[0] : animation[1];}
        catch(error) {console.error("animate: animation should be in this format: ['in-animation', 'out-animation']"); return;}
    }
    //Example: const map = new Map(); map.set(true, 'fade-in'); map.set(false, 'fade-out'); animation: {visible: map}
    else if(animation && typeof animation === 'object') {
        try{selectedAnimation = animation instanceof Map ? animation[newValue] : undefined;}
        catch(error) {console.error('animate: No animation set for ' + newValue); return;}
    }
    else {console.error('animate: animation should be an Array or Map: ' + animation); return;}

    //Animations should go inside the ONEJS object
    if(typeof selectedAnimation === 'string') {//If it is a string, take it from the predesigned animations
        selectedAnimation = animations[selectedAnimation];
        if(!selectedAnimation) {console.warn('animate: No such animation: ' + selectedAnimation); return;}
    } 

    component.style.display = 'flex';//To always make sure the animation is displayed       
    try {
        component.animationController = component.animate(selectedAnimation.keyframes, selectedAnimation.options);
        component.animationController.onfinish = () => {
            if(selectedAnimation.style) Object.keys(selectedAnimation.style).forEach((key, value) => {
                component.style[key] = selectedAnimation.style[key];
            });
        };
    }
    catch(error) {console.error(error);} 
}

/** 
* @description A powerful component that acts as a container for other base components. It behaves like an HTML 'div' block with some additional features such as
* routing, positioning, animations and lifecycle events.
* @param {Boolean} visible - Determines whether the View is visible on the screen or not. For visibility to work, it is important that the initial value is undefined.
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
* Note: There is no explicit flavor property on web function definition. This is due to the fact that when it is passed as an attribute it already is applied 
* in the underlying Div styling the content. So passing flavor to a View component will act as expected styling the View.
* @example
* ```javascript 
*   View({visible: read('isVisible'), onVisibleChange: update('isVisible'), url: {visible: '/home1', link: 'home2'}, content: {v: 'top', h: 'left'}, expand: 1})('hello world');
* ```
* @returns {ReactElement} - The element corresponding to the View.
*/
export const View = ({visible=true, onVisibleChange=()=>{}, active=false, onActiveChange=()=>{}, content={h:'left', v:'top'}, self, animation, flavor, ...attributes}={}) => structure => {
    //Set onPropertyChange callback functions
    let internalOnPropertyChange = {};
    if(animation && typeof animation === 'object') {
        Object.entries(animation).forEach(([property, value]) => { 
            if(value) internalOnPropertyChange[property] = animate(value, property);
        })
    }
    const exeternalOnPropertyChange = attributes['onPropertyChange'];
    const finalOnPropertyChange = exeternalOnPropertyChange ? {...internalOnPropertyChange, ...exeternalOnPropertyChange} : internalOnPropertyChange;//Compose internal and external onPropertyChange
    delete attributes['onPropertyChange'];

    //Set style positioning: External inline styles need to be combined with the inline style style required for positioning the content
    const externalDisplay = mergeStyles(attributes['style'], attributes['inlineStyle'])?.display ?? 'flex';
    if(externalDisplay === 'flex') { //Only for 'flex' display property
        const positionInlineStyle = {
            display: visible ? 'flex' : 'none', 
            flexGrow: self?.expand ?? 0,              //Ability for a flex item to grow if there is too much space (0 CSS default).
            flexShrink: self?.shrink ?? 1,            //Ability for a flex item to shrink if there is not enough space (1 CSS default).  
            alignSelf: self?.align ?? 'auto',         //Transversal positioning of the item overriding parents content positioning.
            ...positionContent(content)
        };
        if(animation?.['visible']) positionInlineStyle.display = 'none'; //Avoids initial rendering and then happening the fade-out animation (blink). Fade-in is still displayed 
        attributes['inlineStyle'] = mergeStyles(positionInlineStyle, attributes['inlineStyle']);
    }

    //Set the style based on the input flavor. By default, no flavor is applied.
    const flavorStyle = {//Outer style. When there is a gradient it is applied to the Gradient itself.
        background: flavor?.backgroundGradient ? flavor?.backgroundGradient : (flavor?.backgroundColor ?? 'transparent'),
        borderWidth: flavor?.borderWidth ?? 0,
        borderStyle: flavor?.borderStyle ?? 'solid',
        borderColor: flavor?.borderColor ?? 'transparent',
        borderRadius: flavor?.radius ?? 0,
        ...flavor?.shadow
    }
    attributes['style'] = mergeStyles(flavorStyle, attributes['style']);

    if(attributes['onPress']) {//To make it consistent across web and native. Both can use onPress or onClick
        attributes['onClick'] = attributes['onPress'];
        delete attributes['onPress'];
    }
    
    //React does not handle Boolean values for custom attributes, therefore visible and active need to be transformed to numbers
    visible = visible === true ? 1 : (visible === false ? 0 : visible);
    active = active === true ? 1 : (active === false ? 0 : active);

    return HtmlDiv({visible: visible, active: active, onPropertyChange: finalOnPropertyChange, ...attributes})(structure);
};

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
* @description Standard text component to wrap all the texts in the application.
*/
// export const Text = BaseComponent('Text', true, 'p');
export const Button = ({flavor=readFlavor('default'), ...attributes}={}) => structure => {
    const buttonStyle = {
        background: flavor?.backgroundGradient ?? flavor?.backgroundColor ?? 'blue',
        color: flavor?.textColor ?? '#666',
        fontFamily: flavor?.fontFamily ?? 'AvenirNext, Arial, Sans-Serif',
        fontSize: flavor?.textSize ?? 16,
        fontWeight: flavor?.fontWeight ?? 'normal',
        borderWidth: flavor?.borderWidth ?? 0,
        borderStyle: flavor?.borderStyle ?? 'solid',
        borderColor: flavor?.borderColor ?? transparent,
        borderRadius: flavor?.radius ?? 0,
        ...flavor?.shadow,
        // minHeight: 30,
        padding: '10px 15px',
        textDecoration: 'none',
        transitionDuration: '0.4s',
        cursor: 'pointer',
        
        ':hover': {
            filter: 'brightness(110%)',
        },
        ':active': {
            filter: 'brightness(90%)',
        },
        ':focus': {
            outline: 'none',
        },
        '.disabled':  {
          opacity: 0.6,
          cursor: 'not-allowed',
        },
    };
    attributes['style'] = mergeStyles(buttonStyle, attributes['style']);

    return HtmlButton(attributes)(structure);
}

/** 
* @description Standard text component to wrap all the texts in the application.
*/
// export const Text = BaseComponent('Text', true, 'p');
export const Text = ({flavor=readFlavor('default'), ...attributes}={}) => structure => {
    const textStyle = {
        fontFamily: flavor?.textFont ?? 'AvenirNext, Arial, Sans-Serif',
        fontSize: flavor?.textSize ?? 16,
        color: flavor?.textGradient ? 'transparent' : flavor?.textColor,
        fontWeight: flavor?.fontWeight ?? 'normal',
        //Code below could be used to enable gradient text
        background: flavor?.textGradient ?? 'none',
        backgroundClip: flavor?.textGradient ? 'text' : undefined,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        lineHeight: 1.5
        // textFillColor: 'transparent';
    }
    attributes['style'] = mergeStyles(textStyle, attributes['style']);

    return HtmlP(attributes)(structure);
}

/** 
* @description Complete array of input types.
*/
const inputTypes = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 
                    'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 
                    'time', 'url', 'week'];

/** 
* @description Wrapper component for all the different types of inputs. It allows to work seamlessly with the different types of inputs and 
* react to the change events. It also provides styling options through the use of flavors.
* @param {String} [type] - The type of input, any of the standard html input types plus 'range', 'list' and 'textarea'.
* @param {Array<Object>} [options] - The options to be provided in 'list' or 'select' input types. They should follow the following format:
* ```javascript 
*   const options = [{value: 'vol', label: 'Volvo'}, {value: 'mer', label: 'Mercedes'}]; 
*   //'value' is the attribute to bind to using 'value' attribute of the input. 'label' is the displayed value.
* ```
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @example
* ```javascript 
*   const myInput = Input({type: 'list', options: [{value: 'vol', label: 'Volvo'}, {value: 'mer', label: 'Mercedes'}], flavor: 'danger'})
* ```
* @returns {ReactElement} - The element corresponding to the Input.
*/
export const Input = ({type, options, title, titleStyle, icon, iconStyle, content, flavor=readFlavor('default'), ...attributes}={}) => {
    //Standard input style
    const inputStyle = {
        color: flavor?.textColor ?? '#666',
        fontFamily: flavor?.textFont ?? 'AvenirNext, Arial, Sans-Serif',
        fontSize: flavor?.textSize ?? 16,
        fontWeight: flavor?.fontWeight ?? 'normal',
        ...flavor?.shadow,
        borderRadius: flavor?.radius ?? 0,
        transitionDuration: '0.4s',
        cursor: 'pointer',
        textDecoration: 'none',
        borderWidth: flavor?.borderWidth ?? 1,
        borderStyle: flavor?.borderStyle ?? 'solid',
        borderColor: flavor?.borderColor ?? '#ccc',
        minHeight: 40,
        background: 'white',
        padding: '5px 15px',
        '&::placeholder': { color: flavor?.neutralColor, },
        ':focus': {
            outline: 'none',
            borderColor: flavor?.primaryColor,
        }
    }
    //Standardize onPress and onClick
    if(attributes['onPress']) {//To make it consistent across web and native. Both can use onPress or onClick
        attributes['onClick'] = attributes['onPress'];
        delete attributes['onPress'];
    }
    
    //Textarea for longer text input
    if(type === 'textarea') {
        const textareaStyle = {
            background: 'white',
            padding: '10px 15px', 
            resize: 'none',
            overflow: 'auto',
        };
        attributes['style'] = mergeStyles(inputStyle, textareaStyle, attributes['style']);
        return HtmlTextarea(attributes)();
    }
    //Multiple choice input
    else if(type === 'select' || type === 'list') {
        attributes['style'] = mergeStyles(inputStyle, attributes['style']);
        //options (array): ['Volvo', 'Mercedes', 'Rolex', 'Cartier'];                           //For simple scenarios    
        //options (array): [{value: 'vol', label: 'Volvo'}, {value: 'mer', label: 'Mercedes'}]; //This is the standard definition       
        if(Array.isArray(options)) {
            return HtmlSelect(attributes)(options.map(item => HtmlOption({value: typeof item === 'string' ? item : item.value})(typeof item === 'string' ? item : item.label)));
        }
        //options (object): {cars: {volvo: 'Volvo', mercedes: 'Mercedes'}, watches: {rolex: 'Rolex', cartier: 'Cartier'}}; //Only allows 1 level of indentation
        else if(typeof options === 'object') {
            return HtmlSelect(attributes)(Object.entries(options).map(([key, value]) => {
                if(value && typeof value === 'object') {
                    return HtmlOptgroup({label: key})(Object.entries(value).map(([subkey, subvalue]) => {return HtmlOption({value: subkey})(subvalue)}));
                }
                else return HtmlOption({value: key})(value);
            }));
        }
        else {
            return HtmlSelect(attributes)();
        }
    }
    //Range slider input
    else if(type === 'range') {
        const rangeStyle = {
            padding: 0,
            appearance: 'none',
            // width: '100%',
            height: '2px',
            border: 'none',
            borderRadius: '5px',
            background: flavor?.primaryColor,
            outline: 'none',
            opacity: '0.8',
            transition: 'opacity .2s',
            '&:hover': {
                opacity: 1,
            },
            '&::-webkit-slider-thumb': {
                appearance: 'none',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                cursor: 'pointer',
                boxShadow: '2px 4px 6px rgba(0,0,0,0.2)',
            },
            '&::-moz-range-thumb': {
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                cursor: 'pointer',
            },
        } 
        attributes['style'] = mergeStyles(rangeStyle, attributes['style']);

        const min = attributes['min'] || 0;
        const max = attributes['max'] || 100;
        const value = 100.0 * (attributes['value'] - min) / (max - min);
        const inlineStyle = {//Styles the right and the left side of the thumb in a different color
            background: 'linear-gradient(to right, ' + (flavor?.primaryColor ??  'blue') + ' 0%, ' + (flavor?.primaryColor ??  'blue')  + ' ' + 
            value + '%, ' +  (flavor?.neutralColor ??  'grey') + ' ' + value + '%, ' + (flavor?.neutralColor ??  'grey') + ' 100%)',
        }
        return HtmlInput({...attributes, type: type, inlineStyle: inlineStyle}); //This overrides any style defined by the user
    }
    //Checkbox/Switch input
    else if(type === 'checkbox' || type === 'switch') {
        const checkboxInputStyle = {
            position: 'relative',
            appearance: 'none',
            outline: 'none',
            width: '50px',
            height: '30px',
            background: '#fff',                                         //Thumb color
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: flavor?.neutralColor ?? '#D9DADC',             //Border color
            border: '1px solid ',         
            borderRadius: '50px',
            boxShadow: 'inset -20px 0 0 0 #fff',                        //Track color when false
            transitionDuration: '0.4s',
            ':after': {
                'content': '""',
                position: 'absolute',
                top: '1px',
                left: '1px',
                background: 'transparent',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                boxShadow: '2px 4px 6px rgba(0,0,0,0.2)',
            },
            '&:checked': {
                boxShadow: 'inset 20px 0 0 0 ' + flavor?.primaryColor ?? 'blue', //Track color when true
                borderColor: flavor?.primaryColor ?? 'blue',
            },
            '&:checked:after': {
                left: '20px',
                boxShadow: '-2px 4px 3px rgba(0,0,0,0.05)',
            },
            ':focus': {
                outline: 'none',
                borderColor: flavor?.primaryColor ?? 'blue',
            },
        };
        attributes['style'] = mergeStyles(checkboxInputStyle, attributes['style']);
        return HtmlInput({...attributes, type: type}); //This overrides any style defined by the user

    }
    //Button inputs
    else if(type === 'button' || type === 'submit' || type === 'reset') {
        const buttonBackgroundStyle = {
            background: flavor?.backgroundGradient ?? flavor?.backgroundColor ?? 'blue',            
            padding: '10px 15px',
            cursor: 'pointer',
            transitionDuration: '0.4s',
            minHeight: 40,
            ':hover': {
                filter: 'brightness(110%)',
            },
            ':active': {
                filter: 'brightness(90%)',
            },
            ':focus': {
                outline: 'none',
            },
            '.disabled':  {
              opacity: 0.6,
              cursor: 'not-allowed',
            }
        }
        content = content ?? {h: 'center', v: 'center', direction: 'row', gap: 10};//Positions Title and Icon
        
        if(icon) {
            attributes['style'] = mergeStyles(buttonBackgroundStyle, attributes['style'])
            return View({content: content, flavor: flavor, ...attributes})([
                icon && Icon({icon: icon, style: iconStyle, flavor: flavor}), 
                Text({style: titleStyle,  flavor: flavor})(title)
            ]);
        }
        attributes['style'] = mergeStyles(inputStyle, buttonBackgroundStyle, attributes['style']);
        return HtmlInput({...attributes, type: type, value: title});
    }
    //Other Text inputs
    attributes['style'] = mergeStyles(inputStyle, attributes['style']);
    return HtmlInput({...attributes, type: type});
}

/** 
* @description Icon component for SVG icons. It enables using icons from the oneJS icon gallery or your own SVG icons. If you choose to use your own icons, there are
* two options: 
*   - Use webpack to import the raw SVG. [Pluralsight]{@link https://www.pluralsight.com/guides/how-to-load-svg-with-react-and-webpack}
*   - Create a .js file exporting the raw SVG as a string. Example: export myIconFont = {icon1: <svg>...</svg>, icon2: <svg>...</svg>}
* Note: Other options to import svg-s have been explored, such as reading from the file system or using html object tag and calling getSVGDocument. Both options delay the 
* loading of the icons.
* Useful icon fonts:
* [Google]{@link https://fonts.google.com/icons?selected=Material+Icons}
* [FontAwesome]{@link https://fontawesome.com/icons}
* [The Noun Project]{@link https://thenounproject.com}
* @param {String} [icon] - The name of the icon to be selected from the iconFont object.
* @param {Object} [iconFont] - An object containing the different icon names as property keys whose value is the raw SVG in a string.
* @param {Object} [iconFile] - The entire SVG imported into an object. To use this, Webpack must be configured accordingly.
* @param {Boolean} [raised] - If true, adds background to the icon simulating a raised button.
* @param {String | Number} [size] - Adjusts the size of the icon. For strings, 'large', 'medium' and 'small' options are available. Numbers represent the pixel size of the icon
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @example
* ```javascript 
*   import {myIcon} from './myIcon.svg'; //Using external SVG icons through Webpack. 'icon1' in the example below
*   import {myIconFont} from './myIconFont.js'; //Using external icon font as a JS object. 'icon2' in the example below
*   
*   const icon1 = Icon({iconFile: myIcon, raised: true, size: 'small'});
*   const icon2 = Icon({icon: 'icon2', iconFont: myIconFont, size: 40});
*   const icon3 = Icon({icon: 'oneJS', flavor: 'danger'});
* ```
* @returns {ReactElement} - The element corresponding to the Icon.
* @todo just leave icon: if it is a file use that (remove iconFont and iconFile)
*/
export const Icon = Component('Icon', false, ({icon, raised, size=32, flavor=readFlavor('default'), ...attributes}={}) => {
    size = flavor?.iconSize ?? size === 'large'? 64 : size === 'small'? 16 : size;
    const padding = Math.floor(parseInt(size) / 4);
    const gradient = flavor?.primaryGradient ? readIconGradient(flavor?.primaryGradient) : null;
    let iconStyle = {
        width: size, 
        height: size,
        fill: gradient ? 'url(#' + gradient.id + ')' : flavor?.primaryColor ?? 'blue',
        background: 'none',
        transitionDuration: 0.4,
        display: 'flex'
    }
    if(raised) {
        iconStyle = {...iconStyle, ...{
            background: flavor?.backgroundColor ?? 'blue',
            borderWidth: flavor?.borderWidth ?? 0,
            borderStyle: flavor?.borderStyle ?? 'solid',
            borderColor: flavor?.borderColor ?? 'transparent',
            borderRadius: flavor?.radius ?? '0px',            
            padding: padding,
            ...flavor?.shadow
        }};
    }
    attributes['style'] = mergeStyles(iconStyle, attributes['style']);

    //Webkit bug: When another icon with the same gradient id is not displayed in the screen, it can cause the current icon to be unable to display the svg gradient

    //For both icon fonts and files
    let selectedIcon = typeof icon === 'object' ? JSON.stringify(icon) : icon;
    if(!selectedIcon) return null;
    
    // const gradientCompmonent =  '<svg>' + gradient?.value + '</svg>';
    // selectedIcon = gradient ?   '<svg id="' + gradient.id + '">' + gradient.value + '</svg>' + selectedIcon : selectedIcon;
    // if(gradient) {
    //     const mySvg = document.createElement('svg');
    //     mySvg.innerHTML  = gradient?.value;
    //     document.body.prepend(mySvg);

    // }
    
    selectedIcon = gradient ? selectedIcon + '<svg>' + gradient.value + '</svg>' : selectedIcon;
    // selectedIcon = gradient ? selectedIcon.replace('>', ('>' + gradient.value)) : selectedIcon;
    return View({dangerouslySetInnerHTML:{__html: selectedIcon}, ...attributes})();
});

/** 
* @description Base component to display overlaying content. It provides customization options as well as functions to be triggered on user events.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @param {Component} [header] - Component to be embeded in the modal's header.
* @param {Component} [footer] - Component to be embeded in the modal's footer.
* @param {Boolean} [backdrop] - If true, displays a translucent background behind the modal.
* @param {Boolean} [closeIcon] - If true, displays a cross-shaped icon that closes the modal on click.
* @param {String} [size] - Adjusts the size of the modal. The followin options are available: 'large', 'medium' and 'small'. It is 'medium' by default.
* @param {Function} [onClose] - The function called when the user closes the modal. It can be used to change the value of state variables.
* @param {Component} [structure] - The component structure to be rendered inside the modal.
* @example
* ```javascript 
*   Modal({visible: read('openModal'), size: 'large', onclose: update('openModal'), header: 'This is my title'})(Text()('Hello World!')),
* ```
* @returns {ReactElement} - The element corresponding to the Modal.
*/
//Todo remove section font and fix size, better way to control it
export const Modal = Component('Modal', true, ({flavor=readFlavor('default'), header, footer, backdrop=true, closeIcon=true, size='medium', onClose=()=>{}, ...attributes}={}) => (structure) => {
    let contentStyle = {
        borderRadius: flavor?.radius ?? '0px',  
        backgroundColor: 'rgba(255, 255, 255, .85)',
        backdropFilter: 'blur(10px)',        
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', 
        zIndex: 1000,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95vw',
        height: '95vh',
        maxWidth: size === 'large'? 1000 : size === 'small'? 300 : size?.width ?? 500,
        maxHeight: size === 'large'? 600 : size === 'small'? 200 : size?.height ?? 300,
    };
    const closeButtonStyle = {
        background: 'none', 
        position: 'absolute', 
        top: 5, 
        left: 5, 
        fill: flavor?.neutralColor ?? '#999', 
        cursor: 'pointer',
        '&:hover': {opacity: '0.5'}, 
        '&:active': {opacity: '0.8'}
    };
    const headerStyle = {
        padding: '10px 0', 
        width: '100%', 
        borderBottom: '1px solid white', 
        fontFamily: flavor?.textFont ?? 'AvenirNext, Arial, Sans-Serif', 
        fontSize: flavor?.textSize ?? 18, 
        color: flavor?.textColor ?? '#333',
        fontWeight: flavor?.fontWeight ?? 'normal',
    };
    const footerStyle = {
        padding: '10px 0', 
        width: '100%', 
        borderTop: '1px solid white'
    };
    const backdropStyle = {id: 'backdrop', zIndex: 500, position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', background: 'rgba(0,0,0,0.5)'};

    contentStyle = mergeStyles(contentStyle, attributes['style']);
    delete attributes['style'];
    return View({visible: false, ...attributes})([
        backdrop && View({style: backdropStyle, content: {h: 'center', v:'center'}, visible: backdrop, onClick: (e) => {e.target.value = false; onClose(e);}})(),
        View({content: {h: 'center', v:'space', direction: 'column', wrap: false}, style: contentStyle})([
            closeIcon && Icon({style: closeButtonStyle, icon: 'iosCloseCircleOutline', onClick: (e) => {e.target.value = false;onClose(e);}}),
            header && View({style: headerStyle, content: {h: 'center', v:'center'}})(header),
            structure,
            // structure && View({expand: 1, content: {style: h: 'center', v:'space', direction: 'column', wrap: false} {background: 'pink'}})(structure),
            footer && View({style: footerStyle, content: {h: 'distribute', v:'center'}})(footer),
        ]),
    ]);
});

/** 
* @description Stacked views that allow the user to slide across the component's children. It provides customization options as well as functions to be triggered 
* on user events.
* Tips:
*   - If multiple sliders are to be used, give each of them a unique id. This is required for the hash location to be unique.
*   - Other elements can use the href property to move the slider or the location.hash = newHash method. 
*   - Setting the value state property does not move to the element. Rather move the element to set the state property.
*   - Works better setting height and width.
* @param {Number} value - The configuration assigning a value to each of the theme variables.
* @param {Function} [onChange] - The function called when the user slides to another view. It can be used to change the value of state variables.
* @param {Boolean} [bullets] - If true, displays a bullet per view on top of the slider. 
* @param {String} [direction] - The directon in which views can be slided. The possible values are: 'row' and 'column'.
* @param {Boolean} [scroll] - If true, the user is able to scroll across the views.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @param {Component} [structure] - The component structure to be rendered inside the slider.
* @example
* ```javascript 
*   Slider({value: read('slide'), onChange: update('slide'), direction: 'column', scroll: true})([Input(), Input(), Button()('My button')]);
* ```
* @returns {ReactElement} - The element corresponding to the Slider.
*/
export const Slider = Component('Slider', true, ({value = 0, onChange = ()=>{}, bullets = true, direction = 'row', scroll = true, flavor=readFlavor('default'), ...attributes}={}) => structure => {
    let mainStyle = {
        position: 'relative', //Required for the bullets to have their absolute positioning relative to this element 
        height: '200px', //Required for the container and the content to completely fill the slide space
        a: {backgroundColor: 'rgba(255, 255, 255, .85)',  textDecoration: 'none', backdropFilter: 'blur(10px)', borderRadius: '100%', margin: 5, height: 25, width: 25,
        color: flavor?.textColor ?? "#333", border: 'solid 1px ' + flavor?.primaryColor ?? blue, display: 'flex', justifyContent: 'center', alignItems: 'center',
        fontWeight: flavor?.fontWeight ?? 'normal'},
        'a[active]' : {backgroundColor: flavor?.primaryColor ?? 'blue', color: flavor?.backgroundColor ?? 'white'}, //Styles the active bullet
        '.sliderContainer': {flexWrap: 'nowrap'}
    }
    let containerStyle = {
        width: '100%',
        height: '100%',
        scrollSnapType: direction === 'column' ? 'y mandatory' : 'x mandatory', //Allows the content to snap on the different slides
        scrollBehavior: 'smooth',
        overflowX: direction === 'column' ? 'hidden' :  (scroll ? 'scroll' : 'hidden'), 
        overflowY: direction === 'column' ? (scroll ? 'scroll' : 'hidden') : 'hidden',
        // WebkitOverflowScrolling: 'touch', //this is required to work on ios
    }    
    let contentStyle = {
        scrollSnapAlign: 'start',
        width: '100%',
        height: '100%'
    }
    let id = attributes['id'] || ''; //Required id property in case there are multiple Slider-s, to have a unique hash location 
    let visibleEvent = (myValue) => (component) => { //Determines if an component is visible on the screen, and based on that updates the 'value' property
        if(!component) return;
        let options = { //root: by defaut is the screen, rootMargin: by default is 0          
          threshold: 0.55 //55% on screen
        }
        let callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                    onChange(myValue);
                }
            });
        };
        let observer = new IntersectionObserver(callback, options); //https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        observer.observe(component);  
    }
    attributes['style'] = mergeStyles(mainStyle, attributes['style']);
    //Update the url with the right component. This enables other components to modify the value property. Does not work, resets the hash on scroll
    // if(!scroll && location.hash !== '#' + id + 'Slide' + value) location.hash = '#' + id + 'Slide' + value;
    
    return View({name: name, self: {expand: 1}, style: mainStyle, ...attributes})([
        View({style: containerStyle, content: {direction: direction, wrap: false}, class: 'sliderContainer'})(
            structure.map((view, index) => View({onCreate: visibleEvent(index), content: {direction: direction, wrap: false}, self: {shrink: 0}, key: id + 'Slide' + index, id: id + 'Slide' + index, style: contentStyle})(view))), 
        bullets && View({content: {h: 'center', v:'center'}, self: {shrink: 0}, id: 'bullets', inlineStyle: {position: 'absolute', bottom: 0, width: '100%', zIndex: 3}})(
            structure.map((view, index) => HtmlA({key: index, active: parseInt(index) === parseInt(value) ? 1 : undefined, href: '#' + id + 'Slide' + index})(index)))
    ]);
});

/** 
* @description Base component to display overlaying content. It provides customization options as well as functions to be triggered on user events.
* @param {Flavor} [flavor] - The configuration assigning a value to each of the theme variables.
* @param {Component} [header] - Component to be embeded in the modal's header.
* @param {Component} [footer] - Component to be embeded in the modal's footer.
* @param {Boolean} [backdrop] - If true, displays a translucent background behind the modal.
* @param {Boolean} [closeIcon] - If true, displays a cross-shaped icon that closes the modal on click.
* @param {String} [size] - Adjusts the size of the modal. The followin options are available: 'large', 'medium' and 'small'. It is 'medium' by default.
* @param {Function} [onClose] - The function called when the user closes the modal. It can be used to change the value of state variables.
* @param {Component} [structure] - The component structure to be rendered inside the modal.
* @example
* ```javascript 
*   Modal({visible: read('openModal'), size: 'large', onclose: update('openModal'), header: 'This is my title'})(Text()('Hello World!')),
* ```
* @returns {ReactElement} - The element corresponding to the Modal.
* @todo add an optional back button
*/
//Todo remove section font and fix size, better way to control it
//Note that the parent component needs to have overlay hidden to work properly
export const SwipeCards = Component('SwipeCards', true, ({flavor=readFlavor('default'), onSwipe, icon, upIcon=true, onBack, size='medium', ...attributes}={}) => (structure) => {
    const device = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) ? 'touch' : 'mouse';
    const moveEvents = {mouse: {start: 'mousedown', move: 'mousemove', end: 'mouseup', press: 'click'}, touch: {start: 'touchstart', move: 'touchmove', end: 'touchend', press: 'press'}};

    let startPoint = {};
    let offset = {};

    // let potentialDirection = '';
    let [potentialDirection, setPotentialDirection] = React.useState('');
    let [selectedIndex, setSelectedIndex] = React.useState('');

    //probably it would be most optimal to work with the structure array
    const setupListeners = index => component => {
        let isMoving = false;
        const handleMove = e => {
            e.preventDefault();
            if(!startPoint) return;
            const touch = device === 'mouse' ? e : e.changedTouches[0];
            if(!touch) return;
            isMoving = true;
            offset.x = touch.clientX - startPoint.x;
            offset.y = touch.clientY - startPoint.y;
            const rotate = offset.x * 0.1;
            component.style.transform = `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg)`;
            if(Math.abs(offset.x) > component.clientWidth * 0.7) setPotentialDirection(offset.x > 0 ? 'right' : 'left');
            else if(-1 * offset.y > component.clientHeight * 0.5 && Math.abs(offset.x) < component.clientWidth * 0.3) setPotentialDirection('up');
            else setPotentialDirection('');
        }
        const handleMoveEnd = () => {
            document.removeEventListener(moveEvents[device].move, handleMove);
            setPotentialDirection('');
            if(isMoving && Math.abs(offset.x) > component.clientWidth * 0.7) {
                isMoving = false;
                dismiss(offset.x > 0 ? 'right' : 'left');
                return;
            }
            if(upIcon && isMoving && -1 * offset.y > component.clientHeight * 0.5 && Math.abs(offset.x) < component.clientWidth * 0.3) {
                isMoving = false;
                dismiss('up');
                return;
            }
            component.style.transition = 'transform 0.2s';
            component.style.transform = 'none';
            isMoving = false;
        }
        const dismiss = direction => {
            document.removeEventListener('mouseup', handleMoveEnd);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchend', handleMoveEnd);
            document.removeEventListener('touchmove', handleMove);
            component.style.transition = 'transform 0.3s';
            const vector = direction === 'right' ? 1 : -1; //The direction vector equals 1 for right and -1 for left and up
            if(direction === 'right' || direction === 'left')
                component.style.transform = `translate(${vector * window.innerWidth}px, ${offset.y}px) rotate(${90 * vector}deg)`;
            if(direction === 'up')
                component.style.transform = `translate(${offset.x}px, ${-1 * window.innerHeight}px)`;
            component.classList.add('dismissing');
            setTimeout(() => {
                component.remove();
            }, 300);
            if (typeof onSwipe === 'function') {
                onSwipe({id: component?.children[0]?.id, value: direction});
            }
        }

        component.addEventListener(moveEvents[device].start, (e) => {
            const touch = device === 'mouse'? e : e.changedTouches[0];
            if(!touch) return;
            startPoint.x = touch.clientX;
            startPoint.y = touch.clientY;
            const internal = 'babe';
            document.addEventListener(moveEvents[device].move, handleMove);
            component.style.transition = 'transform 0s';
        });

        window.addEventListener('swipe' + index, async (e) => dismiss(e.detail), false);

        document.addEventListener(moveEvents[device].end, handleMoveEnd);
        if(device === 'mouse') component.addEventListener('dragstart', (e) => e.preventDefault());
        else document.addEventListener('cancel', handleMoveEnd);
    }  
    const swipe = index => direction => () => {
        window.dispatchEvent(new CustomEvent('swipe' + index, {detail: direction}));//Called when the state variable is required to alert when changes by other state var. E.g.: user: /users/@userId, userID: '1234' (watched variable)
    }

    const swiperStyle = {
        position: 'relative',
        width: '100%',
        height: '95vh',
        maxHeight: size === 'large'? 600 : size === 'small'? 200 : size?.height ?? 300,
    }
    attributes['style'] = mergeStyles(swiperStyle, attributes['style']);
    const cardStyle = {
        position: 'absolute',
        borderRadius: flavor?.radius ?? '0px',  
        backgroundColor: 'rgba(255, 255, 255, .85)',
        backdropFilter: 'blur(10px)',        
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', 
        width: '95vw',
        height: '95vh',
        maxWidth: size === 'large'? 1000 : size === 'small'? 300 : size?.width ?? 500,
        maxHeight: size === 'large'? 600 : size === 'small'? 200 : size?.height ?? 300,
        cursor: 'pointer',
        userSelect: 'none',
        transform: 'none',
        transition: 'transform 0.2s'
    };
    const buttonContainerStyle = {
        background: 'white',
        padding: 5, 
        maxWidth: '100%',
        borderBottomLeftRadius: flavor?.radius ?? 0,
        borderBottomRightRadius: flavor?.radius ?? 0
    }
    const buttonStyle = {
        opacity: 1,
        transitionDuration: '0.3s',
        ':hover': {
            filter: 'brightness(110%)',
        },
        ':active': {
            filter: 'brightness(90%)',
        }
    }
    const overlayIconStyle = {
        position: 'absolute', 
        zIndex: 10,
        transitionDuration: '0.5s',
    }
    const overlayStyle = {
        position:'absolute', 
        zIndex: 5, 
        background: flavor?.neutralColor ?? 'rgba(0,0,0,0.5)', 
        width: '100%', 
        height: '100%',
        transitionDuration: '0.5s',
        borderRadius: flavor?.radius ?? 0
    }
    const leftFlavor = flavor?.rejectColor ? {...flavor, primaryColor: flavor.rejectColor} : flavor;
    let rightFlavor = flavor?.acceptColor ? {...flavor, primaryColor: flavor.acceptColor} : flavor;

    //limit to 5 cards
    return View({content: {h: 'center', v: 'center'}, ...attributes})([
        Icon({icon: icon?.left ?? 'mdClose', size: 'large', flavor: leftFlavor, style: [overlayIconStyle, {opacity: potentialDirection === 'left' ? 1 : 0}]}),
        Icon({icon: icon?.left ?? 'iosStar', size: 'large', flavor: flavor, style: [overlayIconStyle, {opacity: potentialDirection === 'up' ? 1 : 0}]}),
        Icon({icon: icon?.left ?? 'iosHeart', size: 'large', flavor: rightFlavor, style: [overlayIconStyle, {opacity: potentialDirection === 'right' ? 1 : 0}]}),
        structure.map((view, index) => View({onCreate: setupListeners(index), style: cardStyle, content: {h: 'stretch', v: 'space', direction: 'column', wrap: false}})([
            View({position: {h: 'center', v: 'center'}, style: {width: '100%', height: '100%', overflow: 'auto'}})(view),
            View({content: {h: 'center', v: 'center', gap: 10}, style: buttonContainerStyle})([
                Icon({icon: icon?.left ?? 'mdClose', raised: true,  onClick: swipe(index)('left'), flavor: leftFlavor, style: [buttonStyle, {opacity: potentialDirection ? 0 : 1}]}),
                upIcon && Icon({icon:icon?.up ?? 'iosStar', raised: true, onPress: swipe(index)('up'), flavor: flavor, style: [buttonStyle, {opacity: potentialDirection ? 0 : 1}]}), 
                Icon({icon: icon?.right ?? 'iosHeart', raised: true, onPress: swipe(index)('right'), flavor: rightFlavor, style: [buttonStyle, {opacity: potentialDirection ? 0 : 1}]}),             
            ]),
            View({style: [overlayStyle, {opacity: potentialDirection ? 0.2 : 0, display: potentialDirection ? 'flex' : 'none',
                background: (potentialDirection === 'left' && flavor?.rejectColor) ? flavor.rejectColor : (potentialDirection === 'right' && flavor?.acceptColor) ? flavor.acceptColor : flavor?.primaryColor ?? 'black'}]})(),
        ])),
        
    ]);
});