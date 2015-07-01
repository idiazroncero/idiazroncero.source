---
layout: post
title:  "Traduciendo la interfaz de Baker Framework"
date:   2015-06-29 00:00:00
categories: [apps]
tags: 
- baker
- i18n
- l10n
- gist
---

## Qué es Baker Framework

[Baker][baker] es un excelente entorno de trabajo (framework) dedicado a la publicación de contenidos digitales en iPad y iPhone.

En términos menos abstractos, Baker es una plantilla prediseñada de xCode, el entorno de desarrollo de Apple. Baker viene preparado para que, sin saber ni jota de Swift o Objective-C (los lenguajes con que se programan apps) puedas poner en el App Store desde un simple folleto hasta una extensa librería digital.

Con Baker se han hecho informes, revistas, libros de cuentos, periódicos, experimentos digitales, panfletos...

La mayor fortaleza de Baker, aparte de su gratuidad, es que cada número a publicar es básicamente un micrositio web. Se escribe en HTML, CSS y JS. Entiende de Media Queries, @font-face y CSS3. Si lo ves en tu navegador, lo ves en el iPad.

Es decir, __si sabes cómo hacer páginas web, ya sabes también cómo hacer una revista digital en formato App__. En un mercado en el que las soluciones de publicación digital en formato App no bajan de los 1500$ anuales + 300$ por número publicado, Baker brilla con luz propia.

## La traducción de la interfaz.

Actualmente estoy usando Baker para un proyecto que posiblemetne verá la luz en otoño de 2015. Como parte de este proyecto, tuve que localizar (traducir) los mensajes de la interfaz por defecto de Baker. Mensajes como *"número descargado"*, *"no disponible"* o *"suscríbete"*.

He contribuido dicho código a la [Wiki de baker][wiki], de modo que todo aquel que quiera traducir su App al castellano tenga el trabajo ya realizado.

Podéis verlo también en [este gist][gist]:

<script src="https://gist.github.com/idiazroncero/b3b58ee586a2264d2746.js"></script>

## Cómo traducir tu proyecto

1. Abre/crea un proyecto basado en Baker usando xCode[^1].

2. Por defecto, el único idioma activado es el inglés. Para acceder a la información de localizaciones, selecciona primero tu App como proyecto (xCode diferencia entre el "proyecto" y el "target"):

    ![Selecciona "proyecto"](/images/baker01.jpg)

3. Cambiará la información que aparece en el centro del editor. En la pestaña "Info", busca la sección "Localizations" y pulsa el botón +  para añadir el idioma español:

    ![Añade "Spanish"](/images/baker02.jpg)

4. Aparecerá un pop-up. Acepta para crear una versión del archivo original (en inglés).

5. Navega, usando la barra lateral, hasta Baker > Supporting Files > Localizable.strings > Localizable.strings (Spanish)

    ![Busca el archivo creado](/images/baker03.jpg)

6. Copia y pega el contenido de mi [gist][gist]. Modifica lo que consideres oportuno[^2]. Salva el archivo. ¡Listo!


[baker]: http://www.bakerframework.com/
[wiki]: https://github.com/bakerframework/baker/wiki/Localized-interface#existing-localizations
[gist]: https://gist.github.com/idiazroncero/b3b58ee586a2264d2746

[^1]: Xcode es gratuito, sólo funciona en Mac y se puede descargar [aquí](https://developer.apple.com/xcode/)
[^2]: Como dice el comentario en el gist, mi proyecto usa "subscripción" en lugar de "suscripción" debido a que esta es la decisión editorial del proyecto para el que se realizó la traducción. No obstante, la RAE recomienda [suscripción](http://www.fundeu.es/consulta/suscripcion-1173/)
