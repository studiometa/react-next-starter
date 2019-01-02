# Components

If you take a look at the `/client/components` folder you will notice 3 sub-folders :

- **_doc** : Contains some components used for documentation pages. You will normally never need to touch it.
- **common** : Contains some frequently used components common to all pages
- **utils** : Contains a library of several components ready-to-use and supposed to help you in the development of your project

## common

### PageLayout.js

This component is a wrapper used in all pages. We strongly recommend that you use it every time.
It allows you for example to add your Header or Footer on all pages, but also to apply a layout common to each of them. It is also this component that is indirectly responsible for generating the `<meta>' tags for your pages (see Head.js component below).

By default, the following props are available for this component. However, depending on your needs, you will probably have to modify this component to add the functionalities you consider necessary:

        
| Name | Require | Type | Description | Default |
|------|---------|------|-------------|---------|
| children | Yes | any | Your page content | - |
| backgroundColor | No | string | Allows you to change the background color of your page | theme.palette.grey[50] |
| pageData | Yes | Object | Contains the pageData object. Pass an empty object if your page does not need it. If pageData is not defined, the page will return a 404 | - |
| debug | No | Object |Passing any object to this prop displays a debugger at the bottom of the page using the react-inspector library. This feature is only available in development | - |


### Head.js

This component is mainly used as a wrapper for the [NextJs Head](https://github.com/zeit/next.js#populating-head) component.

It is used to generate the `<head>` tag for all your pages. Note that the page title can be defined via the `pageData` object or through the `PageLayout` component using the `title` prop. The `<meta>` tags are only generated via the `pageData` object. However, you can define default tags in the `seo.config.js` file using the `defaultMetaTags` attribute.

### Header.js

Designed as an example, it is simply the Header present on all the starter pages. If your project requires a header, you can take it back and modify it to your liking. If not, delete it.

## Utils

### LangSwitch.js

This component displays a language selector. All the logic is in place, all you have to do is customising it as you wish.

Here are some interesting features : 
- Allows you to change the language while remaining on the same page (only works with static URLs for the moment)
- Works with or without the `enableRouteTranslation` parameter enabled
- Works even if JavaScript is disabled on the client side
- No props required, you can place this component anywhere without having to configure it


### LazyImage.js

As its name suggests, this component makes it easy to create lazy-loaded images. It also works with
background-images. In case of loading error, the following image will be displayed: `/static/imgs/fallback_image.png`. 

Here is the list of props of this component:

| Name | Required | Type | Description | Default |
|------|----------|------|-------------|---------|
| src | No | String | The image source | - |
| width | No | String, Number | The image width | '100%' |
| height | No | String, Number | The image height | '100%' |
| useBackgroundImage | Non| Boolean | Define if the image should be display as a background-image | false |
| noSkeleton | No | Boolean | If true, the skeleton used to animate the loading of the image will be disabled | false |
| className | No | String | A class that can be applied to the image | - |

### NoScript.js

Allows to create a 100% functional and isomorphic `<noscript>` tag.

**nb**: If you want to perform the reverse mechanics, i. e. hide an element when JavaScript is enabled
        on the client side, you can assign it the class `hidden-no-script`. This will have the effect of applying a
        `display: none;` to your element. It's not ideal, but it can be practical. Take a look at the LazyImage.js component
        for an example of use.

### Skeleton.js

This component generates a "skeleton-screen".

Here is the list of the props of this component: 

| Name | Required | Type | Description | Default |
|------|----------|------|-------------|---------|
| count | No | Number | Number of lines to be generated | 1 |
| duration | No | Number | Animation duration in seconds | 1.2 |
| width | No | Number, String | Skeleton width | null |
| wrapper | No | ReactNode | Allows to add a wrapper to the skeleton | null |
| lineHeight | No | Number, String | Height of a skeleton line | 'normal' |
| className | No | String | Adds a class to the component | - |
| styles | No | Object | Add some styles to the component | - |


### ResponsiveModal.js

Allows to generate a modal running on mobile phones. This component is a wrapper to the [Modal component](https://material-ui.com/api/modal/#modal) of material-ui.

Here is the list of the props of this component:
    
| Name | Required | Type | Description | Default |
|------|----------|------|-------------|---------|
| isOpen  | Yes | Boolean | Defined if the modal is displayed or not | - |
| closeModal  | Yes | Function | Callback to call to close the modal | - |
| modalProps | No | Object | Custom props that can be applied to the Modal component | - |
| paperProps | No | Object | Custom props that can be applied to the Paper component | - |
| contentProps | No | Object | Custom props that can be applied to the DialogContent component | - |
| maxWidth | No | String, Number | Max modal width on desktop | 480 |
| noCloseBtn | No | Boolean | Hide the modal close button | false |
| fullScreen | No | Boolean | Allows you to display the modal in full screen | false |
| title | No | String | Optional title of the modal  | - |
| bottomActions | No | ReactNode | Allows to add elements in the modal footer | - |

### PageBuilder

WIP.