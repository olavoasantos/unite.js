<template>
	<div>
		<span class="count"
		      v-text="count"></span>
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
	let wrapper;
	Unite.beforeEachTest(() => {
		wrapper = Unite.$mount(component);
	});

	Unite.test("It tests something awesome in vue", () => {
		expect(wrapper.vm.count).toEqual(0);
	});

	Unite.test('increments the count when the button is clicked', () => {
		expect(wrapper.vm.count).toEqual(0);

		wrapper.find('button').trigger('click');

		expect(wrapper.vm.count).toEqual(1);
	});
</tests>