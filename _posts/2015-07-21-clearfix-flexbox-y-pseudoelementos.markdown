---
layout: post
title:  "¡Muerte al clearfix! Flexbox y los pseudo-elementos CSS"
date:   2015-07-21 00:00:00
categories: [diseno-web]
tags: 
- flexbox
- css
- sass
- compass
---

Ayer, mientras trabajaba en [la última versión de esta página](https://github.com/idiazroncero/idiazroncero.github.io/commit/7ea365bd972fff99e2a5436e6084ef4ee3816a2e), me encontré con uno de esos molestos momentos *pero-qué-coj******-está-pasando* que tanto ayudan a progresar en los escarpados senderos del CSS.


<blockquote class="twitter-tweet" data-cards="hidden" lang="es"><p lang="es" dir="ltr">Tras un rato de romperme la cabeza, descubro que los pseudo-elementos CSS AFECTAN al flexbox. Pronto lo cuento en <a href="http://t.co/Xc9UquotU9">http://t.co/Xc9UquotU9</a></p>&mdash; Ignacio Díaz-Roncero (@idiazroncero) <a href="https://twitter.com/idiazroncero/status/623096651251625984">julio 20, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## El diseño

El nuevo menú de idiazroncero.com está basado en tres bloques: el `div` de la izquierda contiene la versión actual de la web, el de la derecha las redes sociales y RSS y en el centro un `ul` contiene el menú de categorías.

![El diseño del menu](/images/flexbox01.png)

Para distribuir los tres elementos a lo ancho de su contenedor decidí optar por `flexbox`. El modelo de display `flex` es algo así como el mesías del CSS: anunciado desde hace años como la panacea de todos nuestros males, desde hace unos meses se considera ya maduro como para ser utilizado en navegadores modernos.

Para entender el por qué de tanta expectación, basta escuchar algunos gritos de la religión `flex:

- *¡Muerte al float! ¡Larga vida al flex!*

- *¡Viva el centrado vertical! ¡Muerte al display:table-cell o al transform:translate(-50% -50%)!¡No mas position:absolute innecesario! ¡Viva el flex!*

- *¡Muerte al clearfix! ¡Larga vida al flex!*

- *¡No sé cuál es el height ni me importa! ¡Dame cualquier width! ¡Eres mi señor, oh flex!*

(Algún día desarrollaré todo esto con más detalle)

En resumen: el modelo de caja `flex` permite solucionar la mayoría de problemas de posicionamiento y distibución de elementos, particularmente en ausencia de valores conocidos de alto y ancho.

Es por ello que decidí lanzarme a por la sintaxis `flex` y ordenar al contenedor de mi menú que distribuyese horizontalmente las tres cajas maximizando automáticamente el espacio entre ellas y provocando una alineacion perfecta izquierda-derecha-centro[^1].

{% prism scss %}
.mainmenu {
	@include display-flex();
	@include justify-content(space-between);
	border-top:1px solid $gris-medio;
	border-bottom:1px solid $gris-medio;
}
{% endprism %}


## El momento waddafack?

¿Pero qué coj****?

![Algo no va bien](/images/flexbox02.png)

¿De dónde sale ese espacio a la derecha?

Repasemos el tutorial [flexbox in five minutes][flex]. Caramba, aquí sí que sale bien.

Dado un `div` con `display:flex` que contiene tres elementos, dichos elementos pueden tener un valor explícito de alto y ancho o, como es mi caso, fluir y depender de su contenido.

Si se da un valor `justify-content: space-between`, la caja se encarga automáticamente de distribuir los tres elementos equitativamente en el plano horizontal:

{% include figure.html src="/images/flex-example1.png" caption="Valores de justify-content.Fuente: http://www.ideago.co/" %}

Es decir: en mi caso, "beta" está en su sitio, pero el `ul` y los iconos no.

Y no, no me he dejado ningún elemento html suelto.

Una pena. Yo que estaba pensando en lo genial que es esto del `flex`. Fíjate que para conseguir esto mismo con `floats`, hubiera tenido que dar valores explícitos de ancho a cada elemento de modo que entre los tres sumaran el 100% del ancho. Y luego hubiera tenido que alinear el texto de uno a la izquierda, el otro al centro y el último a la derecha.

Y encima, el elemento contenedor habría perdido toda su altura al estar todos sus hijos flotados y tendría que haber añadido un `clearfix`.

Copón.

¡El `clearfix`! ¡Me lo había dejado encendido!

## Los pseudo-elementos no son tan pseudo

Puesto que mi primera opción fue usar floats, mi SCSS incluía un clearfix de Compass que utiliza la técnica de añadir un pseudo-elemento:

{% prism scss %}
.mainmenu {
	@include pie-clearfix();
}
{% endprism %}

El pseudo-elemento añadido es el siguiente:

{% prism css %}
.mainmenu:after {
  content: "";
  display: table;
  clear: both;
}
{% endprism %}

Inspecciono el código y lo encuentro:

![El pseudo-elemento del horror](/images/flexbox03.png)

Este pseudo-elemento __estaba siendo considerado por parte del `flexbox` como un elemento de pleno derecho__, de modo que la caja estaba siendo *correctamente* dividida en cuatro porciones, no en tres.

A ojos de `flex`, no hay nada *pseudo* en un `:after`.

Como el pseudo-elemento no tiene `content` alguno, ni color, el resultado era un hueco en blanco.

Eliminado el innecesario clearfix, el menú vuelve a la normalidad y los tres bloques se distribuyen correctamente a lo ancho de su elemento padre.

Una vez más, la justicia CSS triunfa sobre el mal.

Y todo ello, gracias al `flexbox`.

¡Muerte al clearfix!



[^1]: Nótese que uso `@mixins` de Compass. Esto se debe a que la sintaxis de `flexbox` ha pasado por varias versiones, y muchos navegadores utilizan todavía todas o algunos propiedades deprecadas. Estos `@mixins` ayudan a proporcionar alternativas (fallbacks) para dichos navegadores.


[flex]: http://flexboxin5.com/