<template>
  <main class="flex flex-col min-h-screen" data-theme="corporate">
    <LayoutTheNavbar />

    <div class="flex flex-row w-100 flex-1">
      <ul class="menu bg-base-200 w-56 rounded-box min-w-[250px]">
        <li><a>Item 1</a></li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li><a>level 2 item 1</a></li>
              <li><a>level 2 item 2</a></li>
              <li>
                <details open>
                  <summary>Parent</summary>
                  <ul>
                    <li><a>level 3 item 1</a></li>
                    <li><a>level 3 item 2</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li><a>Item 3</a></li>
      </ul>
      <div class="flex-grow">
        <slot />
      </div>
    </div>
  </main>
</template>
<script setup>
</script>
