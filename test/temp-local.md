<!--import(https://gist.githubusercontent.com/ArtemPaskall/53ba40509d36ed057898a96ca7a6fcd9/raw/71b6f9a9e116ba6cc93b4612af8c4c23e9476e7a/gistfile1.txt)-->

<!--import(https://gist.githubusercontent.com/ArtemPaskall/6027df913285b12a9d76a15102c3758d/raw/baef7a2b09ac047ead25de58135ded443e0f1bee/gistfile1.txt)-->

## <ru>CSS-селекторы против селенидов</ru><uk>CSS-селектори проти селенідів</uk><en>CSS-selectors vs selenides</en>

<ru>Особенность селенидов в том, что при их использовании, обычно, не нужны сложные CSS или XPath-селекторы. Достаточно самых простых локаторов в стиле Selenium (`{{by}}`) или еще более простых чистых селекторов, которые найдут элементы по  значениям соответствующих атрибутов, например:</ru><uk>Особливість селенідів в тому, що при їх використанні, зазвичай, не потрібні складні CSS або XPath-селектори. Достатньо найпростіших локаторів у стилі Selenium (`{{by}}`) чи ще простіших чистих селекторів, які знайдуть елементи по значеннях відповідних атрибутів, наприклад:</uk><en>The peculiarity of selenides is that when using them, usually, no complex CSS or XPath selectors are needed. It is enough to use the simplest Selenium locators (`{{by}}`) or even simpler pure selectors that will find elements by the values of the corresponding attributes, for example:</en>

::::::::
```poetry: js ts«custom name3»
import { browser, by } from 'selenidejs'

// ...

browser.element(**by.name('q')**))  // ...

browser.element(**by.id('new-todo'**))  // ...
// or yet simpler:
browser.element(**'#new-todo'**)  // ...
```

```java: «custom name7»
import { browser, by } from 'selenidejs'

// ...

browser.element(**by.name('q')**))  // ...

browser.element(**by.id('new-todo'**))  // ...
// or yet simpler:
browser.element(**'#new-todo'**)  // ...
```

```py
from selene import browser, by

# ...

browser.element(by.name('q'))  # ...

browser.element(by.id('new-todo'))  # ...
# or yet simpler:
browser.element('#new-todo')  # ...
```

```cs
using static NSelene.Selene;
using OpenQA.Selenium;
//...

S(By.Name("q"))  // ...

S(By.Id("new-todo"))  // ...
// or yet simpler:
S("#new-todo")  // ...
```
::::::::

<!-- <java><ru>ру</ru><uk>ук</uk><en>en</en></java> -->

<ru>При этом, можно вообще не использовать дополнительные импорты для {{by.*}}, сохраняя код менее вложенным и все еще вполне читабельным, учитывая что сами по себе чистые CSS-селекторы в этому случае – максимально просты:</ru><uk>При цьому, можна взагалі не використовуючи додаткові імпорти, зберігаючи код менш вкладеним і все ще досить читабельним, враховуючи, що самі по собі чисті CSS-селектори в такому випадку – максимально прості:</uk><en>At the same time, you can do it without using additional imports, keeping the code less nested and still quite readable, taking into account that pure CSS selectors in this case – are maximally simple:</en>

::::::::::::manual
```poetry: js ts«custom name3»
import { browser, by } from 'selenidejs'

// ...

browser.element(**by.name('q')**))  // ...

browser.element(**by.id('new-todo'**))  // ...
// or yet simpler:
browser.element(**'#new-todo'**)  // ...
```

```html: «html custom name123»
import { browser, by } from 'selenidejs'

// ...

browser.element(**by.name('q')**))  // ...

browser.element(**by.id('new-todo'**))  // ...
// or yet simpler:
browser.element(**'#new-todo'**)  // ...
```

```java: «html custom name»
from selene import browser, by

# ...

browser.element(by.name('q'))  # ...

browser.element(by.id('new-todo'))  # ...
# or yet simpler:
browser.element('#new-todo')  # ...
```
::::::::::::
