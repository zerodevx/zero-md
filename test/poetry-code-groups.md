<!--«tabNameBrackets»-->

<localized main="en"/>
<codalized main="js"/>

# Poetries

## 1.1

```poetry
1.1
this is **bold** in poetry
this is __default bold (disabled)__ in poetry
this is «custom bold» in poetry
this is ___italic___ in poetry
this is ____underlined____ in poetry
```

## 1.2 (with code id)

```poetry: java
// 1.2 (with code id)
// this is **bold** in poetry
// this is __default bold (disabled)__ in poetry
// this is «custom bold» in poetry
// this is ___italic___ in poetry
// this is ____underlined____ in poetry
```

## 1.3 (with code id, tabbed, mixed with not-poetry)

::::::::::
```poetry: java
// 1.2 (with code id = java)
// this is **bold** in poetry
// this is __default bold (disabled)__ in poetry
// this is «custom bold» in poetry
// this is ___italic___ in poetry
// this is ____underlined____ in poetry
```
```java: «java highlighted block, not poetry»
// 1.2 (with code id = java, NOT POETRY)
// this is **bold** in poetry
// this is __default bold (disabled)__ in poetry
// this is «custom bold» in poetry
// this is ___italic___ in poetry
// this is ____underlined____ in poetry
```
```poetry: py
# 1.2 (with code id = py)
# this is **bold** in poetry
# this is __default bold (disabled)__ in poetry
# this is «custom bold» in poetry
# this is ___italic___ in poetry
# this is ____underlined____ in poetry
```
```poetry
1.2 (without code id)
this is **bold** in poetry
this is __default bold (disabled)__ in poetry
this is «custom bold» in poetry
this is ___italic___ in poetry
this is ____underlined____ in poetry
```
::::::::::

## 1.4 (manual, without code id, tabbed, mixed with not-poetry where poetry is not in first tab)

::::::::::manual
```textile
this is **bold** in poetry
```
```text
this is **bold** in poetry
```
```poetry: «poetry»
1.2 (without code id)
this is **bold** in poetry
this is __default bold (disabled)__ in poetry
this is «custom bold» in poetry
this is ___italic___ in poetry
this is ____underlined____ in poetry

(without custom name or id this content will never be switched to if previous content was text or poetry)
```
```html
this is **bold** in poetry
```
::::::::::

## 2

```poetry
2 this is «bold with custom syntax that disables default» in poetry
```

## 3 (invisible on asked code)

:::::::::
```poetry
3 this is **bold** in poetry tabbed
```
:::::::::

## 4 (manual)

:::::::::manual
```poetry
4 this is **bold** in poetry tabbed manual
```
:::::::::

## 5  (manual, not poetry)

:::::::::manual
```md: «with custom name»
5 this is **bold** in markdown tabbed manual with custom name
```
:::::::::

## 6 (manual)

:::::::::manual
```poetry: «with custom name» «same with another name»
6 this is **bold** in poetry tabbed manual with custom name besides second tab with same content
```
:::::::::

## 7

:::::::::
```poetry: «with custom name» java«same with another name»
// 7 this is **asterisks bold** and «custom bold» and ___italic___ in poetry tabbed with custom name with code id besides second tab without code id with same content
```
:::::::::

## 8 (manual, not poetry)

:::::::::manual
```md: «with custom name» «same with another name»
8 this is **bold** in markdown tabbed manual with custom name besides second tab with same content
```
:::::::::

## 9 (visible on asked java or cs | invisible on asked not java or cs, like js)

:::::::::
```poetry: cs
9 this is **bold** in poetry tabbed with known name (i.e. = code id) - cs
```
```poetry: java
9 this is **bold** in poetry tabbed with known name (i.e. = code id) - java
```
:::::::::

## 10 (visible on no asked code | visible on asked java | invisible on asked not java, like js)

:::::::::
```poetry: java«JAVA fuked it:)»
10 this is **bold** in poetry tabbed with known name (i.e. = code id) and custom name
```
:::::::::

## 11 (manual => visible allways)

:::::::::manual
```poetry: java
11 this is **bold** in poetry tabbed manual with known name
```
:::::::::

## 12 (manual => visible allways)

:::::::::manual
```poetry: «java»
12 this is **bold** in poetry tabbed manual with custom name of known code
```
:::::::::

## 13 (manual, not poetry => visible both with first selected and working switch - allways)

:::::::::manual
```js ts
13 // some code
```
:::::::::

## 14 (manual => visible allways with first selected and working switch)

:::::::::manual
```poetry: js ts
14 // some code
```
:::::::::

## 15 (visible on asked js or ts | invisible on asked not js or ts, like java)

