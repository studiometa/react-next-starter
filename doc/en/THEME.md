# Theme

## [Material-ui](https://material-ui.com/)

This is the choice that has been made for the management of the starter theme. If you don't want to use material-ui, this starter may not be for you.

**Contrary to popular belief, material-ui does not mean material design. This library makes it possible to simplify the implementation of a theme and also makes available many components, totally modifiable. Among these components, we find in particular:
- Typography: to manage your texts
- Modal: To create modals
- Grid: For the implementation of a responsive grid
- etc.

I strongly advise you to take a look at the list of available components. You will quickly realize the potential time savings that its use can bring you!

You can modify the theme in the following file: `/client/MUITheme.js`

Take a look at the `/_sandbox` page to get an overview of your current theme. This page is automatically disabled in production so don't delete it! :)

## JSS

Yes, I didn't tell you everything. Material-ui is one thing, but it is also important to know that in this starter, the style is managed in "Css-In-Js". This means that the good old CSS has been replaced... By JavaScript!

**This brings many advantages: **
- Access to the theme object anywhere when you define your styles
- Lots of cool plugins to add
- Possibility to use functions to generate your style 
- In production, your classes are generated in such a way that they are shorter and correctly prefixed
- No unused styles will be generated. 100% of the final styles are therefore used
- It's Js. 

Let's take an example :

    const styles = theme => ({
	    title: {
		    fontSize: theme.typography.h1.fontSize,
		    color: theme.palette.primary.main,
		    [theme.breakpoints.down('md')]: {
			    fontSize: 14
		    }
	    }
    });