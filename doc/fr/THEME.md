# Thème

## [Material-ui](https://material-ui.com/)

C'est le choix qui a été fait pour la gestion du thème du starter. Si vous ne souhaitez pas utiliser material-ui, ce starter n'est probablement pas fait pour vous.

### Material is not material

*Contrairement aux idées reçues, material-ui ne veut pas dire material*. Cette librairie permet de simplifier la mise en place d'un thème et met également à disposition de nombreux composants, totalement modifiables. Parmi ces composants, on retrouve notamment :
- Typography : pour gérer vos textes
- Modal: Pour créer des modals
- Grid: Pour la mise en place d'une grille responsive
- etc

Je vous conseille vivement de jeter un oeil à la liste des composants disponibles. Vous vous rendrez vite compte du gain de temps potentiel que son utilisation peut vous apporter !

Vous pouvez modifier le thème dans le fichier suivant : `/client/MUITheme.js`

Jetez un oeil à la page `/_sandbox` pour avoir un aperçu de votre thème actuel. Cette page est automatiquement désactivée en production donc ne la supprimez pas! :)

## JSS

Oui, je ne vous ai pas tout dit. Material-ui c'est une chose, mais il faut également savoir que dans ce starter, le style est géré en "Css-In-Js". Ce qui signifie que le bon vieux CSS a été remplacé... Par du JavaScript!

**Cela apporte de nombreux avantages :**
- Accès à l'objet thème n'importe où lorsque vous définissez vos styles
- Plein de plugins cools à ajouter
- Possibilité d'utiliser des fonctions pour générer votre style 
- En production, vos classes sont générées de manière à être moins longues et correctement préfixées
- Aucun style non-utilisé ne sera généré. 100% des styles finaux sont donc utilisés
- C'est du Js 

Voici un exemple :

    const styles = theme => ({
	    title: {
		    fontSize: theme.typography.h1.fontSize,
		    color: theme.palette.primary.main,
		    [theme.breakpoints.down('md')]: {
			    fontSize: 14
		    }
	    }
    });