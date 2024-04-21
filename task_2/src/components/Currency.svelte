<script lang="ts">
	import { onMount } from 'svelte';
	import response from '../API/instance';
	import type { IResponse } from '../API/types';
	import type { InputData } from './Currency';

	// Список доступных валют (вытаскиваем из запроса)
	let currencies: string[] = ['Loading...'];

	// Монтирование (дэфолтные значения)
	onMount(async () => {
		await fetch_first_field(first_field.selected); // инит калькуляция
		currencies = Object.keys(first_field_response.rates); // доступные валюты
	});

	// Состояние запроса для каждого input-а // Избегаем fetch-спама
	let first_field_response: IResponse;
	let second_field_response: IResponse;

	// Запросы
	const fetch_first_field = async (log: any) => {
		console.log(log);
		first_field_response = await response(first_field.selected);
		first_field.calculate();
	};
	const fetch_second_field = async (log: any) => {
		console.log(log);
		second_field_response = await response(second_field.selected);
		second_field.calculate();
	};

	// Состояние first_input поля
	let first_field: InputData = {
		value: 1,
		selected: 'USD',
		calculate() {
			// toFixed - скрыть сайд-эффект плавающей точки
			if (this.value) second_field.value = +(first_field_response.rates[second_field.selected] * this.value).toFixed(2);
		},
	};
	// Состояние second_input поля
	let second_field: InputData = {
		value: 1,
		selected: 'RUB',
		calculate() {
			// toFixed - скрыть сайд-эффект плавающей точки
			if (this.value) first_field.value = +(second_field_response.rates[first_field.selected] * this.value).toFixed(2);
		},
	};

	$: console.log('Произошел рендер компонента: Currency.svelte');
</script>

<div class="padding">
	<input bind:value={first_field.value} type="number" on:input={void first_field.calculate()} />
	<select bind:value={first_field.selected} on:change={void fetch_first_field(first_field.selected)}>
		{#each currencies as curren}
			<option>{curren}</option>
			<!-- {:else}
			<option selected>loading...</option> -->
		{/each}
	</select>
</div>
<div class="padding">
	<input bind:value={second_field.value} type="number" on:input={void second_field.calculate()} />
	<select bind:value={second_field.selected} on:change={void fetch_second_field(second_field.selected)}>
		{#each currencies as curren}
			<option>{curren}</option>
			<!-- {:else}
			<option selected>loading...</option> -->
		{/each}
	</select>
</div>

<style>
	.padding > input,
	.padding > select {
		padding: 15px 10px;
	}
</style>