:::::::::
```poetry: js ts
15 // some code
```
:::::::::

## 16 (with html and custom quotes in poetry for bold)

Все html-элементы выглядят примерно так:

```html
<element attribute1="value1" attribute2="value2"> внутренности </element>
```

bold with «...»

```poetry
<element attribute1="value1" attribute2="value2"> «какой-то текст» </element>
```

bold with `**...**`and `__...__`

```poetry
<element attribute1="value1" attribute2="value2"> **какой**-то __текст__ </element>
```

# Etc

```poetry
this is code-like text with **bold** and ___italic___ inside

if poetryBold option set then surrounded by double __underscores__ and **asterisks** bolds are disabled
but something like «this» should work if such quotes were set via poetryBold option
```

<ru>Можно использовать CSS-селектор, напрямую передавая его команде `element`, и получить чуть более лаконичный код:</ru>
<uk>Можна використовувати CSS-селектор, напряму передавши його команді `element`, і отримати трохи більш лаконічний код:</uk>
<en>You can use a CSS selector, passing it directly to the `element` command, and get a slightly more concise code:</en>

::::::::::::::::::::::::::::::::::::::::::::::::::::
```poetry: js ts
await browser.element(**'#new-todo'**).type('a')
await browser.element(**'#new-todo'**).pressEnter()
```
```java
element("#new-todo").append("a").pressEnter();
```
```py
browser.element('#new-todo').type('a').press_enter()
```
::::::::::::::::::::::::::::::::::::::::::::::::::::

<java>

<ru>Еще более лаконично можно записать ту же строку используя команду `$`:</ru>
<uk>Ще більш лаконічно можна записати ту ж саму строку використовуючи команду `$`:</uk>
<en>Even more concisely, you can write the same line using the `$` command:</en>
```poetry
**$(**"#new-todo"**)**.append("a").pressEnter();
```

<ru>Но давай пока ограничимся предыдущей версией, пускай менее лаконичной, но более читабельной для большинства новичков, которые вероятно еще не знают, ;) что в мире фронтенда – доллар это «стандартная» команда поиска элементов по селектору, которая в большинстве случаев доступна в консоли браузера.</ru>
<uk>Але давай поки обмежимося попередньою версією, нехай менш лаконічною, але більш читабельною для більшості новачків, які, ймовірно, ще не знають, ;) що в світі фронтенду – долар це «стандартна» команда пошуку елементів за селектором, яка в більшості випадків доступна в консолі браузера.</uk>
<en>But let's limit ourselves to the previous version for now, let it be less concise, but more readable for most beginners, who probably do not know yet, ;) that in the world of frontend – the dollar is a «standard» command to search for elements by selector, which is usually available in the browser console.</en>

</java>

<js-ts>

<ru>Правда, лаконичность эту вряд ли заметишь на фоне целых двух строк кода... Вспоминаем что это асинхронный код (точнее – асинхронными есть команды для взаемодействия с элементом – `type` и `pressEnter`), поэтому просто так записать одной строчкой два последовательных вызова `type('a').pressEnter()` не получится, прийдется использовать then-стиль:</ru>
<uk>Щоправда, лаконічність цю навряд помітиш на фоні цілих двох рядків коду... Пригадуємо, що це асинхронний код (точніше – асинхронними є команди для взаємодії з елементом – `type` та `pressEnter`), тому просто так записати одним рядком два послідовні виклики `type('a').pressEnter()` не вийде, треба буде використовувати then-стиль:</uk>
<en>True, the conciseness of this will hardly be noticed against the background of two whole lines of code... We remember that this is asynchronous code (more precisely, the commands for interacting with the element are asynchronous – `type` and `pressEnter`), so you can't just write two sequential calls `type('a').pressEnter()` inline, you will have to use the then-style:</en>

:::
```js ts
await browser.element('#new-todo').type('a').then(element => element.pressEnter())
```
:::

<ru>или чуть короче:</ru>
<uk>або трохи коротше:</uk>
<en>or even more concise:</en>

:::
```js ts
await browser.element('#new-todo').type('a').then(it => it.pressEnter())
```
:::

<ru>Специально для таких случаев, когда кажется удобней обойтись одной строкой вместо двух, в SelenideJS есть дополнительный способ вызвать команду:</ru>
<uk>Особливо для таких випадків, коли здається зручніше обійтися одним рядком замість двох, в SelenideJS є додатковий спосіб викликати команду:</uk>
<en>Especially for such cases, when it seems more convenient to do with one line instead of two, there is an additional way to call a command in SelenideJS:</en>

:::
```js ts
await browser.element('#new-todo').type('a').then(perform.pressEnter);
```
:::

</js-ts>
