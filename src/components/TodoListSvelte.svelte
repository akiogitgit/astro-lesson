<script>
  import { onMount } from "svelte";

  onMount(() => {
    init();
  });

  let initFocus = null;

  function init() {
    title = "";
    initFocus.focus();
  }

  let todoList = [
    { id: 0, done: false, title: "レストランを予約する" },
    { id: 1, done: false, title: "サプライズ用の指輪を買う" },
    { id: 2, done: false, title: "フラッシュモブダンスを練習する" },
  ];

  let title = "";
  // function add() {
  $: add = () => {
    if(!title) return
    
    todoList = [
      ...todoList,
      {
        id: todoList.length,
        done: false,
        title,
      },
    ];
    init();
  }

  let condition = null;

  $: filteredTodoList = (todoList, condition) => {
    return condition === null
      ? todoList
      : todoList.filter((t) => t.done === condition);
  };
</script>

<!-- HTML -->
<div>
  絞り込み:
  <button
    on:click={() => {
      condition = null;
    }}>すべて</button
  >
  <button
    on:click={() => {
      condition = false;
    }}>未完了</button
  >
  <button
    on:click={() => {
      condition = true;
    }}>完了</button
  >
</div>
<div>
  <input type="text" bind:value={title} bind:this={initFocus} />
  <button on:click={() => add()}>タスク追加</button>
</div>
<div>
  <ul>
    {#each filteredTodoList(todoList, condition) as todo (todo.id)}
      <li>
        <input type="checkbox" bind:checked={todo.done} />
        {todo.title}
      </li>
    {/each}
  </ul>
</div>