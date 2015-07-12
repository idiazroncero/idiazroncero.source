---
layout: post
title:  "Cómo se hizo el título de este blog: siglas y acrónimos animados usando puro CSS3"
date:   2015-07-01 00:00:00
categories: [diseno-web]
tags: 
- css3
- codepen
- animacion
- ideas
image: /images/idr-featured.jpg
---

El encabezado de este blog fue un pequeño reto personal que me propuse realizar usando sólo CSS3. Es una idea muy vistosa y que __puede quedar especialmente bien con acrónimos y siglas__, definiendo dos estados del título - "contraído" y "expandido" - que son activados al pasar el ratón por encima del título.

Además, al utilizar puro CSS3 y no depender de modificaciones en el DOM[^1], esta técnica degrada grácilmente en lectores para invidentes o en ausencia de Javascript. 

Otra ventaja de usar sólo CSS3 es que no interfiere en absoluto con el SEO o las metatags de redes sociales (open graph, twitter cards), las cuales leen sin problemas el título en su formato "expandido";

Este tutorial muestra cómo lograr la versión más básica del efecto, que es la siguiente (pasa el ratón sobre *"UN"* para verlo en acción):

<p data-height="268" data-theme-id="0" data-slug-hash="qdxBJW" data-default-tab="result" data-user="idiazroncero" class='codepen'>See the Pen <a href='http://codepen.io/idiazroncero/pen/qdxBJW/'>Título animado en :hover</a> by Ignacio Díaz-Roncero Fraile (<a href='http://codepen.io/idiazroncero'>@idiazroncero</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


## 1.- Trocea el título

Para lograr la animación por separado de cada letra necesitamos declarar un `<span>` por cada letra del título. Además, con el objetivo de poder tratar independientemente los atributos de cada letra, le daremos a cada `span` una clase diferente.

Los puristas del [BEM] y [OOCSS] me matarán al ver esto, pero mi estrategia para poder saber exactamente qué clase pertenece a cada letra es asignar a cada una un nombre igual a lo que llevamos del título hasta su posicion. Es decir, mientras que la primera *n* de *United Nations* toma la clase `.un`, la segunda es `.united-n` y la última `.united-nation`.

Cada cual puede tomar aquí la estrategia de nomenclatura que mas le plazca.

{% prism markup %}
<h1>
    <span class="u">U</span>
    <span class="un">n</span>
    <span class="uni">i</span>
    <span class="unit">t</span>
    <span class="unite">e</span>
    <span class="united">d</span>
    <span class="united-">&nbsp;</span>
    <span class="united-n">N</span>
    <span class="united-na">a</span>
    <span class="united-nat">t</span>
    <span class="united-nati">i</span>
    <span class="united-natio">o</span>
    <span class="united-nation">n</span>
    <span class="united-nations">s</span>
</h1>
{% endprism %}

Puesto que, como veremos más adelante, el 99% de la técnica consiste en __animar la propiedad `max-height`__, necesitamos que cada `span` se comporte como un elemento de tipo block[^2]. Sin embargo, declarar un simple `display:block` provocará que cada letra tome una línea diferente, rompiendo el título.

Una opción es flotar a la izquierda cada `span`, pero esto nos impedirá aplicarle a `h1` el `text-align:center` que hace que, al expandirse, el texto crezca de manera automática __desde el centro hacia los extremos__.

Es por ello que sólo nos queda usar `display: inline-block`. Y aquí nos vamos a encontrar con el primer problema.

{% prism css %}
h1 span {
  display:inline-block;
}
{% endprism %}

Bienvenidos a uno de los problemas más <del>coñazo</del> pesados que conozco en HTML. No voy a explicarlo entero, puesto que hay un [post excelente en CSS-tricks][inline-block]. El resultado de usar `inline block` sobre un HTML escrito *para humanos* (es decir, separando cada `span` con un salto de línea) es que aparece un indeseable espacio entre letras:

![Un efecto indeseado](/images/inline-block.png)

En el [enlace anteriormente citado][inline-block] tenéis varias técnicas para resolverlo. Yo suelo, o bien agolparlo todo y hacerlo ilegible:

{% prism markup  %}
<h1>
  <span class="u">U</span><span class="un">n</span><span class="uni">i</span><span class="unit">t</span><span class="unite">e</span><span class="united">d</span>...
{% endprism %}

O bien aplico el truco descrito en CSS-Tricks por el cual se "engaña" al HTML poniendo las tags de apertura y cierre de cada `span` en líneas diferentes:

{% prism markup %}
<h1>
  <span class="u">
  U</span><span class="un">
  n</span><span class="uni">
  i</span><span class="unit">
  t</span><span class="unite">
  e</span><span class="united">
  d</span><span class="united-">
  &nbsp;</span><span class="united-n">
  N</span><span class="united-na">
  a</span><span class="united-nat">
  ...
{% endprism %}

Esto debería volver el título a la normalidad y nos debería servir para pasar a la siguiente fase:

## 2.- Centrar y esconder lo que sobra.

No es estrictamente obligatorio, pero el efecto gana enteros si se hace desde el centro hacia ambos extremos. Esto se consigue simplemente centrando el texto. Como decía antes, es por esto que no podíamos usar `float:left` para solucionar el problema del inline-block.

{% prism css  %}
h1 {
  text-align:center;
}
{% endprism %}

Es el momento de aderezar nuestra tipografía. Quizá quieras poner todo en `uppercase`, modificar la `font-family` o usar algún efecto de `text-shadow`. Es posible que los efectos más agresivos provoquen algún problema, especialmente si aumentan el tamaño que ocupa cada letra (sombras, fondos y bordes incluídos). Como siempre, se impone el ensayo y error y cierta mesura.

Una vez tengamos nuestro título, es el momento de ocultar las letras que __no forman parte del título en versión corta__.

Necesitamos que las propiedades CSS que vamos a modificar sean animables usando `transition`. Es por ello que debemos prescindir de dos sospechosos habituales: `display:none` y `visibility:hidden`. En su lugar, vamos a utilizar el ancho y la opacidad de cada letra:

{% prism css   %}
.un, 
.uni, 
.unit, 
.unite,
.united,
.united-,
.united-na,
.united-nat,
.united-nati,
.united-natio,
.united-nation,
.united-nations {
  max-width:0;
  opacity:0;
}
{% endprism %}

Aquí es donde alguien me dirá, con razón, que se podría simplificar esto añadiendo una clase del tipo `.oculto` a cada letra. Cierto es. A mí, personalmente, me gusta añadir este extra de trabajo a cambio de poder añadir y quitar letras del efecto directamente desde el CSS.

Hecho esto, ya tenemos un título reducido a su acrónimo, y sólo queda animar la aparición de las letras.

## 3.- Animar on:hover

El truco conoce en saber que `height` y `width` tienen muchos problemas para ser animados usando transiciones de CSS3. Sólo funcionan si conoces los valores de salida y llegada (por ejemplo, si animas de un ancho de `10px` a uno de `30px`).

En nuestro caso no sabemos los valores de ancho de cada letra, puesto que esto depende de la tipografía[^3]. Podríamos calcularlo usando una regla en pantalla, Photoshop o un inspector tipo Firebug, pero sería estúpido ya que si cambiamos de tamaño o de tipografía tendremos que rehacer todo el trabajo.

La solución consiste en __animar el `max-height`__. Como hemos visto, un valor de `0` oculta totalmente la letra. Sin embargo, un valor de `999px` __no convierte cada letra en un monstruo de mil píxeles de ancho__ ya que este tamaño sólo indica *el techo máximo que no se puede sobrepasar*. No hace falta decir que 999px es un valor aleatorio, y que nos servirá cualquier cifra imposible de ser sobrepasada.

Dicho esto, toda la magia de este efecto reside en dos líneas de CSS. 

La primera declara una transición sobre todos los valores de los `span`. 

{% prism css   %}
h1 span {
  transition: all 2s ease-in-out;
}
{% endprism %}

La segunda actúa sobre `h1:hover` y aplica a todas las letras los nuevos valores de opacidad y max-height que serán animados. No hay que preocuparse por las letras ya visibles, ya que no tienen propiedades CSS declaradas para `opacity` y `max-height` y `transition` sólo opera cuando existen valores de llegada y de partida.

{% prism css   %}
h1:hover span {
  max-width: 999px;
  opacity: 1;
}
{% endprism %}

Sin embargo, el efecto no resulta muy atractivo. La transición realiza en 2 segundos el cálculo de todos los valores a la vez, por lo que el resultado es un texto en el que todas las letras restantes se *estiran* y *encienden* simultáneamente (ver ejemplo):

<p data-height="268" data-theme-id="0" data-slug-hash="WvMvoe" data-default-tab="result" data-user="idiazroncero" class='codepen'>See the Pen <a href='http://codepen.io/idiazroncero/pen/WvMvoe/'>Título animado en :hover sin delay</a> by Ignacio Díaz-Roncero Fraile (<a href='http://codepen.io/idiazroncero'>@idiazroncero</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

No está mal del todo pero no hemos estado poniendo clases CSS letra por letra para ésto.

## 4.- El toque final

Lo que falta es __hacer que las letras vayan saliendo en orden (o desorden)__, y para esto nos apoyamos en la propiedad `transition-delay` que, como su nombre indica, añade un retraso en el inicio de la ejecución de la transición.

De paso, sirve para justificar el por qué de dar a cada `span` una clase diferente.

{% prism css   %}
.un { transition-delay: 0.16s}
.uni { transition-delay: 0.32s}
.unit { transition-delay: 0.48s}
.unite { transition-delay: 0.64s}
.united { transition-delay: 0.8s}
.united- { transition-delay: 0.96s}
.united-na { transition-delay: 1.12s}
.united-nat { transition-delay: 1.28s}
.united-nati { transition-delay: 1.44s}
.united-natio { transition-delay: 1.6s}
.united-nation { transition-delay: 1.76s}
.united-nations { transition-delay: 1.92s}
{% endprism %}

Voilà!

<p data-height="268" data-theme-id="0" data-slug-hash="qdxBJW" data-default-tab="result" data-user="idiazroncero" class='codepen'>See the Pen <a href='http://codepen.io/idiazroncero/pen/qdxBJW/'>Título animado en :hover</a> by Ignacio Díaz-Roncero Fraile (<a href='http://codepen.io/idiazroncero'>@idiazroncero</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Para el título de este blog y para este ejemplo, mi técnica ha sido dividir la duración de la transición (2s) entre el número de letras (12) con el objetivo de que la última transición se dispare más o menos cuando la primera finaliza. Sin embargo, aquí hay un espacio muy amplio para experimentar.

Del mismo modo, en este ejemplo las letras aparecen __en orden__. Sin embargo, en el título de este blog lo hacen __desordenadas__: basta con distribuir aleatoriamente los valores de `transition-delay`.

También podemos animar otros valores. Por ejemplo, en el título de este blog cada letra tiene un color que es animado hacia el gris al mismo tiempo que `max-width` y `opacity`.

{% include figure.html src="/images/idr-color.png" caption="En idiaz.roncero, cada letra tiene un color de partida que se va convirtiendo en gris" %}


En definitiva, se trata de una técnica muy sencilla y agradecida que abre todo un abanico de oportunidades y que además nos ha servido para introducir dos cuestiones importantes: 

* Cómo animar anchuras desconocidas usando CSS Transitions 
* Cómo solucionar el problema del espacio sobrante entre elementos inline-block.


  


[^1]:    Para los recién llegados: Document Object Model. Explicación rápida: es el "mapa" de la estructura jerárquica definida en el HTML (los elementos y las relaciones que hay entre ellos), al cual acude Javascript para realizar sus modificaciones (por ejemplo: buscar todos los `div` hijos de un `header` con determinada `class` y eliminarlos). 
    
    Muchas de las animaciones y efectos que se basan en jQuery suelen modificar el DOM añadiendo y eliminando elementos. El problema: un navegador sin javascript o un lector para invidentes no *ven* estos cambios ya que no forman parte del HTML original.

[^2]: Esto se debe a que los elementos tipo inline, como `span`, no aceptan valores definidos de `height` o `width`.

[^3]: A no ser que estemos usando una fuente monospace, claro...

[BEM]: https://en.bem.info/method/
[OOCSS]: http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss
[inline-block]: https://css-tricks.com/fighting-the-space-between-inline-block-elements/