# markdown-fixture

Generated from [Lorem Markdownum](https://github.com/jaspervdj/lorem-markdownum).
A Lorem Ipsum generator that doesn't suck. :P

![cat!](test1/cat.jpg)

## Templates + General Translation + Translation to multiline

<!--~{{LOOM\(https:\/\/www\.loom\.com\/share\/(\w+)\)}}~<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

,,,,,,,,,,,,,,,,,,,,,,,,,,,,,~-->

{{LOOM(https://www.loom.com/share/09c97fcc9ed24fdc830062f778d01828)}}

{{LOOM(https://www.loom.com/share/09c97fcc9ed24fdc830062f778d01828)}}

## 🐞 Normal code blocks – higlighting of html and css does not work in Firefox! 🐞

### Separate

```js
// comment
const a = 1;
```

```html
<!-- comment -->
<div>1</div>
```

```css
/* comment */
div { color: red; }
```

### Tabbed

::::::::::
```js
// comment
const a = 1;
```
```html
<!-- comment -->
<div>1</div>
```
```css
/* comment */
div { color: red; }
```
::::::::::

## Anchor link test

Clicking [Taman et veri](#tamen-et-veri) should scroll to the correct section.

<localized main="en"/>
<codalized main="ts"/>

## TOC test

[TOC]<!--TOC>1-->

## md Links with types

[test-without-type.md](./test-without-type.md)
[test-with.type.md](./test-with.type.md)
[test-without-type.md#with-anchor](./test-without-type.md#with-anchor)
[test-with.type.md#with-anchor](./test-with.type.md#with-anchor)

## md Links forwarding

[link to itself](./fixture.md)
[link to itself (this section)](./fixture.md#md-links-forwarding)

## Langs test

<en>First paragraph</en>

<uk>Перший параграф</uk>

<ru>Первый параграф</ru>

<en>
First paragraph
</en>

<uk>
Перший параграф
</uk>

<ru>
Первый параграф
</ru>

<en>
* First item
* Second item
</en>

<uk>
* перший айтем
* другий айтем
</uk>

<ru>
* Первый айтем
* Второй айтем
</ru>

## Multi code block test

::::::::::::::::::
```js ts
const foo = 'foo'
```
```java
string bar = 'bar'
```
::::::::::::::::::

## Text per Code test

This is inline codalized command: <js-ts-py>`browser.all`</js-ts-py><java>`elements`</java>!

<js-ts>
This will be shown for both code=js and code=ts
</js-ts>
<java>
This will be shown only for code=java
</java>

<js>
<uk>А от з модулями ти можеш зробити так:</uk>
<ru>А вот с модулями ты можешь сделать так:</ru>

```js
// js code with modules...
```

А з класами ти можеш зробити так:

```js
// js code with classes ...
```
</js>

<ts>
<ru>C класcами ты можешь сделать так:</ru>
<uk>З класами ти можеш зробити так:</uk>

```ts
// ts code with classes...
```
</ts>

## CodeGroup test 1

:::

```js 
/** @type {string} */
const foo = 'foo'
```

```ts
const bar: String = 'bar'
```

```java
string bar = 'bar'
```

:::

## CodeGroup test 2

:::

```ts
const bar: String = 'bar'
```

```js
/** @type {string} */
const foo = 'foo'
```

:::

## Poetry test

```poetry
var this_name_has_**bold**_inside = "bold leftwards should be **bold**;)";
```

## Custom anchor link test

Clicking [Novae aderisque quoniam](#novae-aderisque-quoniam) should scroll to the correct section.

## anchor link test

Clicking [Taman et veri](#veri-et-taman) should scroll to the correct section.

## Let's test some code!

Here's python:

```python
#  Hello world in Python

def hello(to):
    print("Hello, " + to + "!")
```

Here's javascript:

```js
// Hello world in JavaScript

function hello(to) {
    console.log("Hello, " + to + "!");
}
```

Some Java:

```java
// Hello World on a mobile Java device

package helloworld;

import javax.microedition.midlet.*;
import javax.microedition.lcdui.*;

public class HelloWorld extends MIDlet {

  public HelloWorld()
  {
    Form form = new Form("Hello World");
    form.append("Hello world!");
    Display.getDisplay(this).setCurrent(form);
  }

  protected void pauseApp() {  }
  protected void startApp() throws
    javax.microedition.midlet.MIDletStateChangeException {  }
  protected void destroyApp(boolean parm1) throws
    javax.microedition.midlet.MIDletStateChangeException {  }
}
```

Let's try C++:

```cpp
// Hello World in C++ (pre-ISO)

#include <iostream.h>

main()
{
    cout << "Hello World!" << endl;
    return 0;
}
```

PHP:

```php
<?
// Hello World in PHP + GD library
header("Content-type: image/gif");
$rscImage    = imagecreatetruecolor(80, 25);
$intFontC    = imagecolorallocate($rscImage, 255, 255, 255);
$intBGC        = imagecolorallocate($rscImage, 0, 0, 0);
imagestring($rscImage, 2, 5, 5, "Hello World!", $intFontC);
imagegif($rscImage);
imagedestroy($rscImage);
?>
```

LaTeX:

```latex
% Hello World! in LaTeX
\documentclass{article}
\begin{document}
Hello World!
\end{document}
```

## GFM task list

Here are some tasks:

- [x] Task 1 completed
- [x] Task 2 completed
- [x] Task 3 completed
- [ ] Task 4 in progress
- [ ] Task 5 in progress
- [ ] Task 6 not started

<details>
<summary>Example dropdown</summary>
This is a dropdown with text!
</details>

## Concidit caput certo flere pedum

*Lorem* markdownum implet caedisque `dextrasque` doluit timor idcirco **isque
favillae** aliquid nobilitate posuit. Hortis tuo ferunt sanguine latuerunt
sonitu, dato dixisse dulci Laiades.

> Centaurorum *utinam* plagas in quaerentes regno toto, forcipe erat adiit
> colorem ignibus. Fecit ruunt [solio](http://www.et.net/mallet) referente
> tulit.

Permulcetque dant, admonitorque quam poenas. Olivae haec hostesque formidine sub
memorante nullum; quoque massa usum videri.

## Qua ad Lesbon zonae

Illam credulitate [nil oculis](http://quamquetamen.net/huicadest.aspx) si genis
utraque Minyeidas patres visa [coepit](http://laevaque.org/) est dedit cervix et
pomaria *tamen*. Sanguine **sollicitare cadunt** non.

Sum magis resilit ponderibus tecto posset Plena suae Pirithoi? Et [verba
quae](http://www.sisole.net/suntqui) vacuas errat exigit prius fert, quod, oris
fiant cursus.

Unhinted:

```
supercomputerPpi = page.word(1);
pretestRam(onlySector, zoneJfsDdl(header));
if (export > soft_ssl_zif) {
    rosetta.tweetRwUsername += multimedia_wireless + piconet_menu_dcim(5,
            backlinkBitrateSafe, ppga);
    metal_virus = printer_add;
} else {
    delDegaussBoot(cdStandaloneInstall + processor_dvd, dynamic_sms -
            copyright);
    baseExploitSource.mediaApp(iso_model(boolean), indexByteLinkedin *
            display);
}
```

HTML + JS:

```html
<zero-md id="app" src="example.md" manual-render></zero-md>
<script>
  document.querySelector('#app').render({
    baseUrl: 'foo/',
    gfm: false,
    ...
  })
</script>
```

Cristati ab est adfusaque, qui dubites clamore, coetus pecudumque salictis.
Cupit **talia geminique magnae** lumina postquam urnaque ferae *promittere
vimque aera*, unius augent odium solane; quo Phoebus possent? Lege inmeritam
amans sacrorum pallada. Corpore sacra nihil: corpora taceam, aberat
**repulsus**.

## Tamen et veri {#veri-et-tamen}

Lorem markdownum iugulum levati; tuum feri ignes rogantem fugio natorum.
Eueninae ducere et erat ad caruit adclinavit quod. Quae diebus domo, posset
thalamos: nunc nec, [vulnera](http://www.crudelis.org/quisque) non vult deponere
quinque formam et nec nec!

    api_dvd_cyberbullying.crossplatform_dithering = device(service,
            smbKeyboardBps(-1), -5);
    if (94 > multimedia) {
        webmail_commercial = -5;
        windows.nullPiconetHexadecimal = 880911 + ppl_e_page;
    }
    if (name + 1 >= 3) {
        pushRadcab -= cdfs_netbios_variable(5 - rom, cssTftWebsite, station -
                targetIcioCore);
    } else {
        icmp(commerceSpyware - link_nanometer);
        x_cd_wamp.webConfiguration(matrixMinisite);
    }
    leaderboard += clickMouseThick(wiBatchIso(zettabyte_oop_core, pci,
            boxInfringement));
    petaflopsYobibyte = payload;

## Quasque gaudia umor parente iaculum

Lorem markdownum Nereis tune, Siphnon? Ad rursus vixque; omnes, tenet quae
venter ipse vivum maerent harenis. Summo exsecrantia aduncae, non quae
defenditur pedem.

- Sed carens annis
- Ecce iuveni clamato precantia lucemque dextera
- Sub certe Pandione est illic
- Suam oras et pleno insomni gente querorque

## Sunt trepidante cupidine formosi iaculum clipeum conpositum

Solamen recusat oppugnant se animam et adventu garrulitas nil suorum celsior
pectore, multorum. Arreptamque dedit harundine coniungere
[clarum](http://amor-puerpera.org/vesteset). Qui exululatque caeli et aerias
dextrae, victor dixit, hinc [tum](http://cura-redeat.io/), ad teneri faciat
Romana?

## Novae aderisque quoniam

Et quod se pectore statuit indotata tibi me Belides intravimus capillos, aliter.
Recepta quid ruit **moram Iuppiter** Iovis, manibus nam spargit atra fracta. Ad
iam ut, [idcirco](http://vertunt-aura.net/) accipitrem inclusas omne, ubi sui
quid et conponere vino veste maestaeque clamore pressos Polyxena! Messoris
lacertis Tarentum **vetuit**, de mors refugit modo diris, excidit aderat
Neptunus, est. Nec nec in meliore femina talibus in propior illo non moderatior.

## Manes et sponda lyncum in postquam

Colla qui ducunt artus ferendo **iuvenem possent proboque** vacuas iterum!
Operire vates intervenit nocens.

> Monitis eat valuit murice hic processit quod illud, per gravis scribit
> [moenia](http://falsaquodcumque.org/prosuntseptemflua.aspx). Inquit in
> Phoebeia mundi et illa, fors inplet tremens?

## Cepit telique credere dicturus fluctus polus turpes

Rebelles lingua digitoque modo loquax lignum. *Idas* deus, quoque tolerare
palus, conligit exercuit meus **eripiam manibusque verae**, ille *rediit his
corpora*.

1. Milete alii fugis intumuere coeptas
2. Micant frondes
3. Conripimus prima
4. Orbes corpora Narcissum at palmae confer populos

Crines tria; erat mecumque, infernas matre extemplo tibi: loquor: vestes o
pudori occasus **sonantem**: natas. Ausa unda calescit pariter aethera in agunt.
Heros *ei* crabronum Bacchumque [portus](http://potentia.io/tota.html).
