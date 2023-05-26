<!-- import(https://gist.githubusercontent.com/ArtemPaskall/53ba40509d36ed057898a96ca7a6fcd9/raw/71b6f9a9e116ba6cc93b4612af8c4c23e9476e7a/gistfile1.txt)-->

<!-- import(xpath-refactoring.task.md)-->
<!-- import(./xpath-refactoring.task.md)-->
<!-- import(../xpath-refactoring.task.md)-->
<!-- import(./../xpath-refactoring.task.md)-->
<!-- import(../../xpath-refactoring.task.md)-->
<!-- import(./../../../8/9/7/xpath-refactoring.task.md)-->
<!-- import(qaest/selenides-quick-start.docs.md)-->

<!--\*\*poetryBold\*\*-->
<!--«tabNameBrackets»-->

<localized main="en"/>
<!--ru~{{and}}~и~-->
<!--uk~{{and}}~і~-->
<!--en~{{and}}~and~-->

<!--ru~{{or}}~или~-->
<!--uk~{{or}}~або~-->
<!--en~{{or}}~or~-->

<!--ru-en~{{Testing}}~test all lang~-->


<codalized main="js"/>

<!--js~{{Selenide}}~SelenideJs~-->
<!--ts~{{Selenide}}~SelenideJs~-->
<!--py~{{Selenide}}~Selene~-->
<!--java~{{Selenide}}~Selenide~-->
<!--cs~{{Selenide}}~NSelene~-->

<!--js~{{TestRunner}}~Jest~-->
<!--ts~{{TestRunner}}~Jest~-->
<!--py~{{TestRunner}}~Pytest~-->
<!--java~{{TestRunner}}~JUnit~-->
<!--cs~{{TestRunner}}~NUnit~-->

<!--js~{{by}}~by.*(value)~-->
<!--ts~{{by}}~by.*(value)~-->
<!--py~{{by}}~by.*(value)~-->
<!--java~{{by}}~By.*(value)~-->
<!--cs~{{by}}~By.*(value)~-->

<not-js-ts>NOT JS TS PYTON</not-js-ts>

# <ru>Селениды: Быстрый Старт</ru><uk>Селеніди: Швидкий Старт</uk><en>Selenides: Quick Start</en> (<js>JS</js><ts>TS</ts><py>Python</py><java>Java</java><cs>C#</cs>)




[TOC]<!--TOC>1-->

<cs>

,,,,,,,,,,,,,,,,,,,,,,,,,,,,

**<p style="color:red;"><ru>Версия этого туториала для связки C# + NSelene находится в разработке...</ru><uk>Версія цього туторіалу для зв'язки C# + NSelene знаходиться в розробці...</uk><en>This tutorial for C# + NSelene is under development...</en></p>**

============================

============================

</cs>

<java>
<ru>
<!--create new version like for uk-->
<iframe width="760" height="427.5" src="https://www.youtube.com/embed/gVrvosAU0yg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</ru>
<uk>
<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c9f75e007d96421d8f6010fef4100382" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
</uk>
</java>

## <ru>Что и где?</ru><uk>Що і де?</uk><en>What and where?</en>

<ru>Selenide в Java, SelenideJs в JavaScript, Selene в Python, NSelene в .Net – это инструменты для автоматизации действий пользователя в браузере, ориентированные на удобство и легкость реализации бизнес-логики в автотестах, на языке пользователя, не отвлекаясь на технические детали работы с «драйвером браузера». Например, к техническим деталям можно отнести работу с ожиданиями элементов при автоматизации тестирования динамических веб-приложений, реализацию высокоуровневых действий над элементами, сложные локаторы на основе низкоуровневых селекторов, и так далее.</ru><uk>Selenide в Java, SelenideJs в JavaScript, Selene в Python, NSelene в .Net – це інструменти для автоматизації дій користувача в браузері, орієнтовані на зручність і легкість реалізації бізнес-логіки в автотестах, на мові користувача, не відволікаючись на технічні деталі роботи з «драйвером браузера». Наприклад, до технічних деталей можна віднести роботу з очікуваннями елементів при автоматизації тестування динамічних веб-застосунків, реалізацію високорівневих дій над елементами, складні локатори на основі низькорівневих селекторів, і так далі.</uk><en>Selenide in Java, SelenideJs in JavaScript, Selene in Python, NSelene in .Net – are tools for automating user actions in the browser, oriented towards the convenience and ease of implementing business logic in automated tests, in the language of the user, without distracting from the technical details of working with the «browser driver». For example, technical details can include working with element waits when automating testing of dynamic web applications, implementing high-level actions over elements, complex locators based on low-level selectors, and so on.</en>

<ru>Все эти библиотеки, у себя «под капотом» – используют Selenium Webdriver в качестве основного инструмента для взаимодействия с браузером. Поэтому их еще называют более высокоуровневыми «обертками» или «враперами» вокруг более низкоуровневых инструментов типа Selenium Webdriver. Мы их будем называть «Селенидами» поскольку все они так или иначе наследуют стиль первого из их числа – Selenide в Java. Давай же познакомимся с особенностями их использования в зависимости от выбранного языка программирования (кликни по одной из ссылок ниже что-бы загрузить соответствующую версию статьи):</ru><uk>Всі ці бібліотеки, під капотом – використовують Selenium Webdriver в якості основного інструменту для взаємодії з браузером. Тому їх ще називають більш високорівневими «обгортками» або «враперами» навколо більш низькорівневих інструментів типу Selenium Webdriver. Ми їх будемо називати «Селенідами» оскільки всі вони так чи інакше наслідують стиль першого з їх числа – Selenide в Java. Давай же познайомимося з особливостями їх використання в залежності від обраної мови програмування (клікни по одній з посилань нижче щоб завантажити відповідну версію статті):</uk><en>All these libraries, under the hood – use Selenium Webdriver as the main tool for interacting with the browser. Therefore, they are also called more high-level «wrappers» or «wrappers» around more low-level tools such as Selenium Webdriver. We will call them «Selenides» because they all inherit the style of the first of their number – Selenide in Java. Let’s get acquainted with the features of their use depending on the chosen programming language (click on one of the links below to download the corresponding version of the article):</en>

<js>

* **JavaScript <ru>(выбрано сейчас)</ru><uk>(обрано зараз)</uk><en>(selected now)</en>**,
* [TypeScript](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=ts),
* [Python](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=py),
* [Java](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=java),
* [C#](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=cs)

</js>

<ts>

* [JavaScript](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=js),
* **TypeScript <ru>(выбрано сейчас)</ru><uk>(обрано зараз)</uk><en>(selected now)</en>**,
* [Python](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=py),
* [Java](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=java),
* [C#](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=cs)

</ts>

<py>

* [JavaScript](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=js),
* [TypeScript](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=ts),
* **Python <ru>(выбрано сейчас)</ru><uk>(обрано зараз)</uk><en>(selected now)</en>**,
* [Java](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=java),
* [C#](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=cs)

</py>

<java>

* [JavaScript](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=js),
* [TypeScript](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=ts),
* [Python](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=py),
* **Java <ru>(выбрано сейчас)</ru><uk>(обрано зараз)</uk><en>(selected now)</en>**,
* [C#](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=cs)

</java>

<cs>

* [JavaScript](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=js),
* [TypeScript](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=ts),
* [Python](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=py),
* [Java](?lang=<ru>ru</ru><uk>uk</uk><en>en</en>&code=java),
* **C# <ru>(выбрано сейчас)</ru><uk>(обрано зараз)</uk><en>(selected now)</en>**

</cs>

## <ru>Когда? (предусловия)</ru><uk>Коли? (передумови)</uk><en>When? (prerequisites)</en>

<ru>Итак, владея [базовыми навыками программирования](./start-programming.guide.md) и имея установленными следующие инструменты<js-ts-java-cs> (можешь загуглить как - самостоятельно)</js-ts-java-cs>:</ru><uk>Отже, володіючи [базовими навичками программування](./start-programming.guide.md) та маючи встановленими наступні інструменти<js-ts-java-cs> (можеш загуглити як - самостоятельно)</js-ts-java-cs>:</uk><en>So, owning [basic skills in programming](./start-programming.guide.md) and having installed the following tools<js-ts-java-cs> (you can google how - yourself)</js-ts-java-cs>:</en>

<js-ts>

<!-- * document [Как установить NodeJs](http://autotest.how/nodejs/install-ru) with nvm ... -->

* [NodeJs](https://nodejs.org/en/download/current/)
* [Git](https://git-scm.com/)
* [Chrome Browser](https://www.google.com/chrome/)
  * [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/getting-started) – <ru>не обязательно, мы установим его из кода далее</ru><uk>не обов'язково, ми встановимо його з коду далі</uk><en>not required, we will install it from the code later</en>

* [Visual Studio Code](https://code.visualstudio.com/)
  * <ru>обязательно установи команду «code» для запуска редактора прямо из терманила: открыв Visual Studio Code, в Меню «View» -> «Command Palette» (Ctrl+Shift+P на Windows или Command+Shift+P на Mac) напечатай «shell command» и выбери «install 'code' command in Path» и нажми Enter</ru><uk>обов'язково встанови команду «code» для запуску редактора прямо з термінала: відкривши Visual Studio Code, в Меню «View» -> «Command Palette» (Ctrl+Shift+P на Windows або Command+Shift+P на Mac) напиши «shell command» і вибери «Shell Command: install 'code' command in Path» і натисни Enter</uk><en>you must install also the «code» command to run the editor directly from the terminal: when opened Visual Studio Code, in the Menu «View» -> «Command Palette» (Ctrl+Shift+P on Windows or Command+Shift+P on Mac) type «shell command» and select «install 'code' command in Path» and press Enter</en>

</js-ts>

<py>

* [Python](./install-python.howto.md)
  * [pyenv + python](https://github.com/pyenv/pyenv)
  * [poetry](https://poetry.eustace.io/docs/#installation)
* [Chrome Browser](https://www.google.com/chrome/)
  * [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/getting-started) – <ru>не обязательно, Selene сможет установить его сам</ru><uk>не обов'язково, Selene зможе встановити його сам</uk><en>not required, Selene will be able to install it itself</en>
* [PyCharm Community Edition](https://www.jetbrains.com/pycharm/)

</py>

<java>

* JDK (Java Development Kit)
* [Chrome Browser](https://www.google.com/chrome/)
  * [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/getting-started) – <ru>не обязательно, Selenide сможет установить его сам</ru><uk>не обов'язково, Selenide зможе встановити його сам</uk><en>not required, Selenide will be able to install it itself</en>
* [Intellij Idea Community Edition](https://www.jetbrains.com/idea/)

</java>

## <ru>Инициализация проекта</ru><uk>Ініціалізація проекту</uk><en>Project initialization</en>

<ru>В unix-терминале (под Windows доступен через «Windows Subsystem for Linux» либо через «git bash») выполним следующее (можешь просто скопипастить все в терминал, при желании прочитав комментарии вида `echo "next code is about..." \`  к каждому последующему блоку команд, и соответствующий лог выполнения после нажатия Enter)...</ru><uk>В unix-терміналі (під Windows доступний через «Windows Subsystem for Linux» або через «git bash») виконаємо наступне (можеш просто скопіпастити все в термінал, при бажанні прочитавши коментарії типу `echo "next code is about..." \`  до кожного наступного блоку команд, і відповідний лог виконання після натискання Enter)...</uk><en>In unix-terminal (under Windows available via «Windows Subsystem for Linux» or via «git bash») we will execute the following (you can just copy-paste all into terminal, reading comments like `echo "next code is about..." \` before each next block of commands, and corresponding log of execution after pressing Enter)...</en>

<!--TODO: add tabs "with comments" and "without comments"-->

<!--TODO: refactor to codegroups
maybe something like this:

::::::
```bash: js ts
```
```bash: py
```
::::::

or even

::::::
```bash: js js+comments ts ts+comments
```
```bash: py+poetry py+pipenv py+pip
```
```bash: java+gradle java+maven
```
::::::

-->

<js-ts>

```bash
echo "create project folder" \
&& echo "and init npm project" \
&& echo "with defaults in package.json (project configuration file)" \
&& mkdir selenidejs-demo \
&& cd $_ \
&& npm init -y \
&& cat package.json \
\
&& echo "set project type to module (for ES6 import/export)" \
&& echo "and tune opensource license to MIT" \
&& node -e "
require('fs').writeFileSync(
  './package.json', 
  JSON.stringify({
    type: 'module', 
    ...require('./package.json'), 
    license: 'MIT'
  }, null, 2)
)
" \
&& cat package.json \
\
&& echo "install for browser automation:" \
&& echo "selenidejs with chromedriver as dev dependencies (for tests)" \
&& npm install --save-dev selenidejs chromedriver \
\
&& echo "install jest as dev dependencies (for tests)" \
&& echo "to group and run code as test cases" \
&& npm install --save-dev jest  \
&& echo "configure to run test files as es6 modules with jest" \
&& echo "with custom test timeout on «npm test» command" \
&& node -e "
require('fs').writeFileSync(
  './package.json', 
  JSON.stringify({
    ...require('./package.json'), 
    scripts: { 
      test: 'NODE_OPTIONS=--experimental-vm-modules jest'
    }
  }, null, 2)
)
" \
&& cat package.json \
&& echo "
/** @type {import('jest').Config} */
const config = {
  transform: {}, // for node native es6 modules support
  testTimeout: 10000,
}

export default config" > jest.config.js \
\
&& echo "configure type checking for js files via TypeScript" \
&& echo "built-in VSCode for better IDE support (Autocomplete & Quick Fix)" \
&& echo '{
  "compilerOptions": {
    "allowJs": true,
    "maxNodeModuleJsDepth": 1,
    "checkJs": true,
    "noEmit": true,
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node16"
  },
  "include": [
    "./**/*.*"
  ]
}' > tsconfig.json \
&& code .

```
<!--
:::::
```bash: Console-Commands-+-Comments
echo "create project folder" \
&& echo "and init npm project" \
&& echo "with defaults in package.json (project configuration file)" \
&& mkdir selenidejs-demo \
&& cd $_ \
&& npm init -y \
&& cat package.json \
\
&& echo "set project type to module (for ES6 import/export)" \
&& echo "and tune opensource license to MIT" \
&& node -e "
require('fs').writeFileSync(
  './package.json', 
  JSON.stringify({
    type: 'module', 
    ...require('./package.json'), 
    license: 'MIT'
  }, null, 2)
)
" \
&& cat package.json \
\
&& echo "install for browser automation:" \
&& echo "selenidejs with chromedriver as dev dependencies (for tests)" \
&& npm install --save-dev selenidejs chromedriver \
\
&& echo "install jest as dev dependencies (for tests)" \
&& echo "to group and run code as test cases" \
&& npm install --save-dev jest  \
&& echo "configure to run test files as es6 modules with jest" \
&& echo "with custom test timeout on «npm test» command" \
&& node -e "
require('fs').writeFileSync(
  './package.json', 
  JSON.stringify({
    ...require('./package.json'), 
    scripts: { 
      test: 'NODE_OPTIONS=--experimental-vm-modules jest'
    }
  }, null, 2)
)
" \
&& cat package.json \
&& echo "
/** @type {import('jest').Config} */
const config = {
  transform: {}, // for node native es6 modules support
  testTimeout: 10000,
}

export default config" > jest.config.js \
\
&& echo "configure type checking for js files via TypeScript" \
&& echo "built-in VSCode for better IDE support (Autocomplete & Quick Fix)" \
&& echo '{
  "compilerOptions": {
    "allowJs": true,
    "maxNodeModuleJsDepth": 1,
    "checkJs": true,
    "noEmit": true,
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node16"
  },
  "include": [
    "./**/*.*"
  ]
}' > tsconfig.json \
&& code .

```
```bash: Console-Commands
mkdir selenidejs-demo \
&& cd $_ \
&& npm init -y \
&& node -e "
require('fs').writeFileSync(
  './package.json', 
  JSON.stringify({
    type: 'module', 
    ...require('./package.json'), 
    license: 'MIT'
  }, null, 2)
)
" \
&& npm install --save-dev selenidejs chromedriver \
&& npm install --save-dev jest  \
&& node -e "
require('fs').writeFileSync(
  './package.json', 
  JSON.stringify({
    ...require('./package.json'), 
    scripts: { 
      test: 'NODE_OPTIONS=--experimental-vm-modules jest'
    }
  }, null, 2)
)
" \
&& echo "
/** @type {import('jest').Config} */
const config = {
  transform: {}, // for node native es6 modules support
  testTimeout: 10000,
}

export default config" > jest.config.js \
\
&& echo '{
  "compilerOptions": {
    "allowJs": true,
    "maxNodeModuleJsDepth": 1,
    "checkJs": true,
    "noEmit": true,
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node16"
  },
  "include": [
    "./**/*.*"
  ]
}' > tsconfig.json \
&& code .

```
:::::
-->

</js-ts>

<js>

<ru>– Создаcт классический NodeJs проект, с поддержкой проверки типов c помощью встроенного в редактор компилятора TypeScript:</ru><uk>– Створить класичний NodeJs проект, з підтримкою перевірки типів з допомогою вбудованого в редактор компілятора TypeScript:</uk><en>– Create classic NodeJs project, with support of types checking via built in editor TypeScript compiler:</en>

</js>

```text
selenidejs-demo/
  jest.config.js
  node_modules/
  package.lock.json
  package.json
  tsconfig.json
```

<ru>Где...</ru><uk>Де...</uk><en>Where...</en>

`selenidejs-demo` - <ru>папка с проектом.</ru><uk>папка з проектом.</uk><en>folder with project.</en> ...

### <ru>Структура проекта</ru><uk>Структура проекту</uk><en>Project structure</en>

#### `tsconfig.json`

– <ru>[файл конфигурации для компилятора TypeScript](https://www.typescriptlang.org/tsconfig), который будет в соответствии с настройками в этом файле проверять типы в js-файлах и подсвечивать ошибки, а также предлагать автодополнение («Autocomplete») и быстрые исправления («Quick Fixes») в IDE (в нашем случае, в Visual Studio Code). Нам достаточно следующих опций:</ru><uk>файл конфігурації для компілятора TypeScript, який буде відповідно до налаштувань в цьому файлі перевіряти типи в js-файлах та підсвічувати помилки, а також пропонувати автодоповнення («Autocomplete») та швидкі виправлення («Quick Fixes») в IDE (в нашому випадку, в Visual Studio Code). Нам достатньо наступних опцій:</uk><en>file for TypeScript compiler configuration, that will check types in js-files according to settings in this file and highlight errors, as well as suggest autocomplete and quick fixes in IDE (in our case, in Visual Studio Code). We need the following options:</en>

<ru>

```json
{ // чтобы ...
  "compilerOptions": {
    "allowJs": true,    // Разрешить выводить типы на основе js-файлов.
    "maxNodeModuleJsDepth": 1, // Выводить типы на основе js файлов
                        // внутри node_modules до 1-го уровня вложенности.
    "checkJs": true,    // Проверять типы в js файлах и подсвечивать ошибки.
    "noEmit": true,     // Не генерировать js файлы в результате компиляции
                        // (нам ведь только проверять типы нужно).
    "target": "ES2022", // Компилировать в современный стандарт ES2022
                        // для поддержки await на верхнем уровне.
    "module": "ES2022", // Использовать современный стандарт ES2022
                        // для модулей с поддержкой await на верхнем уровне.
    "moduleResolution": "node16" // Указать стратегию разрешения
                        // (нахождения) модулей
                        // – как минимум без указания значения "node"
                        // для этой опции – компилятор не увидит модули
                        // установленных пакетов типа selenidejs
                        // (значение же "node16" добавит также
                        // поддержку модулей EcmaScript (ES6) в Node).
  },
  "include": [
    "./**/*.*"          // Проверять типы во всех файлах проекта.
  ]
}
```

</ru>

<uk>

```json
{ // щоб ...
  "compilerOptions": {
    "allowJs": true,    // Дозволити виводити типи на основі js-файлів.
    "maxNodeModuleJsDepth": 1, // Виводити типи на основі js файлів
                        // всередині node_modules до 1-го рівня вкладеності.
    "checkJs": true,    // Перевіряти типи в js файлах і підсвічувати помилки.
    "noEmit": true,     // Не генерувати js файли в результаті компіляції
                        // (нам же тільки перевіряти типи потрібно).
    "target": "ES2022", // Компілювати в сучасний стандарт ES2022
                        // для підтримки await на верхньому рівні.
    "module": "ES2022", // Використовувати сучасний стандарт ES2022
                        // для модулів з підтримкою await на верхньому рівні.
    "moduleResolution": "node16" // Вказати стратегію вирішення
                        // (знаходження) модулів
                        // – як мінімум без вказання значення "node"
                        // для цієї опції – компілятор не побачить модулі
                        // встановлених пакетів типу selenidejs
                        // (значення ж "node16" додасть також
                        // підтримку модулів EcmaScript (ES6) в Node).
  },
  "include": [
    "./**/*.*"          // Перевіряти типи в усіх файлах проекту.
  ]
}
```

</uk>

<en>

```json
{ // to ...
  "compilerOptions": {
    "allowJs": true,    // Allow to infer types based on js-files.
    "maxNodeModuleJsDepth": 1, // Infer types based on js files
                        // inside node_modules up to 1 level of nesting.
    "checkJs": true,    // Check types in js files and highlight errors.
    "noEmit": true,     // Do not generate js files as a result of compilation
                        // (we only need to check types).
    "target": "ES2022", // Compile to modern ES2022 standard
                        // to support top-level await.
    "module": "ES2022", // Use modern ES2022 standard
                        // for modules with support for await at the top level.
    "moduleResolution": "node16" // Specify the module resolution strategy
                        // (finding) modules
                        // – at least without specifying the value "node"
                        // for this option – the compiler will not see modules
                        // installed packages of the selenidejs type
                        // (the value of "node16" will also add
                        // support for EcmaScript (ES6) modules in Node).
  },
  "include": [
    "./**/*.*"          // Check types in all project files.
  ]
}
```

</en>

#### `node_modules/`

– <ru>папка с зависимостями проекта – дополнительно установленными нами пакетами с помощью использованых ранее команд:</ru><uk>папка з залежностями проекту – додатково встановленими нами пакетами з допомогою використаних раніше команд:</uk><en>folder with project dependencies – additionally installed by us packages with the help of the previously used commands:</en> – `npm install --save-dev selenidejs chromedriver` и `npm install --save-dev jest`.

#### `package.json` (<ru>секция зависимостей `devDependencies`</ru><uk>секція залежностей `devDependencies`</uk><en>`devDependencies` section</en>)

<ru>Опция `--save-dev` «запомнит» зависимости в файле `package.json` именно в секции `devDependencies` (а не в секцию `dependencies` если бы эту опцию не указали), что указывает что эти зависимости нужны только для «технических» задач разработки проекта, например, для запуска тестов, а не для его работы, например, в виде независимого пакета для переиспользования в других проектах или в виде полноценного приложения для запуска в браузере):</ru><uk>Опція `--save-dev` «запам'ятає» залежності в файлі `package.json` саме в секції `devDependencies` (а не в секцію `dependencies` якби ми ці опцію не вказали), що вказує, що ці залежності потрібні тільки для «технічних» завдань розробки проекту, наприклад, для запуску тестів, а не для його роботи, наприклад, у вигляді незалежного пакету для перевикористання в інших проектах або у вигляді повноцінного застосунку для запуску в браузері):</uk><en>The `--save-dev` option will «remember» dependencies in the `package.json` file exactly in the `devDependencies` section (and not in the `dependencies` section), which indicates that these dependencies are only needed for «technical» development tasks of the project, for example, to run tests, but not for its work, for example, as an independent package for reuse in other projects or as an application to run in the browser):</en>

```json
{
  "devDependencies": {
    "chromedriver": "^108.0.0",
    "jest": "^29.3.1",
    "selenidejs": "^1.4.0"
  }
}
```

<ru>В этом списке:</ru><uk>В цьому списку:</uk><en>In this list:</en>

* `chromedriver` – <ru>пакет для автоматической установки драйвера Chrome из кода на JavaScript с помощью </ru><uk>пакет для автоматичної встановлення драйвера Chrome з коду на JavaScript з допомогою </uk><en>package for automatic installation of the Chrome driver from JavaScript code with the help of </en> `import 'chromedriver'`.
* `jest` – <ru>тест-раннер который будет помогать организовывать код в тесты и запускать их.</ru><uk>тест-раннер який буде допомагати організовувати код в тести і запускати їх.</uk><en>test-runner that will help organize code into tests and run them.</en>
* `selenidejs` – <ru>собственно реализация библиотеки типа Selenide на JavaScript для реализаций высокоуровневых сценариев пользователя в браузере.</ru><uk>власне реалізація бібліотеки типу Selenide на JavaScript для реалізацій високорівневих сценаріїв користувача в браузері.</uk><en>an actual implementation of the Selenide-like library in JavaScript for the implementation of high-level user scenarios in the browser.</en>

<ru>В твоем случае версии пакетов могут отличаться от указанных выше, исходя из того какие более новые версии были доступны в момент установки.</ru><uk>В твоєму випадку версії пакетів можуть відрізнятися від вказаних вище, залежно від того які більш нові версії були доступні в момент встановлення.</uk><en>In your case, the package versions may differ from those listed above, depending on which newer versions were available at the time of installation.</en>

#### `package-lock.json`

<ru>Эти же актуальные версии установленых пакетов будут зафиксированы в файле `package-lock.json`. Этот файл нужен для того, чтобы при установке зависимостей на другом компьютере, например, на сервере, были установлены с помощью команды `npm ci` именно те же версии пакетов, которые были установлены на твоем компьютере (похожая команда `npm install` [может использоваться](https://stackoverflow.com/a/53325242/1297371) для обновления пакетов до более новых версий). Это нужно для того, чтобы избежать проблем совместимости, когда на разных компьютерах используются разные версии одного и того же пакета, и твои коллеги по проекту не могут запустить твой код, потому что у них не установлены те же версии пакетов, что и у тебя.</ru><uk>Ці ж актуальні версії встановлених пакетів будуть зафіксовані в файлі `package-lock.json`. Цей файл потрібен для того, щоб при встановленні залежностей на іншому комп'ютері, наприклад, на сервері, були встановлені за допомогою команди `npm ci` саме ті ж версії пакетів, які були встановлені на твоєму комп'ютері (cхожа команда `npm install` [може використовуватися](https://stackoverflow.com/a/53325242/1297371) для обновлення пакетів до більш нових версій). Це потрібно для того, щоб уникнути проблем з сумісністю, коли на різних комп'ютерах використовуються різні версії одного і того ж пакета, і твої колеги по проекту не можуть запустити твій код, оскільки у них не встановлені ті ж версії пакетів, що і у тебе.</uk><en>These same exact versions of the installed packages will be stored in the `package-lock.json` file. This file is needed so that when installing dependencies on another computer, for example, on a server, the same versions of the packages that were installed on your computer are installed using the `npm ci` command (similar `npm install` command [cand be used](https://stackoverflow.com/a/53325242/1297371) to update packages to newer versions). This is needed to avoid compatibility problems when different versions of the same package are used on different computers, and your project colleagues cannot run your code because they do not have the same versions of the packages that you do.</en>

#### `package.json` (<ru>остальные опции</ru><uk>інші опції</uk><en>other options</en>)

`package.json` - <ru>файл общей конфигурации проекта:</ru><uk>файл загальної конфігурації проекту:</uk><en>file of general project configuration:</en>

```json
{
  "type": "module",
  "name": "selenidejs-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "chromedriver": "^108.0.0",
    "jest": "^29.3.1",
    "selenidejs": "^1.4.0"
  }
}
```

##### `name`, `version`, `description`

`package.json` <ru>кроме уже упомянутой ранее секции с зависимостями, содержит еще несколько опций – имена большинства из которых – говорят сами за себя:</ru><uk>крім вже згаданої раніше секції з залежностями, містить ще декілька опцій – імена більшості з яких говорять сами за себе:</uk><en>in addition to the already mentioned section with dependencies, it also contains several options - the names of most of which speak for themselves:</en>

* `name` - <ru>имя проекта.</ru><uk>ім'я проекту.</uk><en>name of the project.</en>
* `version` - <ru>версия проекта.</ru><uk>версія проекту.</uk><en>version of the project.</en>
* `description` - <ru>описание проекта.</ru><uk>опис проекту.</uk><en>description of the project.</en>

<ru>Остальные менее очевидные опции объясним поподробнее...</ru><uk>Інші менш очевидні опції пояснимо детальніше...</uk><en>Other less obvious options will be explained in more detail...</en>

##### `type`

<ru>– указывает, что проект написан на [ES6](https://ru.wikipedia.org/wiki/ECMAScript#ES6) и использует ES6-модули. Это нужно для того, чтобы [Node.js](https://nodejs.org/ru/) понимал, что в проекте используются ES6-модули, и не пытался их интерпретировать как «обычный скрипт». Это необходимо для того, чтобы можно было использовать новый синтаксис [import](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import) и [export](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/export) вместо [require](https://nodejs.org/api/modules.html#modules_require_id) и [module.exports](https://nodejs.org/api/modules.html#modules_module_exports) соответственно.</ru><uk>– вказує, що проект написаний на [ES6](https://uk.wikipedia.org/wiki/ECMAScript#ES6) і використовує ES6-модулі. Це потрібно для того, щоб [Node.js](https://nodejs.org/uk/) розумів, що в проекті використовуються ES6-модулі, і не намагався їх інтерпретувати як «звичайний скрипт». Це необхідно для того, щоб можна було використовувати новий синтаксис [import](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Statements/import) та [export](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Statements/export) замість [require](https://nodejs.org/api/modules.html#modules_require_id) та [module.exports](https://nodejs.org/api/modules.html#modules_module_exports) відповідно.</uk><en>– specifies that the project is written in [ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015) and uses ES6 modules. This is needed so that [Node.js](https://nodejs.org/en/) understands that the project uses modules and does not try to interpret them as a regular script. This is necessary so that you can use the new [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) syntax instead of [require](https://nodejs.org/api/modules.html#modules_require_id) and [module.exports](https://nodejs.org/api/modules.html#modules_module_exports) respectively.</en>

##### `main`

<ru>– точка входа в проект. Это файл, который будет запускаться при вызове команды `node .`. Пока мы будем писать «просто тесты» (что мы пока и собираемся делать), нам эта опция не понадобиться.</ru><uk>– точка входу в проект. Це файл, який буде запускатися при виклику команди `node .`. Поки ми будемо писати «просто тести» (що ми поки й збираємось робити), нам ця опція не знадобиться.</uk>

##### `scripts`

<ru>– секция, в которой можно указать команды, которые можно запускать из консоли через `npm run command` (для некоторых команд предусмотрены сокращения, например вместо `npm run test` можно писать `npm test`). В данном случае мы кастомизировали команду `test`, которая будет запускать с помощью тест-раннера Jest все [найденные в проекте тесты](https://jestjs.io/docs/configuration#testmatch-arraystring). Мы также добавили добавили в нее опцию `NODE_OPTIONS=--experimental-vm-modules`, которая включает экспериментальную поддержку [ES6-модулей](https://nodejs.org/api/esm.html) в Node.js – это нужно только для того чтобы Jest мог запускать тесты, написанные на ES6-модулях, потому что NodeJs последних версий уже будет делать это по умолчанию если мы ранее установили упцию `type: "module"` в `package.json`.</ru><uk>– секція, в якій можна вказати команди, які можна запускати з консолі через `npm run command` (для деяких команд передбачені скорочення, наприклад замість `npm run test` можна писати `npm test`). У даному випадку ми кастомізували команду `test`, яка буде запускати з допомогою тест-раннера Jest всі [знайдені в проекті тести](https://jestjs.io/docs/configuration#testmatch-arraystring). Ми також додали додали в неї опцію `NODE_OPTIONS=--experimental-vm-modules`, яка включає експериментальну підтримку [ES6-модулів](https://nodejs.org/api/esm.html) в Node.js – це потрібно тільки для того, щоб Jest міг запускати тести, написані на ES6-модулях, оскільки NodeJs останніх версій вже буде робити це за замовчуванням якщо ми раніше встановили упцію `type: "module"` в `package.json`.</uk><en>– section where you can specify commands that can be run from the console using `npm run command` (for some commands shortcuts are provided, for example instead of `npm run test` you can write `npm test`). In this case we customized the `test` command, which will run all [found in the project tests](https://jestjs.io/docs/configuration#testmatch-arraystring) using the Jest test runner. We also added the `NODE_OPTIONS=--experimental-vm-modules` option, which enables experimental support for [ES6 modules](https://nodejs.org/api/esm.html) in Node.js – this is only needed so that Jest can run tests written in ES6 modules, since NodeJs of the latest versions will already do this by default if we previously set the `type: "module"` option in `package.json`.</en>

## Краткое введение в API {{Selenide}}

<ru>Теперь, чтобы использовать всю прелесть {{Selenide}}, в коде достаточно просто сделать пару импортов в стиле:</ru><uk>Тепер, щоб скористатися всією прелестью {{Selenide}}, в коді достатньо просто зробити пару імпортів в стилі:</uk><en>Now, to use all the beauty of {{Selenide}}, in the code it is enough to simply make a couple of imports like:</en>

```js
import { browser, by, be, have } from 'selenidejs';
//...
```

<ru>Объект `browser` - главная точка входа в API {{Selenide}}. Вот его самые базовые «команды»:</ru><uk>Об'єкт `browser` - головна точка входу в API {{Selenide}}. Ось його найбазовіші «команди»:</uk><en>Object `browser` is the main entry point to the API {{Selenide}}. Here are its most basic "commands":</en>

* `browser.open(url)` - <ru>загружает страницу по URL (и, при конфигурации по умолчанию, открывает браузер Chrome автоматически, если он еще не открыт, и если драйвер Chrome установлен в системе)</ru><uk>завантажує сторінку по URL (і, при конфігурації за замовчуванням, відкриває браузер Chrome автоматично, якщо він ще не відкритий, і якщо драйвер Chrome встановлений в системі)</uk><en>loads the page by URL (and, by default, opens the Chrome browser automatically, if it is not yet open, and if the Chrome driver is installed in the system)</en>,
* `browser.element(selector)` - <ru>найдет элемент по селектору (css, xpath или cпециальному селектору из `by.*`).</ru><uk>знайде елемент по селектору (css, xpath або cпеціальному селектору з `by.*`).</uk><en>finds an element by selector (css, xpath or a special selector from `by.*`).</en>,
* `browser.all(selector)` - <ru>найдет **коллекцию элементов** по селектору (css, xpath, или cпециальному селектору из модуля `by.*`)</ru><uk>знайде **колекцію елементів** по селектору (css, xpath, або cпеціальному селектору з модуля `by.*`)</uk><en>finds a **collection of elements** by selector (css, xpath, or a special selector from the `by.*` module)</en>,

<ru>Специализированные именованые селекторы, такие как поиск по определенным аттрибутам (например `by.name('q')`) или по тексту (например `by.exactText('Google Search')`) живут в объекте `by.*`.</ru><uk>Спеціалізовані іменовані селектори, такі як пошук за визначеними атрибутами (наприклад `by.name('q')`) або за текстом (наприклад `by.exactText('Google Search')`) живуть в об'єкті `by.*`.</uk><en>Specialized named selectors, such as search by specific attributes (for example `by.name('q')`) or by text (for example `by.exactText('Google Search')`) live in the `by.*` object.</en>

<ru>В объектах `be.*` и `have.*` живут условия для проверки элементов c помощью команды `should`, например:</ru><uk>В об'єктах `be.*` та `have.*` живуть умови для перевірки елементів за допомогою команди `should`, наприклад:</uk><en>Conditions for checking elements with the `should` command live in the `be.*` and `have.*` objects, for example:</en>

* `browser.element('[type=submit]').should(have.exactText('Google Search'))` - <ru>проверит соответствующий точный текст у элемента элемент со значением `"submit"` у атрибута `type`,</ru><uk>перевірить відповідний точний текст елемента елемента зі значенням `"submit"` у атрибута `type`,</uk><en>check the corresponding exact text of the element with the value `"submit"` of the `type` attribute,</en>,
* `browser.element(by.name('q')).should(be.blank)` – <ru>проверит что элемент со значением `"q"` у атрибута `name` – «пуст».</ru><uk>перевірить, що елемент зі значенням `"q"` у атрибута `name` – «порожній».</uk><en>check that the element with the value `"q"` of the `name` attribute is «empty» (i.e. «blank»).</en>

<ru>В принципе, этого достаточно, чтобы начать работу более опытному или просто достаточно любознательному специалисту. Все остальные команды будут подсказаны любимым IDE, после ввода точки в коде.</ru><uk>В принципі, цього достатньо, щоб почати працювати більш досвідченому або просто достатньо любознавчому спеціалісту. Всі інші команди будуть підказані улюбленим IDE, після введення крапки в коді.</uk><en>In principle, this is enough for a more experienced or just curious specialist to start working. All other commands will be suggested by your favorite IDE after entering a dot in the code.</en>

![](../resources/selenides-quick-start.docs.assets/03-browser-after-Browser.png)
![](../resources/selenides-quick-start.docs.assets/04-browser.element.png)

### <ru>Первый тест с</ru><uk>Перший тест з</uk><en>First test with</en> {{Selenide}} + {{TestRunner}}

<ru>В таком вот исследовательском режиме можно и гугл успеть протестировать выполнив соответствующий...</ru><uk>В такому ось дослідницькому режимі можна і гугл протестувати виконавши відповідний...</uk><en>In such an exploratory mode, you can even test google by performing the corresponding...</en>

#### <ru>Подбор селекторов в инспекторе браузера</ru><uk>Підбір селекторів в інспекторі браузера</uk><en>Selector composition in the browser inspector</en>

![](../resources/selenides-quick-start.docs.assets/image-20230102183450201.png)

<!--TODO: ensure en grammar is correct below...-->
↗️ *<ru>вызвав контекстное меню на поле запроса и выбрав «Inspect»...</ru><uk>викликавши контекстне меню на полі запиту і вибрав «Inspect»...</uk><en>having called the context menu on the query field and selecting «Inspect»...</en>*

![](../resources/selenides-quick-start.docs.assets/image-20230102183735666.png)

↗️ *<ru>увидев подсвеченный синим html-элемент в инспекторе...</ru><uk>побачивши підсвічений синім html-елемент в інспекторі...</uk><en>having seen the highlighted blue html element in the inspector...</en>*

![](../resources/selenides-quick-start.docs.assets/image-20230102183813002.png)

↗️ *<ru>выбрав более-менее читабельную и уникальную пару `атрибут="значение"`...</ru><uk>вибравши більш-менш читабельну і унікальну пару `атрибут="значення"`...</uk><en>having selected a more or less readable and unique pair `attribute="value"`...</en>*

![](../resources/selenides-quick-start.docs.assets/image-20230102183938457.png)

↗️ *<ru>составив соответствующий [CSS-селектор](https://www.w3schools.com/cssref/css_selectors.asp) для нахождения элемента ( `[name="q"]` или `[name=q]` – кавычки в этом случае не обязательны ) – и убедившись, что именно один элемент будет найден, тот который нам нужен (в дальнейшем мы можем использовать также локатор вида `by.name('q')` вместо селектора `'[name=q]'`)...</ru><uk>склавши відповідний [CSS-селектор](https://www.w3schools.com/cssref/css_selectors.asp) для знаходження елемента ( `[name="q"]` або `[name=q]` – лапки в цьому випадку не обов'язкові ) – і переконавшись, що саме один елемент буде знайдений, той, який нам потрібен (у подальшому ми можемо використовувати також локатор у вигляді `by.name('q')` замість селектора `'[name=q]'`)...</uk><en>having composed the corresponding [CSS-selector](https://www.w3schools.com/cssref/css_selectors.asp) for finding the element ( `[name="q"]` or `[name=q]` – double quotes in this case are not required ) – and having made sure that exactly one element will be found, the one we need (in the future we can also use the locator `by.name('q')` instead of the selector `'[name=q]'`)...</en>*

![](../resources/selenides-quick-start.docs.assets/image-20230102184822476.png)

↗️ *<ru>совершив поиск чего-то типа «selenium» – с помощью «лупы» (крайняя подсвеченная синим кнопка в меню инструментов влево от вкладки «Elements») – инспектировать один из под-элементов одного из найденных результатов...</ru><uk>виконавши пошук чогось типу «selenium» – за допомогою «лупи» (крайня підсвічена синім кнопка в меню інструментів вліво від вкладки «Elements») – інспектувати один з під-елементів одного зі знайдених результатів...</uk><en>having performed a search for something like «selenium» – using the «magnifying glass» (the last button highlighted in blue in the menu on the left of the «Elements» tab) – inspect one of the sub-elements of one of the found results...</en>*

![](../resources/selenides-quick-start.docs.assets/image-20230102185106738.png)

↗️ *<ru>поднявшись по html-дереву вверх – найти родительский элемент объеденяющий все элементы с результатами...</ru><uk>підійнявшись по html-дереву вгору – знайти батьківський елемент об'єднуючий всі елементи з результатами...</uk><en>having risen up the html-tree – find the parent element that unites all elements with results...</en>*

![](../resources/selenides-quick-start.docs.assets/image-20230102185247541.png)

↗️ *<ru>свернув первого «ребенка-элемента-результата» (инспектированного ранее) – убедиться что рядышком живут другие «результаты» – и не найдя у них нормальных пар «атрибут-значение»...</ru><uk>згорнувши першу «дитину-елемент-результат» (інспектовану раніше) – переконатися що поруч живуть інші «результати» – і не знайшовши у них нормальних пар «атрибут-значення»...</uk><en>having collapsed the first «child-element-result» (inspected earlier) – make sure that the other «results» live next to it – and after having not found adequate «attribute-value» pairs for them...</en>*

![](../resources/selenides-quick-start.docs.assets/image-20230102185416459.png)

↗️ *<ru>сначала построив CSS-селектор для нахождения «родителя» у которого есть более-менее адекватная пара «атрибут-значение» (`id="rso"`– позже, уже в коде, сможем в соответствии с синтаксисом CSS-селекторов использовать сокращенный селектор `'#rso'`)...</ru><uk>спочатку побудувавши CSS-селектор для знаходження «батька» у якого є більш-менш адекватна пара «атрибут-значення» (`id="rso"` – пізніше, вже в коді, зможемо відповідно до синтаксису CSS-селекторів використовувати скорочений селектор `'#rso'`)...</uk><en>first having built a CSS-selector to find the «parent» that has a more or less adequate «attribute-value» pair (`id="rso"` – later, in the code, we can use the abbreviated selector `'#rso'`)...</en>*

![](../resources/selenides-quick-start.docs.assets/image-20230102185535072.png)

↗️ *<ru>потом уточнив его селектор для нахождения «детей родителя по тегу» (`div`) на первой глубине вложенности (`>`)  и убедившись в правильном количестве найденных по селектору элементов (на рисунке – 8, но у тебя может быть другое количество, исходя из того, что будет рекоммендовать google персонально тебе)...</ru><uk>потім уточнивши його селектор для знаходження «дітей батька по тегу» (`div`) на першій глибині вкладеності (`>`)  і переконавшись в правильній кількості знайдених за селектором елементів (на скріншоті – 8, але у тебе може бути інша кількість, виходячи з того, що буде рекомендувати google персонально тобі)...</uk><en>then having specified the selector to find the «children of the parent by tag» (`div`) on the first depth of nesting (`>`)  and making sure of the correct number of elements found by the selector (on the picture – 8, but you may have a different number, depending on what google will personally recommend to you)...</en>*

<ru>– добавить в проект папку `__tests__` с тест-файлом `google-search.test.js` соответствующий...</ru><uk>– додати в проект папку `__tests__` з тест-файлом `google-search.test.js` відповідний...</uk><en>– add a folder `__tests__` to the project with a test file `google-search.test.js` corresponding...</en>

#### <ru>Код реализации сценария</ru><uk>Код реалізації сценарію</uk><en>Implementation code of the scenario</en>

:::::
```js
/* selenidejs-demo/__tests__/google-search.test.js */
import 'chromedriver'
import { test, afterAll } from '@jest/globals'
import { browser, by, be, have } from 'selenidejs'

test('google finds selenidejs', async () => {
  await browser.open('https://google.com/ncr')
  await browser.element(by.name('q')).should(be.blank)

  await browser.element(by.name('q')).type('selenidejs')
  await browser.element(by.name('q')).pressEnter()
  await browser.all('#rso>div').should(have.sizeGreaterThanOrEqual(6))
  await browser.all('#rso>div').first.should(have.text('selenidejs'))

  await browser.all('#rso>div').first.element('h3').click()
  await browser.should(have.titleContaining('GitHub - KnowledgeExpert/selenidejs'))
})

afterAll(async () => { // code inside these brackets ...
                      // will be executed after all tests 
                     // regardless of their result (PASSED or FAILED)
  await browser.quit()
})

```
```py: python + pytest
# selene-demo/tests/google_search_test.py
from selene import browser, by, be, have

def test_google_finds_selene():
    browser.open('https://google.com/ncr')
    browser.element(by.name('q')).should(be.blank)
    # TODO: finish implementation
```
```py: python + unittest
# selene-demo/tests/google_search_test.py
from selene import browser, by, be, have
import unittest

class TestGoogle(unittest.TestCase):
    def test_google_finds_selene():
        browser.open('https://google.com/ncr')
        browser.element(by.name('q')).should(be.blank)
        # TODO: finish implementation
```
:::::

<ru>Теперь `npm test` с терминала должен нам показать красивое кино в браузере Chrome;)</ru><uk>Тепер `npm test` з термінала повинен нам показати гарне кіно в браузері Chrome;)</uk><en>Now `npm test` from the terminal should show us a beautiful movie in the Chrome browser;)</en>

<ru>Команды `browser.element` и `browser.all` играют роль «высокоуровневых локаторов», другими словами – «способов нахождения элементов», то есть результат выполнения команд не приведет к попытке найти элемент в браузере в момент вызова, а значит, результат таких команд можно сохранять в переменные (например `const query = browser.element(by.name('q'))`) еще до открытия браузера для более удобного переиспользования в будущем, повышая читабельность кода и убирая потенциальные дубликаты селекторов, которые могут поменятся, и принести хлопот при обновлении тестов соответственно во многих местах по всему проекту...</ru><uk>Команди `browser.element` і `browser.all` грають роль «високорівневих локаторів», іншими словами – «способів знаходження елементів», тобто результат виконання команд не призведе до спроби знайти елемент в браузері в момент виклику, а отже, результат таких команд можна зберігати в змінні (наприклад `const query = browser.element(by.name('q'))`) ще до відкриття браузера для більш зручного перевикористання в майбутньому, підвищуючи читабельність коду і видаляючи потенційні дублікати селекторів, які можуть змінитися, і принести клопіт при оновленні тестів відповідно в багатьох місцях по всьому проекту...</uk><en>The `browser.element` and `browser.all` commands play the role of «high-level locators», in other words - «ways to find elements», that is, the result of the command will not lead to an attempt to find the element in the browser at the time of the call, and therefore the result of such commands can be saved in variables (for example `const query = browser.element(by.name('q'))`) even before opening the browser for more convenient reuse in the future, increasing the readability of the code and removing potential duplicate selectors that may change, and bring trouble when updating tests accordingly in many places throughout the project ...</en>

```js
/* selenidejs-demo/__tests__/google-search.test.js */
import 'chromedriver'
import { test, afterAll } from '@jest/globals'
import { browser, by, be, have } from 'selenidejs'

const query = browser.element(by.name('q'))
const results = browser.all('#rso>div')
const firstResultHeader = results.first.element('h3')

test('google finds selenidejs', async () => {
  await browser.open('https://google.com/ncr')
  await query.should(be.blank)

  await query.type('selenidejs')
  await query.pressEnter()
  await results.should(have.sizeGreaterThanOrEqual(6))
  await results.first.should(have.text('selenidejs'))

  await firstResultHeader.click()
  await browser.should(have.titleContaining('GitHub - KnowledgeExpert/selenidejs'))
})

afterAll(async () => {
  await browser.quit()
})

```

### <ru>О документации и конфигурации замолвите слово;)</ru><uk>Про документацію та конфігурацію замовте слово;)</uk><en>On documentation and configuration say a word;)</en>

<!--TODO: mention somehow other "pillars of selenides"-->

<ru>Если не хватает информации о том, что да как работает, всегда можно «провалиться» (`Cmd+Click` на Mac OS, `Ctrl+Click` на Windows) в код реализации нужных команд, почитать комментарии с документацией (если есть), или просто с кодом разобраться.</ru><uk>Якщо не вистачає інформації про те, що та як працює, завжди можна «провалитися» (`Cmd+Click` на Mac OS, `Ctrl+Click` на Windows) в код реалізації потрібних команд, прочитати коментарі з документацією (якщо є), або просто з кодом розібратися.</uk><en>If you need more information about how it works, you can always «drill down» (`Cmd+Click` on Mac OS, `Ctrl+Click` on Windows) into the code of the commands undere interest, read the comments with documentation (if there are any), or just surf and figure out the code.</en>

<ru>Например, узнать что там еще входит в API можно провалившись в `from 'selenidejs'` в строке c импортами. Кроме собратьев `browser, by, be, have`, таких как `find, should, perform, get, Browser, Configuration`, тебя там ждет даже небольшая документация с примерами их использования;) Там же можно найти некоторые трюки, которые позволят местами упростить код, написанный нами выше, как минимум - уменьшить количество строк:)</ru><uk>Наприклад, дізнатися, що там ще входить в API можна провалившись в `from 'selenidejs'` в рядку з імпортами. Крім сімейства `browser, by, be, have`, таких як `find, should, perform, get, Browser, Configuration`, тебе там чекає навіть невелика документація з прикладами їх використання;) Там же можна знайти деякі трюки, які дозволять місцями спростити код, написаний нами вище, як мінімум - зменшити кількість рядків:)</uk><en>For example, you can find out what else is included in the API by drilling down into `from 'selenidejs'` in the line with imports. In addition to the siblings of `browser, by, be, have`, such as `find, should, perform, get, Browser, Configuration`, you will find even a small documentation with examples of their use;) There you can also find some tricks that will allow you to simplify the code we wrote above in some places, at least - reduce the number of lines:)</en>

<ru>Не бойся исследовать API селенидов самостоятельно, все команды с параметрами именованы максимально натурально в соответствии со значением соответствующих английских фраз, и в большинстве случаев вполне реально понять, что делает та или иная команда, просто посмотрев на ее [«сигнатуру»](https://ru.wikipedia.org/wiki/API#%D0%A1%D0%B8%D0%B3%D0%BD%D0%B0%D1%82%D1%83%D1%80%D0%B0_%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8) и описание.</ru><uk>Не бойся досліджувати API селенідів самостійно, всі команди з параметрами іменовані максимально натурально відповідно до значення відповідних англійських фраз, і в більшості випадків доволі реально можна зрозуміти, що робить та чи інша команда, просто подивившись на її [«сигнатуру»](https://uk.wikipedia.org/wiki/%D0%A1%D0%B8%D0%B3%D0%BD%D0%B0%D1%82%D1%83%D1%80%D0%B0_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F)) і опис.</uk><en>Don't be afraid to explore the selenides API on your own, all commands with parameters are named as naturally as possible in accordance with the value of the corresponding English phrases, and in most cases it is quite possible to understand what a particular command does, just by looking at its [«signature»](https://en.wikipedia.org/wiki/API#Function_signature) and description.</en>

<ru>Например, поиследовав «внутренности» `browser.*` в IDE:</ru><uk>Наприклад, дослідивши «нутрощі» `browser.*` в IDE:</uk><en>For example, by exploring the «interior» of `browser.*` in IDE:</en>

![](../resources/selenides-quick-start.docs.assets/image-20221230162256801.png)

![](../resources/selenides-quick-start.docs.assets/image-20221230162713680.png)

<ru>– можно быстро докопаться до соответствующих способов установки размеров окна браузера:</ru><uk>– можна швидко докопатися до відповідних способів встановлення розмірів вікна браузера:</uk><en>– you can quickly find the corresponding methods for setting the browser window size:</en>

```poetry
/* selenidejs-demo/__tests__/google-search.test.js */
import 'chromedriver'
import { test, afterAll } from '@jest/globals'
import { browser, by, be, have } from 'selenidejs'


**browser.config.windowWidth = '1024'**
**browser.config.windowHeight = '768'**

// ...
```

<ru>– и настроить их выполнение перед каждым тестом с помощмью дополнительного импорта `beforeEach` из `@jest/globals`:</ru><uk>– і налаштувати їх виконання перед кожним тестом за допомогою додаткового імпорту `beforeEach` з `@jest/globals`:</uk><en>– and set their execution before each test using the additional import `beforeEach` from `@jest/globals`:</en>

```js
/* selenidejs-demo/__tests__/google-search.test.js */
import 'chromedriver'
import { test, afterAll, beforeEach } from '@jest/globals'
import { browser, by, be, have } from 'selenidejs'

const query = browser.element(by.name('q'))
const results = browser.all('#rso>div')
const firstResultHeader = results.first.element('h3')

beforeEach(async () => { // code inside these brackets ...
                        // will be executed before each test 
                       // to ensure neededed config options
                      // regardless of what might be changed 
                     // inside previous test
  browser.config.windowWidth = '1024'
  browser.config.windowHeight = '768'
})

test('google finds selenidejs', async () => {
  await browser.open('https://google.com/ncr')
  await query.should(be.blank)

  await query.type('selenidejs')
  await query.pressEnter()
  await results.should(have.sizeGreaterThanOrEqual(6))
  await results.first.should(have.text('selenidejs'))

  await firstResultHeader.click()
  await browser.should(have.titleContaining(
    'GitHub - KnowledgeExpert/selenidejs'
  ))
})

afterAll(async () => {
  await browser.quit()
})
```

<ru>Ссылки на дополнительную документацию, а также готовые примеры использования {{Selenide}} c другими инструментами можно найти в официальном [README](https://github.com/KnowledgeExpert/selenidejs/blob/master/README.md) проекта.</ru><uk>Посилання на додаткову документацію, а також готові приклади використання {{Selenide}} з іншими інструментами можна знайти в офіційному [README](https://github.com/KnowledgeExpert/selenidejs/blob/master/README.md) проекту</uk><en>Links to additional documentation and ready-made examples of using {{Selenide}} with other tools can be found in the official project [README](https://github.com/KnowledgeExpert/selenidejs/blob/master/README.md)</en>

<ru>Более подробно практическое применение базовых команд селенидов объяснено в туториале [«Селениды в действии»](./selenides-in-action.docs.md).</ru><uk>Більш детально практичне застосування базових команд селенідів пояснено в туторіалі [«Селеніди в дії»](./selenides-in-action.docs.md).</uk><en>More detailed practical application of basic selenide commands is explained in the [«Selenides in Action»](./selenides-in-action.docs.md) tutorial.</en>

<ru>Продолжить рефакторить тест из этого туториала в контексте применения принципа инкапсуляции сможешь в туториале [«Селениды для PageObject-ов»](./selenides-for-page-objects.tutorial.md), попутно разобравшись в базовых отличиях API {{Selenide}} от Selenium Webdriver.</ru><uk>Продовжити рефакторити тест з цього туторіалу в контексті застосування принципу інкапсуляції зможеш в туторіалі [«Селеніди для PageObject-ів»](./selenides-for-page-objects.tutorial.md), попутно розібравшись в базових відмінностях API {{Selenide}} від Selenium Webdriver.</uk><en>Continue to refactor the test from this tutorial in the context of applying the principle of encapsulation, you can in the [«Selenides for PageObjects»](./selenides-for-page-objects.tutorial.md) tutorial, along the way, figuring out the basic differences in the API {{Selenide}} from Selenium Webdriver.</en>

<ru>Подробней о настройке полноценного проекта для тестов в связке с селенидами найдешь в туториале [«Селениды для тестов: полный сетап»](./selenides-for-tests-full-setup.tutorial.md).</ru><uk>Детальніше про налаштування повноцінного проекту для тестів разом з селенідами знайдеш в туторіалі [«Селеніди для тестів: повний сетап»](./selenides-for-tests-full-setup.tutorial.md).</uk><en>More about setting up a full-fledged project for testing in conjunction with selenides, you can find in the [«Selenides for tests: full setup»](./selenides-for-tests-full-setup.tutorial.md) tutorial.</en>

<ru>Если же ты только начинаешь осваивать автоматизацию тестирования, то [этот набор материалов](./start-programming.guide.md) по основам программирования может тебе также помочь.</ru><uk>Якщо ж ти тільки починаєш опановувати автоматизацію тестування, то [цей набір матеріалів](./start-programming.guide.md) по основам програмування може тобі теж допомогти.</uk><en>If you are just starting to learn automation testing, then [this set of materials](./start-programming.guide.md) on the basics of programming can help you too.</en>

<ru>Приятного! ;)</ru><uk>Приємного! ;)</uk><en>Enjoy! ;)</en>

P.S.

<ru>Хм, если, действительно, с этого гайда начинается твой путь в обучении Автоматизации Тестирования или SDET... – держи в виде бонуса эту [карту обучения](https://autotest.how/map). Возможно, она поможет тебе сделать этот путь более интересным... Если же хочешь пройти по этому пути вместе с [нами](https://autotest.how/team-ru) в формате менторинга начиная с любого уровня и аж до черного пояса в SDET, то вперед знакомиться заполняя [эту анкету](https://forms.gle/TJp9EZubqcLf4p3K6)😉.</ru><uk>Хм, якщо, дійсно, з цього гайду починається твій шлях в навчанні Автоматизації Тестування або SDET... – тримай у вигляді бонуса цю [карту навчання](https://autotest.how/map). Можливо, вона допоможе тобі зробити цей шлях більш цікавим... Якщо ж хочеш пройти по цьому шляху разом з [нами](https://autotest.how/team-uk) в форматі менторингу починаючи з будь-якого рівня і аж до чорного поясу в SDET, то вперед знайомитися заповнюючи [цю анкету](https://forms.gle/gjQLK8geTtndmdx76)😉.</uk><en>Perhaps this guide is the beginning of your path on learning Test Automation or SDET... – keep this [learning map](https://autotest.how/map) as a bonus. Perhaps it will help you make this path more interesting... If you want to go this way with [us](https://autotest.how/team) in the mentoring format starting from any level and reaching up to «Black Belt in SDET», then not hesitate to get acquainted by filling out [this form](https://forms.gle/VsfLdHcdDfMkPPTw7)😉.</en>








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

```java: «custom name 2 java»
import { browser, by } from 'selenidejs'

// ...

browser.element(**by.name('q')**))  // ...

browser.element(**by.id('new-todo'**))  // ...
// or yet simpler:
browser.element(**'#new-todo'**)  // ...
```

```java: «custom name 668 java»
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
