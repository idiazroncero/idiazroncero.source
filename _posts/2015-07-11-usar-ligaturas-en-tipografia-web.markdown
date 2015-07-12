---
layout: post
title:  "Ligaduras en tipografía web (actualizado)"
date:   2015-07-11 00:00:00
categories: [diseno-web]
tags: 
- tipografia
- ligaduras
- css
image: /images/ligatura-muestra.png
---

<div class="actualizado"><a href="#correccion">Actualizado el Domingo 12 de Julio a las 18:26 horas</a><br/>Motivo: el error con las ligaduras comentado se debía al modo automático de FontSquirrell</div>

A la hora de enfocar este sitio web, una de las cuestiones con las que quise experimentar son las ligaduras tipográficas.

Una ligadura es la unión de dos o más grafemas (letras, símbolos). Generalmente, estos dos grafemas por separado tienden a colisionar: por ejemplo, la unión de la letra efe y la i en ciertas tipografías puede provocar que el punto de la i "choque" con la parte superior de la efe.

Desde hace un tiempo, CSS3 soporta experimentalmente las tipografías con ligaduras.

Sin embargo, para usar ligaduras no basta con escribir las propiedades CSS adecuadas. La fuente que utilicemos debe tener definidos glifos para las ligaduras más comunes.

La fuente tipo serif de esta web, [Calendas Plus], es un ejemplo excelente de tipografía con ligaduras. He aquí una captura de pantalla de varias de sus propuestas:

![Ligaduras de Calendas Plus](/images/ligaturas.png)

Para activar las ligaduras, y dado que estamos ante un código experimental, tenemos que usar dos sintaxis diferentes y el prefijo `webkit`:

{% prism css %}
body {
	text-rendering: optimizeLegibility;
	-webkit-font-variant-ligatures: common-ligatures;
	font-variant-ligatures: common-ligatures;
}
{% endprism %}

`text-rendering` forma parte de una especificación más amplia, la cual indica al navegador cómo deseamos que se rendericen las fuentes. En este caso, optimizar legibilidad provoca la activación de las ligaduras, entre otros efectos.

Por su parte, `font-variant-ligatures` es una propiedad mucho más específica que, como su nombre indica, activa las ligaduras.

Ateniendo a su compatibilidad en navegadores (cross-browser), podríamos decir que `text-rendering` sirve como alternativa (fallback) para navegadores que aún no hayan implementado `font-variant-ligatures` (especialmente Safari y Opera Mini).

Ambas son actualmente "recomendaciones", siendo `font-variant-ligatures` una recomendación __candidata__ Esto significa que esta última tiene muchas posibilidades de acabar formando parte de la especificación oficial de CSS, y es por esto que la mayoría de los navegadores modernos la entiende ya sin problemas.

Además, los navegadores incapaces de renderizar las ligaduras simplemente muestran las letras originales. Es por ello que usar estas propiedades CSS, pese a no ser aún oficiales, es __seguro__ a nivel de SEO, accesibilidad y legibilidad.

## Campo de pruebas

En esta web, un texto susceptible de ser ligado se ve de la siguiente manera:

<p style="font-size:3rem; text-align:center; line-height:3rem">fi, fl, ffi, ffl</p>

Sin activar las ligaduras en el CSS, se vería así:

<p style="font-size:3rem; text-align:center; line-height:3rem; text-rendering: optimizeSpeed;
	-webkit-font-variant-ligatures: no-common-ligatures;
	font-variant-ligatures: no-common-ligatures;">fi, fl, ffi, ffl</p>

Las ligaduras que se activan automáticamente, no obstante, son __muy pocas__ respecto al total de ligaduras que una fuente como Calendas Plus tiene. 

