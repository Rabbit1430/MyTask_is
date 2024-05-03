<script lang="ts">
  import { onMount } from 'svelte';
  
  let datamoney: string[] = [];
  let onevalute: string = 'USD';
  let twovalute: string = '';
  let dataonevalute: number ;
  let datatwovalute: number ;


const apimoney = async () => {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${onevalute}`)
  const data = await response.json() as {rates: Record<string, number>}
datamoney =  Object.keys(data.rates);
onevalute = datamoney[0]
twovalute = datamoney[1]



}


const convertmoney = async(valute: number, one: string, two: string) => {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${one}`);
    const data = await response.json() as { rates: Record<string, number> };
    const mydata = data.rates[two];
    return +(valute * mydata).toFixed(2);

}

  
  

  const updateonevalute = () => {
    convertmoney(dataonevalute, onevalute, twovalute).then((res) => {
      datatwovalute = res
    });
  }

  const updatetwovalute = () => {
    convertmoney(datatwovalute, twovalute, onevalute).then((res) => {
      dataonevalute = res
    });

  }

onMount(apimoney);
 
</script>

<style>
 h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  div {
    margin-bottom: 16px;
  }

  span {
    font-weight: bold;
    margin-right: 8px;
  }

  select, input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  p {
    font-size: 18px;
    font-weight: bold;
  }
</style>

<h1>Конвертирование валют</h1>
<div><span>Валюта №1</span>
<select bind:value={onevalute} on:change={updateonevalute}>
{#each datamoney as valute}
<option value={valute}>{valute}</option>
{/each}
</select>

</div>
<div> <input type="number" bind:value={dataonevalute} min="0" step="0.01" on:input={updateonevalute} ></div>


<div><span>Валюта №2</span>
  <select bind:value={twovalute} on:change={updatetwovalute}>
  {#each datamoney as valute}
  <option value={valute}>{valute}</option>
  {/each}
  </select>
  </div>
  
  <div> <input type="number" bind:value={datatwovalute} min="0" step="0.01" on:input={updatetwovalute}></div>
  <h2>Результат:</h2>
  <p>{dataonevalute !== undefined && dataonevalute !== null ? dataonevalute : 0} {onevalute} = {datatwovalute !== undefined && datatwovalute !== null ? datatwovalute : 0} {twovalute}</p>




