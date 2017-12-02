# Unite.js
Simple JavaScript unit testing framework.

## Work in progress
This is a premature version. Still needs more work, but its working. Contributions are always welcomed!

## Requirements

* Node.js >= v7.6

    * Node.js v7.0 to v7.5 work with harmony flags (explained below)

## Installation
```
    npm install unite.js --save-dev
```

In your `package.json` file, set your `test` command in your `scripts` to:

```json
{
    "scripts": {
      "test": "unite"
    }
}
```

If you are running Node.js v7.0 to v7.5, use:

```json
{
    "scripts": {
      "test": "node --harmony-async-await node_modules/unite.js/bin/unite"
    }
}
```

Now you can run `npm run test` or simply `npm test`.

## Basic Usage

### Common tests

By default, Unite.js will look for `.tests.js` files inside a `tests` folder in your root folder.

So, to create tests, call the `test()` global helper passing a `name` and a `function` as the first and second arguments, respectively. Alternatively, you can call the call the `Unite.test()` function which works the same way. For example, create a `example.tests.js` file inside your `./tests` folder and start testing:

```js
    // ./tests/example.tests.js
    test("Testing an equality", () => {
        expect(1).toEqual(1);
    });
```  

Although this is a dumb example, your should get a green response after calling `npm run test` (hopefully). 

Unite.js ships with the [expect](https://www.npmjs.com/package/expect) assertion package, which is pretty popular.

### Testing Vue.js components

So, [Vue.js](https://vuejs.org/) is a pretty awesome framework which is getting pretty popular. One of its cool features is the use of Single File Components.

To extend this idea, Unite.js allows you to include your tests inside your `.vue` file, within a `tests` tag. To do this, simply create a `.tests.vue` file inside your tests folder.

For instance, create a `example.tests.vue` inside yor `./tests` folder:

```vue
    // ./tests/example.tests.vue
    <template>
        <div>{{ message }}</div>
    </template>
    
    <script>
        export default {
            data() {
                return {
                    message: "Hello world"
                };
            }
        }
    </script>
    
    <tests>
        test("It sees Hello world", () => {
            let wrapper = Unite.$mount($component),
                el = wrapper.find("div").text();
            expect(el).toEqual("Hello world");
        });
    </tests>
```

So, running `npm run test` you should be at green! So lets understand what happened here!

When testing a `.tests.vue` component, Unite.js injects the parsed component as the `$component` variable, which you can mount using [vue test utils](https://github.com/vuejs/vue-test-utils). Unite.js ships with vue test utils out of the box to make it easier for you. So when you run `.tests.vue` file, Unite.js gives you access to its methods through the global `Unite` variable. So you can use any of these commands:

* ´Unite.$vueTestUtil´
* ´Unite.$mount´
* ´Unite.$shallow´
* ´Unite.$createLocalVue´
* ´Unite.$transitionStub´
* ´Unite.$transitionGroupStub´

Check out [vue test utils documentation](https://vue-test-utils.vuejs.org/) for more details.

## Asyncronous test

In many cases, you might find yourself in situations which you need to test asyncronous actions. In Vue.js is very common to need to wait for an update on the component which is displayed on the next tick. For this situations, the best way to test this is to make use of Node.js' async/await functionality!

Say that we have a component where, after we click on a button, it fetches data through an ajax call and displays it on the DOM. To test this, we can write something like:

```vue
    // ./tests/example.tests.vue    
    <tests>
        test("It sees Hello world", async () => {
            let wrapper = Unite.$mount($component);
            wrapper.find("button.getData").trigger("click");

            await wrapper.vm.$nextTick();

            expect(wrapper.find(".data")).toContain("New data");
        });
    </tests>
```

## Group

If you wish to group specific tests, you can create groups by using the `group` helper! So say we are testing a Counter vue component and we want to have tests related to the template and tests related to the small aspect of the counter:

```vue
// ./tests/counter.tests.vue
<template>
    <div>
        <div class="counter" v-text="count"></div>
        <button @click="count++">Increment</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            };
        }
    }
</script>

<tests>
    group("Counter: template", () => {
        test("It sees the default count", () => {
            let wrapper = Unite.$mount($component);
            let counter = wrapper.find(".counter").text();

            expect(counter).toEqual("0");
        });
    });

    group("Counter: unit", () => {
        test("It defaults to a count of 0", () => {
            let wrapper = Unite.$mount($component);

            expect(wrapper.vm.count).toBe(0);
        });

        test("It increments the count when the button is clicked", () => {
            let wrapper = Unite.$mount($component);

            expect(wrapper.vm.count).toBe(0);

            wrapper.find('button').trigger('click');

            expect(wrapper.vm.count).toBe(1);
        });
    });
</tests>
```

## Events

As we can see by our last example, we constantly have to repeat the component mounting procedure. To clean up the code a little, Unite.js provides you with cycle hooks. So, if we want to automatically mount the component before every test in that suite, you can define a hook inside your suites:

```vue
// ./tests/counter.tests.vue
// ...
<tests>
    group("Counter: unit", () => {
        let wrapper;
        Unite.beforeEachTest(() => {
            wrapper = Unite.$mount($component);
        });
        
        test("It defaults to a count of 0", () => {
            expect(wrapper.vm.count).toBe(0);
        });

        test("It increments the count when the button is clicked", () => {
            expect(wrapper.vm.count).toBe(0);

            wrapper.find('button').trigger('click');

            expect(wrapper.vm.count).toBe(1);
        });
    });
</tests>
```

Since this is a premature version of Unite.js, there aren't many hooks yet. For now, you can hook into:

* `beforeEachTest`: Runs before each test of the suite
* `afterEachTest`: Runs after each test of the suite

## Filtering tests

If you wish to run only certain tests, groups or files, you can pass a parameter to `npm run test`. On our `counter.tests.vue` example, say we only want to run the `Counter: unit` group. To do so, simply run `npm run test unit`.

Be aware that if you have other files, groups or tests which contain the word `unit` they will be run as well.

## Custom configuration

If you wish to use a different test folder, you can simply define a new path on a custom configuration file! To do that, create a `unite.config.js` file on your project root and export an object:

```js
    // ./unite.config.js
    module.exports = {
        path: "./resources/assets/js/components",
    }
```

## Setup file

If you wish to create helper functions to be used on all the test suites, you can create a file and tell Unite.js to prepend it to the test suites. To do that, create a `.js`, for example:

```js
    // ./setup.js

    /** @helper It clicks a selector */
    let click = (selector) => {
        let node = wrapper.find(selector);
        node.trigger('click');
    };

    /** @helper It types into an input */
    let type = (selector, value) => {
        let node = wrapper.find(selector);
        
        node.element.value = value;
        node.trigger("input");
    };
```
Then, on your `unite.config.js` file, add:

```js
    // ./unite.config.js
    module.exports = {
        // ... other configuration
        setup: [
            "./setup.js"
        ],
    }
```
Now you can use your helpers on all your tests!

## Upgrade from <= 0.0.3

* `Unite.suite()` has been deprecated. Change it to `Unite.group()` or `group()`.

## Version 0.0.5

* Added support for asyncronous testing
* Bug fixes:
    * Fixed error report misassignment
    * Finding root directory algorithm now is more specific

## Author
* [Olavo Amorim Santos](https://github.com/olavoasantos)