Para usar las ligaduras que no aparecen automáticamente, podemos inspeccionar la fuente usando herramientas como el catálogo tipográfico de Mac para obtener al código Unicode de cada grafema. También podemos consultar directamente las ligaduras más comunes en [artículos como éste](http://adamdscott.com/ligatures-on-the-web/).

Una vez tenemos el codigo, en sitios como [Unicode Table] podemos obtener la entidad html adecuada.

Por ejemplo, en Calendas Plus la ligatura __&OElig;__ - que no se activa al escribir "OE" - corresponde al carácter Unicode `U+0152`. Según [Unicode Table][Unicode Table OE], su entidad HTML es `&#338;` o `&OElig;`. Escribimos:

{% prism html %}
<p>&#338;</p>
{% endprism %}

Y obtenemos:

<p style="font-size:3rem; text-align:center;" >&OElig;</p>

## Un mundo imperfecto

No soy para nada un experto en tipografía web, pero lo poco que sé me sirve para saber que es un mundo complejo y un poco caótico. 

Existen multipicidad de formatos de fuente, como todo el que se haya enfrentado a un `@font-face` sabe.

El correcto funcionamiento de las ligaduras y la capacidad de usar entidades html dependerá, en última instancia, del esfuerzo que hayan hecho los autores de la fuente en preparar sus fuentes para la web y/o de lo correctamente que haya hecho su trabajo el conversor de fuentes.

En mi caso, Calendas Plus es una excelente fuente enfocada al medio escrito que *no* viene preparada para un `@font-face`. Se descarga sólo en formato `*.otf`, y hay que realizar la conversión manualmente.

Para usarla en esta web, la pasé por el conocido [Webfont Kit Generator de FontSquirrell]. <del>En algún punto, desconozco por qué, ligaduras como la que une la ese con la te dejaron de funcionar, pese a ser ligaduras "oficiales" con su entidad HTML bien asentada y su UNICODE asignado.</del>

<div id="correccion"></div>

> __CORRECCIÓN__
>
> *Para acceder a todas las ligaduras de la fuente tal y como definidas en su formato OpenType hay que usar el generador avanzado de FontSquirrell y hacerse un sub-setting manual.*
>
>*El proceso de escribir este post me hizo investigar un poco más y no ha sido difícil resolverlo. Mi error fue usar el modo automático de FontSquirrell. Es por eso que los siguientes párrafos han quedado obsoletos y este blog ya dispone de todas las ligaduras definidas en la tipografía.*
>
>*Pronto escribiré una entrada explicando cómo conseguirlo.*

Lo cual nos lleva a otra pequeña frustración: Calendas Plus viene con una tonelada de ligaduras increíbles que muestran en su [página web][Calendas Plus]:

![Muestra de Ligaduras en Calendas Plus](/images/ligatura-muestra.png)

Sin embargo, la mayoría de ellas son ligaduras *propias* de la fuente, accesibles a través de un inspector de glifos como los de Word o Adobe pero __inexistentes en el estándar internacional UNICODE y, por tanto, *totalmente* inútiles en la web__ (desde el punto de vista de la tipografía, claro).

Una pena, porque estamos hablando de ligaduras tan geniales como las siguientes:

![Ligaduras raras](/images/ligatures-weirdo.png)

En definitiva, merece *mucho* la pena optar por fuentes que incluyen ligaduras, ya que en tamaños pequeños aumentan la legibilidad y en grandes resultan de gran belleza. 

Sin embargo, todavía queda mucho camino por recorrer para poder explotar todo el potencial creativo de las ligaduras en la tipografía web. En comparación con su uso en diseño gráfico (inDesign, Photoshop), nos encontramos con dos grandes limitaciones:

* La necesidad de que los autores de la fuente acomentan el enorme trabajo de adaptar todos los formatos a la web __y que nosotros, con nuestras herramientas, realicemos un buen trabajo en la conversión y el subsetting__

* Las limitaciones del UNICODE: la necesidad de trabajar con un elenco predeterminado de opciones y la imposibilidad técnica de acceder a todas las posibilidades que los autores de la tipografía hayan preparado.

[Calendas Plus]: http://www.calendasplus.com
[Unicode Table]: http://unicode-table.com/es/
[Unicode Table OE]: http://unicode-table.com/es/0152/
[Webfont Kit Generator de FontSquirrell]: http://www.fontsquirrel.com/tools/webfont-generator