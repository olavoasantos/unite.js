<template>
    <div>
        <span class="count" v-text="count"></span>
        <button @click="count++">Increment</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                count: 0
            };
        }
    }
</script>

<tests>
    Unite.test("It tests something awesome in vue", () => {
        let wrapper = vueTestUtils.mount(component);
        assert.equal(wrapper.vm.count, 0);
    });

    Unite.test('increments the count when the button is clicked', () => {
        let wrapper = vueTestUtils.mount(component);

        expect(wrapper.vm.count).to.equal(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.vm.count).to.equal(1);
    });
</tests>