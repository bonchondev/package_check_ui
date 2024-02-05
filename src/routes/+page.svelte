<script lang="ts">
	let selected: string;
	let packageType: string;
	let packages: string;
	let message: string;
	$: packageType = selected === 'pip' ? 'Python' : 'R';
	const installPackage = async () => {
        message = "";
		const request = { kind: selected, packages: packages };
		const response = await fetch('http://localhost:9000/install', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		});
		const data = await response.text();
		console.log(JSON.stringify(request));
		message = data;
	};
</script>

<section class="bg-white dark:bg-gray-900 mx-auto">
	<div class="py-4 px-4 max-w-screen-xl text-center lg:pt-4">
		<h1
			class="pb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			Submit package(s) here
		</h1>
		<p
			class="pb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
		>
			Place packages in form to test against current version and save the packages ot be added later
		</p>
	</div>
	<section class="w-3/4 mx-auto">
		<div class="pb-2">
			<form on:submit|preventDefault={installPackage}>
				<label for="countries" class="block pb-2 text-lg font-medium text-gray-900 dark:text-white"
					>Which type of package</label
				>
				<select
					bind:value={selected}
					id="countries"
					class="bg-gray-50 border p-4 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option value="base">Regular</option>
					<option value="bioconductor">BiocManager</option>
					<option value="devtools">Devtools</option>
					<option value="remote">Remote</option>
					<option value="pip">Python</option>
				</select>
				<label
					for="large-input"
					class="block pt-4 pb-2 text-lg font-medium text-gray-900 dark:text-white"
					>Add {packageType} packages here</label
				>
				<input
					bind:value={packages}
					type="text"
					id="large-input"
					class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Choose which you're trying to install"
				/>
				<div class="pt-4">
					<button
						type="submit"
						class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						>Install</button
					>
				</div>
			</form>
		</div>
		<section class="rounded-lg border border-gray-300 p-3 h-64 bg-gray-200">
			{#if message}
				<span class="font-bold">ubuntu@localhost:~$ </span>{message}
			{:else}
				<span>waiting on feedback...</span>
			{/if}
		</section>
	</section>
</section>
