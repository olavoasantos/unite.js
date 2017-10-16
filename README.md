# Unite.js
Simple JavaScript unit testing framework.

## Work in progress
This is a premature version. Still needs more work, but its working. Contributions are always welcomed!

## Installation
```
    npm install unite.js --require-dev
```

In your `package.json` file, set your `test` command in your `scripts` to:

```json
{
    "scripts": {
      "test": "unite"
    }
}
```

## Basic Usage

### Common tests

By default, Unite.js will look for `.tests.js` files inside a `tests` folder in your root folder.

So, to create tests, call the `Unite.test()` function, passing a `name` and a `function` as the first and second arguments, respectively. For example, create a `example.tests.js` file inside your `./tests` folder and start testing:

```js
    // ./tests/example.tests.js
    Unite.test("Testing an equality", () => {
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
        Unite.test("It sees Hello world", () => {
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

## Suites

If you wish to group specific tests, you can create `suites`! So say we are testing a Counter vue component and we want to have tests related to the template and tests related to the small aspect of the counter:

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
    Unite.suite("Counter: template", () => {
        Unite.test("It sees the default count", () => {
            let wrapper = Unite.$mount($component);
            let counter = wrapper.find(".counter").text();

            expect(counter).toEqual("0");
        });
    });

    Unite.suite("Counter: unit", () => {
        Unite.test("It defaults to a count of 0", () => {
            let wrapper = Unite.$mount($component);

            expect(wrapper.vm.count).toBe(0);
        });

        Unite.test("It increments the count when the button is clicked", () => {
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
    Unite.suite("Counter: unit", () => {
        let wrapper;
        Unite.beforeEachTest(() => {
            let wrapper = Unite.$mount($component);
        );
        
        Unite.test("It defaults to a count of 0", () => {
            expect(wrapper.vm.count).toBe(0);
        });

        Unite.test("It increments the count when the button is clicked", () => {
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

I'm going to keep on working to add more! =)

## Custom configuration

If you wish to use a different test folder, you can simply define a new path on a custom configuration file! To do that, create a `unite.config.js` file on your project root and export an object:

```js
    module.exports = {
        path: "./resources/assets/js/components",
    }
```

## Author
* [Olavo Amorim Santos](https://github.com/olavoasantos)