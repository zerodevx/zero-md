<localized main="ru"/>
<codalized main="ts"/>

<!--«poetryBold»-->

<!--\*\*poetryBold\*\*-->

# header

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
